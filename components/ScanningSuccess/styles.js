import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 10,
    flex: 1
  },
  resultTitle: {
    fontSize: 26,
    color: '#34C26A',
    textAlign: 'center',
    marginBottom: 50
  },
  items: {
    padding: 2,
  },
  button: {
    backgroundColor: '#0f0f0f',
    color: '#fff',
    width: '100%',
    padding: '15',
    width: '30%',
    borderRadius: 7,
    margin: 'auto',
    marginBottom: 15
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
})

export default styles