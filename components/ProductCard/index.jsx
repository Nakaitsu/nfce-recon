import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

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