import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './components/login'
import Cadastro from './components/cadastro'
import Admin from './components/admin'
import Produtos from './components/produtos'
import Carrinho from './components/carrinho'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}