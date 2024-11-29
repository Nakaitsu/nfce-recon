import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Button from 'react-native-button'

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
});