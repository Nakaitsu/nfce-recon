import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0f0f0f',
    color: '#fff',
    width: '100%',
    padding: '15',
    borderRadius: 7
  },
  scanTip: {
    position: 'absolute',
    zIndex: 99,
    top: 120,
    width: '80%',
    left: 'calc(50% - 80%)',
    color: '#fff',
    textAlign: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  cancelButton: {
    backgroundColor: '#F0421F',
    width: '60%',
    marginHorizontal: 'auto',
    marginBottom: 15,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 7
  }
})

export default styles