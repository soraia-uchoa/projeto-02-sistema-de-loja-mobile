import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Admin({ navigation }) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    const carregarProdutos = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('produtos')) || []
      setProdutos(data)
    }
    carregarProdutos()
  }, [])

  const adicionarProduto = async () => {
    if (!nome || !descricao || !preco) return

    const data = [...produtos, { id: Date.now().toString(), nome, descricao, preco, imagem }]
    setProdutos(data)
    await AsyncStorage.setItem('produtos', JSON.stringify(data))

    setNome('')
    setDescricao('')
    setPreco('')
    setImagem('')
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome do Produto:</Text>
      <TextInput value={nome} onChangeText={setNome} style={{ borderWidth: 1, marginBottom: 5 }} />
      <Text>Descrição:</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, marginBottom: 5 }} />
      <Text>Preço:</Text>
      <TextInput value={preco} onChangeText={setPreco} style={{ borderWidth: 1, marginBottom: 5 }} keyboardType="numeric" />
      <Text>Imagem (link):</Text>
      <TextInput value={imagem} onChangeText={setImagem} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Adicionar Produto" onPress={adicionarProduto} />

      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.preco}</Text>
            {item.imagem ? <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100 }} /> : null}
          </View>
        )}
      />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  )
}