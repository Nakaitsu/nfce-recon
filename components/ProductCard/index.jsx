import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export const ProductCard = ({ item }) => {
  return (
    <View style={styles.productCard}>
      <Text style={styles.itemDescription}>{item.desc}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemAmount}>Qtd.: {item.qtd}</Text>
        <Text style={styles.itemValue}>R${item.val}</Text>
        <Text style={styles.itemTotal}>
          <Text style={{fontWeight: 700}}>Total: </Text>
          <Text>R${item.unType === 'UN' ? item.val * item.qtd : item.val}</Text>
        </Text>
      </View>
    </View>
  )
}

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
