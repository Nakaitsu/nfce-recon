import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import { Leitura } from '../components/Leitura';
import { ScanningSuccess } from '../components/ScanningSuccess';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

export const LeituraScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Scan' component={Leitura} options={{headerShown: false}} />
      <Stack.Screen name='Success' component={ScanningSuccess} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}