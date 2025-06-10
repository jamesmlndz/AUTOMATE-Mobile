import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../../AllStyles/EditProfileScreenStyle";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";

const EditScreenProfile = ({ navigation, route }) => {
  const existingProfile = route.params?.profile;

  const [image, setImage] = useState(
    existingProfile?.profileImage || "https://placekitten.com/200/200"
  );
  const [name, setName] = useState(existingProfile?.name || "");
  const [email, setEmail] = useState(existingProfile?.email || "");
  const [mobileNumber, setMobileNumber] = useState(
    existingProfile?.mobileNumber?.replace("+63 ", "") || ""
  );

  const [linkedAccounts, setLinkedAccounts] = useState({
    google: true,
    facebook: true,
    apple: true,
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to allow access to your media library to change the profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !mobileNumber.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const updatedProfile = {
      profileImage: image,
      name,
      email,
      mobileNumber: `+63 ${mobileNumber.trim()}`,
      linkedAccounts,
    };

    navigation.navigate("ProfileScreen", { updatedProfile });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Plain View header with same styling but no background image */}
      <View style={styles.header}>
        {/* Back arrow button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerArrowLeft}
          activeOpacity={0.7}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerText}></Text>

        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          <Image source={{ uri: image }} style={styles.avatar} />
          <Entypo
            name="camera"
            size={18}
            color="white"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="your.email@example.com"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileContainer}>
          <View style={styles.countryCode}>
            <Image
              source={{ uri: "https://flagcdn.com/w40/ph.png" }}
              style={styles.flag}
            />
            <Text style={styles.codeText}>+63</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            placeholder="123 123 323"
          />
        </View>

        <Text style={styles.label}>Linked Accounts</Text>

        <View style={styles.linkRow}>
          <View style={styles.linkIconText}>
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.linkText}>Google</Text>
          </View>
          <Switch
            value={linkedAccounts.google}
            onValueChange={(val) =>
              setLinkedAccounts((prev) => ({ ...prev, google: val }))
            }
          />
        </View>

        <View style={styles.linkRow}>
          <View style={styles.linkIconText}>
            <FontAwesome name="facebook" size={20} color="#4267B2" />
            <Text style={styles.linkText}>Facebook</Text>
          </View>
          <Switch
            value={linkedAccounts.facebook}
            onValueChange={(val) =>
              setLinkedAccounts((prev) => ({ ...prev, facebook: val }))
            }
          />
        </View>

        <View style={styles.linkRow}>
          <View style={styles.linkIconText}>
            <FontAwesome name="apple" size={20} color="#000" />
            <Text style={styles.linkText}>Apple</Text>
          </View>
          <Switch
            value={linkedAccounts.apple}
            onValueChange={(val) =>
              setLinkedAccounts((prev) => ({ ...prev, apple: val }))
            }
          />
        </View>?

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.switchAccount}>Switch Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditScreenProfile;
