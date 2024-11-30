import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native'
import { getMonthlyAverageSpending, getPurchaseFrequency, getTopItemsPurchased } from '../data/sqlite/SQLiteDb'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

export const ControleScreen = () => {
  const [averageSpending, setAverageSpending] = useState(0)
  const [topItemsPurchased, setTopItemsPurchased] = useState([])
  const [purchasePredict, setPurchasePredict] = useState([])
  const [hasInformation, setHasInformation] = useState(false)
  const dailyMiliseconds = (1000 * 60 * 60 * 24)

  useFocusEffect(
    useCallback(() => { generateReport() }
  , []))

  const generateReport = async () => {
    // monhtly
    const monthlySpent = await getMonthlyAverageSpending()

    if(monthlySpent.length <= 0) {
      setHasInformation(false)
      return
    }

    const totalMonthlySpent = monthlySpent.reduce((sum, linha) => sum + linha.total, 0)
    const average = totalMonthlySpent / monthlySpent.length
    setAverageSpending(average.toFixed(2))

    // top
    const topItems = await getTopItemsPurchased(5)
    setTopItemsPurchased(topItems)

    // predict
    const minFrequency = 3
    const frequencies = await getPurchaseFrequency()
    const predictablePurchases = frequencies.filter(f => f.frequency >= minFrequency)
    const purchases = predictablePurchases.map(p => {
      const days = (new Date(p.last_purchase) - new Date(p.first_purchase)) / dailyMiliseconds
      const averageDaysPurchases = days / (p.frequency - 1)

      // console.log(p.first_purchase);
      // console.log(p.last_purchase);
      // console.log(days);
      // console.log(averageDaysPurchases);
      

      const nextPurchase = new Date(p.last_purchase)
      nextPurchase.setDate(nextPurchase.getDate() + averageDaysPurchases)

      // console.log(nextPurch;ase)

      return {
        desc: p.desc,
        nextPurchaseDate: nextPurchase.toDateString()
      }
    })
    
    setPurchasePredict(purchases)
    setHasInformation(true)
  }

  const calculateNextPurchase = (targetDate) => {
    const diffDays = Math.ceil((new Date(targetDate) - new Date()) / dailyMiliseconds)
    const diffWeeks = Math.ceil(diffDays / 7) 
    const diffMonths = Math.ceil(diffDays / 30) 
    let displayDateText

    console.log(targetDate)
    
    if (diffDays >= 1 && diffDays <= 6) { 
      displayDateText = `${diffDays} dia(s)`
    } 
    else if (diffWeeks >= 1 && diffWeeks <= 4) { 
      displayDateText = `${diffWeeks} semana(s)`
    } 
    else if (diffMonths >= 1 && diffMonths <= 3) { 
      displayDateText = `${diffMonths} mês(es)`
    } 
    else { 
      displayDateText = null 
    }

    return displayDateText
  }

  const sections = [
    {
      heading: 'Produtos mais comprados',
      data: topItemsPurchased,
      renderItem: ({item}) => (
        <View style={styles.content}>
          <Text style={{fontWeight: 700, marginBottom: 7}}>{item.desc}</Text>
          <Text>{item.place}</Text>
        </View>
      )
    },
    {
      heading: 'Previsão de compra',
      message: 'Após detectar 3 vezes a compra de 1 item, será exibido a previsão aqui, caso em datas diferentes.',
      data: purchasePredict,
      renderItem: ({item}) => (
        <View style={styles.content}>
          <Text>{item.desc}</Text>
          <Text>{calculateNextPurchase(item.nextPurchaseDate)}</Text>
        </View>
      )
    }
  ]
  
  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Controle de Gastos</Text>
      
      {hasInformation ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Média de gasto mensal</Text>
            <Text style={{fontSize: 18}}>R${averageSpending}</Text>
          </View>

          <SectionList 
            sections={sections}
            keyExtractor={(item, index) => index.toString()}
            renderSectionHeader={({section: { heading, message }}) => (
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{heading}</Text>
                {message && <Text style={styles.sectionHint}>{message}</Text>}
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.notEnoughData}> 
          Para visualizar esta tela, tente ler algumas notas fiscais, assim terei dados suficiente 
          para poder gerar o relatório.
        </Text>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 10,
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
  section: {
    marginBottom: 40
  },
  sectionTitleContainer: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  sectionHint: {
    fontSize: 12,
    color: '#5ECDE6'
  },
  content: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFE8E3',
    borderRadius: 7
  },
  notEnoughData: {
    textAlign: 'center',
    color: 'tomato'
  }
})