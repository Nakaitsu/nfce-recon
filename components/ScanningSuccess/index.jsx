import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import Button from 'react-native-button'

import styles from './styles'
import { ProductCard } from '../ProductCard'

export const ScanningSuccess = ({route, navigation}) => {
  const { data } = route.params

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.resultTitle}>Sucesso!</Text>
      </View>

      <View>
        <Text style={{fontSize: 18, fontWeight: 700, marginBottom: 20}}>{data.place}</Text>
        <Text style={{fontSize: 16, marginBottom: 20}}>
          <Text style={{fontWeight: 700}}>Total Gasto: </Text>
          <Text>R${data.total}</Text>
        </Text>
        <FlatList 
          style={styles.items}
          data={data.items}
          renderItem={ProductCard}
          keyExtractor={(item, index) => index.toString()} />
      </View>
      <View style={styles.footer}>
        <Button style={styles.button} onPress={() => navigation.navigate('Scan')}>Ler outra</Button>
      </View>
    </View>
  )
}