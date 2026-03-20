import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const login = async () => {
    if (usuario === 'gerente' && senha === 'nileve') {
      navigation.replace('Admin')
      return;
    }

    const users = JSON.parse(await AsyncStorage.getItem('users')) || []
    const user = users.find(u => u.usuario === usuario && u.senha === senha)

    if (user) {
      navigation.replace('Produtos', { user })
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos')
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuário:</Text>
      <TextInput value={usuario} onChangeText={setUsuario} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Senha:</Text>
      <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={login} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  )
}