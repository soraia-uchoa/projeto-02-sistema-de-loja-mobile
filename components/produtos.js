import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Image, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Produtos({ route, navigation }) {
  const [produtos, setProdutos] = useState([])
  const [quantidade, setQuantidade] = useState({})
  const user = route.params.user

  useEffect(() => {
    const carregarProdutos = async () => {
      const data = JSON.parse(await AsyncStorage.getItem('produtos')) || []
      setProdutos(data)
    }
    carregarProdutos()
  }, [])

  const adicionarCarrinho = async (produto) => {
    const carrinhoKey = `carrinho_${user.usuario}`
    const carrinho = JSON.parse(await AsyncStorage.getItem(carrinhoKey)) || []
    const qtd = parseInt(quantidade[produto.id] || '1')
    carrinho.push({ ...produto, quantidade: qtd })
    await AsyncStorage.setItem(carrinhoKey, JSON.stringify(carrinho))
    alert('Produto adicionado ao carrinho')
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 5, borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>R$ {item.preco}</Text>
            {item.imagem ? <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100 }} /> : null}
            <Text>Quantidade:</Text>
            <TextInput
              value={quantidade[item.id]?.toString() || '1'}
              onChangeText={text => setQuantidade({ ...quantidade, [item.id]: text })}
              keyboardType="numeric"
              style={{ borderWidth: 1, marginBottom: 5 }}
            />
            <Button title="Adicionar ao Carrinho" onPress={() => adicionarCarrinho(item)} />
          </View>
        )}
      />
      <Button title="Ver Carrinho" onPress={() => navigation.navigate('Carrinho', { user })} />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  )
}