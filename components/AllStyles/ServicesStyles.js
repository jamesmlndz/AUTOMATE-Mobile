import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardSize = (width - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FA', // soft bluish background
  },
  header: {
    backgroundColor: '#0B2B66',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  backIcon: {
    width: 24, // width matches spacer
  },
  gridContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#0B2B66', // muted soft blue
    borderRadius: 14,
    overflow: 'hidden',
    margin: 6,
    width: cardSize,
    shadowColor: '#0B2B66',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  serviceImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    flexShrink: 1,
  },
});

export default styles;
