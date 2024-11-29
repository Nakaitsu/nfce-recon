import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import Button from 'react-native-button';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';

import axios from 'axios'
import { insertPurchase } from '../../data/sqlite/SQLiteDb';

export const Leitura = ({navigation}) => {
  const [cameraPermissions, requestPermission] = useCameraPermissions()
  const [isScanning, setIsScanning] = useState(false)
  
  async function makeRequest(url) {
    let response = await axios.post('https://nfce-scrap-api.vercel.app/', { qrUrl: url })
    navigation.navigate('Success', {data: response.data})
  }

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

    const validUrlPrefix = "http://nfe.sefaz"

    if(!data.startsWith(validUrlPrefix))
      Alert.alert('Oops!', 'Parece que o código não representa uma nota fiscal válida!')

    // desabilitar camera com loading
    // makeRequest(data)

    try {
      let response = await axios.post('https://nfce-scrap-api.vercel.app/', { qrUrl: data })

      insertPurchase(response.data)

      navigation.navigate('Success', {data: response.data})
    }
    catch(ex) {
      console.log(ex.message)
      Alert.alert('Oops', 'Houve um erro ao processar a leitura da nota!')
    }
  }
  
  return (
    <View style={styles.container}>
      {!isScanning && (
        <>
          <Text style={{fontSize: 24, marginBottom: 60}}>Bem vindo ao NFCe Recon</Text>
          <Icon name="qrcode" size={150} color="#0f0f0f" style={{marginBottom: 20}} />
          {/* <Button style={styles.button} onPress={() => handleBarcodeScanned('http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx?p=29241147066018000150652030002066571003476088|2|1|1|39789a9f3b008218c47d98d7dc46ad046596dc0a')}>Iniciar Leitura</Button> */}
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
    </View>
  )
}

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