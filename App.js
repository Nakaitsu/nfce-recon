import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { LeituraScreen } from './screens/LeituraScreen';
import { ControleScreen } from './screens/ControleScreen';
import { HistoricoScreen } from './screens/HistoricoScreen';

import Icon from 'react-native-vector-icons/Feather';

import { resetDatabase, startDatabase } from './data/sqlite/SQLiteDb';

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    const init = async () => {
      await startDatabase()
      // await resetDatabase()
    }

    init()
  }, [ ])
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          headerShown: false,
          tabBarStyle: { backgroundColor: 'tomato' }
        }}
      >
        <Tab.Screen 
          name="Leitura" 
          component={LeituraScreen} 
          options={{tabBarIcon: ({focused}) => (
            <Icon name="maximize" size={20} color={focused ? '#fff' : '#333'} />
          )}}/>
        <Tab.Screen 
          name="Historico"
          component={HistoricoScreen}
          options={{tabBarIcon: ({focused}) => (
            <Icon name='database' size={20} color={focused ? '#fff' : '#333'} />
          )}} />
        {/* <Tab.Screen 
          name="Controle" 
          component={ControleScreen}
          options={{tabBarIcon: ({focused}) => (
            <Icon name='dollar-sign' size={20} color={focused ? '#fff' : '#333'} />
          )}} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}