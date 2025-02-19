import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#AB7878', // Main background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#474747', // Dark gray for text
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 140,
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
  },
})
