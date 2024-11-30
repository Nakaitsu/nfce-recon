import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { deletePurchase, getPurchases } from '../data/sqlite/SQLiteDb'
import { ProductCard } from '../components/ProductCard'
import { useFocusEffect } from '@react-navigation/native'

export const HistoricoScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState([])

  useFocusEffect( 
    useCallback(() => { generateHistory(); }
  , []))

  const generateHistory = async () => {
    let purchaseList = await getPurchases()
  
    const historyIntervals = new Map()
  
    purchaseList.forEach(purchase => {
      const purchaseDate = new Date(purchase.date).toDateString()
      const purchaseId = purchase.purchase_id
  
      if (!historyIntervals.has(purchaseDate)) {
        historyIntervals.set(purchaseDate, { purchases: new Map(), total: 0 })
      }
  
      const purchaseDateGroup = historyIntervals.get(purchaseDate)
  
      if (!purchaseDateGroup.purchases.has(purchaseId)) {
        purchaseDateGroup.purchases.set(purchaseId, { place: purchase.place, items: [], total: 0 })
      }
  
      const placeGroup = purchaseDateGroup.purchases.get(purchaseId)
  
      placeGroup.items.push({ ...purchase }) 
      const itemTotal = purchase.unType === 'UN' ? purchase.val * purchase.qtd : purchase.val
      placeGroup.total += itemTotal
      purchaseDateGroup.total += itemTotal
    })
  
    const orderedHistoryIntervals = Array.from(historyIntervals.entries())
      .sort((a, b) => new Date(b[0]) - new Date(a[0]));
  
    setPurchaseHistory(orderedHistoryIntervals)
    setIsLoading(false)
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }  

  const handlePurchaseDelete = async (id) => {
    await deletePurchase(id)
    setIsLoading(true)
    generateHistory()
  }
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>carregando....</Text>
      ) : (<>
        <Text style={styles.resultTitle}>Histórico de Compras</Text>
        <FlatList
          style={styles.items}
          data={purchaseHistory}
          renderItem={({item}) => (
            <View style={styles.group}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>{formatDate(item[0])}</Text>
                <Text style={{fontSize: 14}}>
                  <Text style={{fontWeight: 700}}>Total: </Text>
                  <Text>R${item[1].total.toString()}</Text>
                </Text>
              </View>
              
              {Array.from(item[1].purchases.entries()).map(([purchaseId, details]) => (
                <View key={purchaseId} style={styles.placeGroup}>

                  <View style={styles.placeHeader}>
                    <Text style={styles.placeTitle}>{details.place}</Text>
                    
                    <TouchableOpacity onPress={() => handlePurchaseDelete(purchaseId)}> 
                      <Text style={styles.deleteButton}>deletar</Text> 
                    </TouchableOpacity> 
                  </View>

                  <Text style={styles.placeTotal}>
                    <Text style={{fontWeight: 700}}>Gasto total: </Text>
                    <Text>R$ {details.total.toFixed(2)}</Text>
                  </Text>
                  
                  {details.items.map((product, index) => (
                    <ProductCard key={index} item={product} />
                  ))}
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </>)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 5,
    paddingHorizontal: 10,
    flex: 1
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#333',
    textAlign: 'center',
    marginBottom: 50
  },
  items: {
    padding: 2,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10
  },
  dateHeader: {
    width: '100%',
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 700
  },
  placeHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  deleteButton: { 
    fontSize: 14, 
    color: 'red',
    textDecorationLine: 'underline' 
  },
  placeTotal: {
    marginBottom: 10
  },
  placeGroup: {
    marginVertical: 10
  },
  group: {
    marginBottom: 40
  }
})