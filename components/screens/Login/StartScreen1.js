import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "../../AllStyles/StartScreen1";
import { useNavigation } from "@react-navigation/native";

const StartScreen1 = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/StartBG.png")}
      style={styles.background} // Make sure this style exists!
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>

        <Image
          source={require("../../../assets/StartScreen1.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Reliable Auto Care, Right at Your Fingertips
        </Text>

        <Text style={styles.description}>
          With our on-demand vehicle service app, booking car repairs and
          maintenance has never been easier. Let professionals handle your car
          quickly and hassle free.
        </Text>

        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StartScreen2")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen1;
