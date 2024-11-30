import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Button from 'react-native-button';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';

import axios from 'axios'
import { insertPurchase } from '../../data/sqlite/SQLiteDb';
import styles from './styles';

export const Leitura = ({navigation}) => {
  const [cameraPermissions, requestPermission] = useCameraPermissions()
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect( () => {
    const start = async () => { 
      const { granted } = await requestPermission(); 

      if(!granted)
        Alert.alert("Camera", "Para usar esta funcionalidade, você precisa permitir o acesso a camera do dispositivo.")
    }; 
    
    start();
  }, [isScanning])

  const handleBarcodeScanned = async (data) => {
    // validar url da sefaz
    setIsScanning(false)
    setIsLoading(true)

    const validUrlPrefix = "http://nfe.sefaz"

    if(!data.startsWith(validUrlPrefix))
      Alert.alert('Oops!', 'Parece que o código não representa uma nota fiscal válida!')

    // desabilitar camera com loading
    // makeRequest(data)

    try {
      let response = await axios.post('https://nfce-scrap-api.vercel.app/', { qrUrl: data })

      insertPurchase(response.data)

      setIsLoading(false)
      navigation.navigate('Success', {data: response.data})
    }
    catch(ex) {
      console.log(ex.message)
      Alert.alert('Oops', 'Houve um erro ao processar a leitura da nota!')
    }
  }
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>carregando...</Text>
      ) : (
        <>
          {!isScanning && (
            <>
              <Text style={{fontSize: 24, marginBottom: 60}}>Bem vindo ao NFCe Recon</Text>
              <Icon name="qrcode" size={150} color="#0f0f0f" style={{marginBottom: 20}} />
              <Button style={styles.button} onPress={() => setIsScanning(true)}>Iniciar Leitura</Button>
            </>
          )}
    
          {isScanning && (
            <>
              <Text style={styles.scanTip}>Aponte sua camera para o QR code da nota fiscal que deseja ler</Text>
              <CameraView 
                mode='picture'
                style={styles.camera} 
                facing='back' 
                onBarcodeScanned={({data}) => handleBarcodeScanned(data)}
                autofocus='on'/>
                <View style={styles.footer}>
                  <Button
                    style={styles.cancelButton}
                    onPress={() => setIsScanning(false)}
                  >
                    Cancelar
                  </Button>
                </View>
            </>
          )}
        </>
      )}
    </View>
  )
}