import { StyleSheet } from 'react-native';

export const AccountCreatedStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 45,
    color: '#3C5A99', 
    textAlign: 'center',
    fontFamily: "Poppins",
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#B8860B', 
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: "Poppins",
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    
  },
});
