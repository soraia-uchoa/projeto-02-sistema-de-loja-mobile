import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Carrinho({ route, navigation }) {
  const user = route.params.user
  const [carrinho, setCarrinho] = useState([])

  useEffect(() => {
    const carregarCarrinho = async () => {
      const data = JSON.parse(await AsyncStorage.getItem(`carrinho_${user.usuario}`)) || []
      setCarrinho(data)
    }
    carregarCarrinho()
  }, [])

  const finalizarCompra = async () => {
    await AsyncStorage.removeItem(`carrinho_${user.usuario}`)
    setCarrinho([])
    alert('Compra realizada com sucesso!')
  }

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={carrinho}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 5 }}>
            <Text>{item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: R$ {item.preco}</Text>
          </View>
        )}
      />
      <Button title="Finalizar Compra" onPress={finalizarCompra} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  )
}