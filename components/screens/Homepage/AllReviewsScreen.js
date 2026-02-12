import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { getAllFeedback } from "../../../api/appointments";
import { Ionicons } from "@expo/vector-icons";

const AllReviewsScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllFeedback();

      console.log("RAW FEEDBACK:", res);

      // ✅ if your API returns { data: reviews }
      const reviewsData = res.data || res;

      setReviews(
        reviewsData.map((review) => ({
          name: review.name || "Anonymous Customer",
          comment: review.comment,
          rating: review.rating,
          date: review.date,
          refNo: review.refNo || "N/A",
        }))
      );
    } catch (err) {
      console.log("Error fetching reviews:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={18}
        color="#FFD700"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 26 }} />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFD700"
          style={{ marginTop: 50 }}
        />
      ) : reviews.length === 0 ? (
        <View style={styles.centerBox}>
          <Text style={styles.noData}>No reviews available.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.row}>
                <Text style={styles.name}>{review.name}</Text>
                <Text style={styles.ref}>Ref: {review.refNo}</Text>
              </View>

              <View style={styles.stars}>{renderStars(review.rating)}</View>

              <Text style={styles.comment}>{review.comment}</Text>

              <Text style={styles.date}>
                {review.date ? new Date(review.date).toLocaleDateString() : ""}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0d2147" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#0B2B66",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: { color: "white", fontSize: 22, fontFamily: "Poppins-Bold" },
  list: { padding: 20, alignItems: "center" },
  reviewCard: {
    width: "95%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: { color: "white", fontSize: 17, fontWeight: "600" },
  ref: { color: "#fff", fontSize: 13, opacity: 0.85 },
  stars: { flexDirection: "row", marginVertical: 6 },
  comment: { color: "white", fontSize: 15, lineHeight: 20, marginBottom: 8 },
  date: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
    fontFamily: "Poppins-Regular",
  },
  noData: {
    color: "white",
    fontSize: 16,
    marginTop: 15,
    fontFamily: "Poppins-Bold",
  },
  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AllReviewsScreen;
