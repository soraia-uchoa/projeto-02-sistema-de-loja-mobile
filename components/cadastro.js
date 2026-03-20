import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cadastro({ navigation }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const cadastrar = async () => {
    if (!usuario || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    const users = JSON.parse(await AsyncStorage.getItem('users')) || []
    if (users.find(u => u.usuario === usuario)) {
      Alert.alert('Erro', 'Usuário já existe')
      return
    }

    users.push({ usuario, senha })
    await AsyncStorage.setItem('users', JSON.stringify(users))
    Alert.alert('Sucesso', 'Usuário cadastrado')
    navigation.goBack()
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario:</Text>
      <TextInput value={usuario} onChangeText={setUsuario} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Senha:</Text>
      <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  )
}