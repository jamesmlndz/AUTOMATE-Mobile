import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "../../AllStyles/LoginStyle";

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AUTOMATE</Text>
          <Text style={styles.headerSubtitle}>
            Automobile Maintenance & Service Tracking
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Terms and Conditions</Text>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Introduction */}
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Welcome to <Text style={styles.bold}>AUTOMATE</Text>, a comprehensive web and mobile application for automobile maintenance and service tracking. By using our application, you agree to comply with the following Terms and Conditions. Please read them carefully before accessing or using our services.
            </Text>
          </View>

          {/* Section I */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>I. Acceptance of Terms</Text>
            <Text style={styles.sectionText}>
              By downloading, installing, or using AUTOMATE, you agree to be bound by these Terms and Conditions, along with our Privacy Policy. If you do not agree, you must discontinue the use of the application immediately.
            </Text>
          </View>

          {/* Section II */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              II. User Registration and Account Security
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>
                • You must provide accurate and complete information during registration.
              </Text>
              <Text style={styles.bulletPoint}>
                • You are responsible for maintaining the confidentiality of your account credentials.
              </Text>
              <Text style={styles.bulletPoint}>
                • Any unauthorized use of your account must be reported to us immediately.
              </Text>
              <Text style={styles.bulletPoint}>
                • We reserve the right to suspend or terminate accounts found to be violating these terms.
              </Text>
            </View>
          </View>

          {/* Section III */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              III. Use of the Application
            </Text>
            <Text style={styles.sectionText}>
              You agree to use AUTOMATE only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use and enjoyment of the application. Prohibited behavior includes:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletPoint}>
                • Harassing or causing distress to any user
              </Text>
              <Text style={styles.bulletPoint}>
                • Transmitting obscene or offensive content
              </Text>
              <Text style={styles.bulletPoint}>
                • Disrupting the normal flow of dialogue within our application
              </Text>
              <Text style={styles.bulletPoint}>
                • Attempting to gain unauthorized access to our systems
              </Text>
            </View>
          </View>

          {/* Section IV */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              IV. Intellectual Property Rights
            </Text>
            <Text style={styles.sectionText}>
              All content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are the exclusive property of AUTOMATE, its licensors, or other providers of such material and are protected by international copyright, trademark, and other intellectual property laws.
            </Text>
          </View>

          {/* Section V */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              V. Limitation of Liability
            </Text>
            <Text style={styles.sectionText}>
              AUTOMATE is provided on an "AS IS" and "AS AVAILABLE" basis. To the fullest extent permissible pursuant to applicable law, AUTOMATE disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.
            </Text>
          </View>

          {/* Section VI */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>VI. Appointment and Service Tracking</Text>
            <Text style={styles.sectionText}>
              Users are responsible for accurate information provided when booking appointments or services. AUTOMATE assumes no liability for any vehicular damage or service issues that may arise from incorrect information provided by the user.
            </Text>
          </View>

          {/* Section VII */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>VII. Payment and Billing</Text>
            <Text style={styles.sectionText}>
              By making a payment through AUTOMATE, you authorize us to charge your provided payment method. Refunds are subject to our refund policy. We are not responsible for any fees charged by your financial institution.
            </Text>
          </View>

          {/* Section VIII */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              VIII. Modifications to Terms
            </Text>
            <Text style={styles.sectionText}>
              AUTOMATE reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the application. Your continued use of AUTOMATE following the posting of revised Terms means that you accept and agree to the changes.
            </Text>
          </View>

          {/* Section IX */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>IX. Termination</Text>
            <Text style={styles.sectionText}>
              We may terminate or suspend your account and access to AUTOMATE immediately, without prior notice or liability, for any reason whatsoever, including if you breach any terms or conditions of this agreement.
            </Text>
          </View>

          {/* Section X */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>X. Governing Law</Text>
            <Text style={styles.sectionText}>
              These Terms and Conditions and your use of AUTOMATE are governed by and construed in accordance with the laws applicable in your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </Text>
          </View>

          {/* Section XI */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>XI. Contact Us</Text>
            <Text style={styles.sectionText}>
              If you have any questions about these Terms and Conditions, please contact us at:
            </Text>
            <Text style={styles.contactInfo}>
              Email: tierodmanautoc@yahoo.com{"\n"}
              Phone: +63 (2) 917 849 6894{"\n"}
              Address: 246 P. Ocampo Ext., cor. Sampaloc St., San Antonio Makati City
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.lastUpdated}>
              Last Updated: April 2026{"\n"}
              © 2026 AUTOMATE | Tierodman Auto Center. All rights reserved.
            </Text>
          </View>
        </ScrollView>

        {/* Accept Button */}
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.acceptButtonText}>I UNDERSTAND</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#08285E",
    position: "relative",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#D39505",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#E8E8E8",
    textAlign: "center",
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#D39505",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#08285E",
    textAlign: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#08285E",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#333",
    lineHeight: 20,
  },
  bold: {
    fontFamily: "Poppins-Bold",
    color: "#08285E",
  },
  bulletList: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#333",
    lineHeight: 20,
    marginBottom: 6,
    marginLeft: 8,
  },
  contactInfo: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#08285E",
    lineHeight: 18,
    marginTop: 8,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
  },
  lastUpdated: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#999",
    textAlign: "center",
    lineHeight: 16,
  },
  acceptButton: {
    backgroundColor: "#D39505",
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
});

export default TermsAndConditions;
