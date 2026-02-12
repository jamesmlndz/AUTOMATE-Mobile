import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  verifycontainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
    padding: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 20,
  },
  section: {
    padding: 16,
  },
  getButton: {
    backgroundColor: '#D39505',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    width: '80%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 500,
  },
  getText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    
  },
  title: {
    fontSize: 30,
    marginBottom: 24,
    fontFamily: "Poppins-Bold",
    textAlign: 'center',
    color: '#D39505'
  },
  Regtitle: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 24,
    color: '#08285E',
    textAlign: 'center',
    fontFamily: "Poppins-Bold",
    
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 26,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loginButton: {
    backgroundColor: '#3C6791',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontFamily: "Poppins-Bold",
    height: 45,
    width: '50%',
  },
  registerButton: {
    backgroundColor: '#3C6791',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: '50%',
  },
  ClickloginButton: {
    backgroundColor: '#08285E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 45,
    width: '50%',
    
  },
  ClickregisterButton: {
    backgroundColor: '#08285E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center', // Updated for consistency
    fontSize: 16,
              // 🆕 Slight increase for readability
  },
  buttonTextRegister: {
    color: 'white',
    textAlign: 'center', // Updated for consistency
    fontSize: 14,
    fontFamily: "Poppins-Bold",          // 🆕 Slight increase for readability
  },
  buttonTextLogin: {
    color: 'white',
    textAlign: 'center', // Updated for consistency
    fontSize: 14, 
    fontFamily: "Poppins-Bold",         // 🆕 Slight increase for readability
  },
  numBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
  numText: {
    width: '25%',
    height: 50,
  },
  verifyText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: '#1F2937',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
  otpInput: {
    width: 55,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#08285E',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: '#08285E',
    marginHorizontal: 6,
    elevation: 4, // 🆕 Slightly increased for focus
  },
  inputContainer: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 14, // 🆕 Slightly darker for contrast
    marginBottom: 4,
    fontFamily: "Poppins-Bold",
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: "Poppins-Regular",
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sendCodeButton: {
    backgroundColor: '#D39505',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10, // 🆕 more rounded for modern look
    height: 50,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  sendCodeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 1,
    fontFamily: "Poppins-Bold",
  },
  dashContainer: {
    padding: 1,
    marginBottom: '100%',
  },
  dashBackground: {
    flex: 1,
  },
  proLine: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
  profButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    height: 60,
    width: 50,
    marginTop: '50%',
  },
  dashText: {
    color: '#D39505',
    fontSize: 25,
    fontWeight: 'bold',
  },
  sidePage: {
    backgroundColor: 'white',
    height: '100%',
    width: '50%',
  },
  verifyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#08285E',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: "Poppins-Bold",
  },
  emailText: {
    fontSize: 16,
    color: '#3C6791',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resendText: {
    marginTop: 20,
    color: '#3C6791',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: "Poppins-Regular",
  },
  forgotText: {
    marginTop: 10,
    color: '#3C6791',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 12,
    marginRight: 8,
    fontFamily: "Poppins-Bold",
    textDecorationLine: 'underline',
  },
  
  
  
});

export default LoginStyle;
