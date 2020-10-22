import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight + 200,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 200
  },

  timestamp: {
    fontSize: 12,
    marginRight: 30,
    // textAlign: 'right',
    // alignSelf: 'flex-end'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }
});
