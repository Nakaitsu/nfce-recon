import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  productCard: {
    padding: 10,
    backgroundColor: '#E8E8E8',
    marginBottom: 10,
    borderRadius: 7
  },
  itemDescription: {
    width: '100%',
    fontWeight: 700,
    marginBottom: 10
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  itemValue: {
    flex:1
  },
  itemAmount: {
    flex:1,
    color: '#333'
  },
  itemTotal: {
    flex:1
  }
})

export default styles