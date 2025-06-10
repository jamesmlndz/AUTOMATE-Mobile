import { StyleSheet } from "react-native";
//bookingform
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  backButton: {
    backgroundColor: "#0D2451",
    padding: 10,
    borderRadius: 50,
    width: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#C99C2E",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "#0D2451",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextBtn: {
    backgroundColor: "#0D2451",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

//SelectServices 
const Servicestyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 10,
        backgroundColor: "#1A2C59",
        padding: 10,
        borderRadius: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#C69C3E",
        marginBottom: 20,
    },
    serviceContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    serviceBox: {
        width: "40%",
        padding: 15,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1A2C59",
        borderRadius: 10,
    },
    serviceBoxSelected: {
        backgroundColor: "#C69C3E",
    },
    serviceText: {
        fontSize: 16,
        color: "#000",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#999",
    },
    radioButtonSelected: {
        backgroundColor: "#C69C3E",
        borderColor: "#C69C3E",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    backBtn: {
        backgroundColor: "#1A2C59",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    nextBtn: {
        backgroundColor: "#1A2C59",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    btnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

//Date and Time style
const DateTimestyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#1A2C59",
        padding: 10,
        borderRadius: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#C69C3E",
        marginBottom: 20,
    },
    serviceContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    serviceBox: {
        width: "40%",
        padding: 15,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#1A2C59",
        borderRadius: 10,
    },
    serviceBoxSelected: {
        backgroundColor: "#C69C3E",
    },
    serviceText: {
        fontSize: 16,
        color: "#000",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#999",
    },
    radioButtonSelected: {
        backgroundColor: "#C69C3E",
        borderColor: "#C69C3E",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    backBtn: {
        backgroundColor: "#1A2C59",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    nextBtn: {
        backgroundColor: "#1A2C59",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    btnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

//profile 
const Profilestyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
      },
      header: {
        backgroundColor: "#112D62",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      },
      profileText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
      },
      profileContainer: {
        alignItems: "center",
        marginTop: -50,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      },
      image: {
        width: 90,
        height: 90,
        borderRadius: 45,
      },
      cameraIcon: {
        position: "absolute",
        right: -5,
        bottom: -5,
        backgroundColor: "#4F5D75",
        padding: 5,
        borderRadius: 20,
      },
      infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      infoItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingHorizontal: 20,
      },
      infoText: {
        fontSize: 14,
        marginLeft: 10,
      },
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      paddingTop: 40,
    },
    header: {
      backgroundColor: "#0E2A5A",
      height: 80,
      width: "100%",
      justifyContent: "center",
      paddingLeft: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    backButton: {
      position: "absolute",
      left: 20,
      top: 35,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#D9A42E",
      marginVertical: 20,
      textTransform: "uppercase",
    },
    card: {
      width: "90%",
      backgroundColor: "#D0D4DD",
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#D9A42E",
      marginTop: 10,
    },
    infoText: {
      fontSize: 14,
      color: "#333",
    },
    boldText: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#0E2A5A",
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#A0A4AD",
      marginVertical: 10,
    },
    confirmButton: {
      backgroundColor: "#0E2A5A",
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    confirmButtonText: {
      color: "#FFF",
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
});
  