import { useState } from 'react'

import firestore from '@react-native-firebase/firestore'

import { Container } from './styles'
import { ButtonIcon } from '../ButtonIcon'
import { Input } from '../Input'
import { Alert } from 'react-native'

export function FormBox() {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)

  async function handleNewProduct() {
    await firestore()
      .collection('products')
      .add({
        description,
        quantity,
        done: false,
      })
      .then(() => {
        Alert.alert('Produto adicionado com sucesso!')
        setDescription('')
        setQuantity(0)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
        value={description}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        onChangeText={(value) => setQuantity(Number(value))}
        value={String(quantity)}
        style={{ marginHorizontal: 8 }}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleNewProduct}
      />
    </Container>
  )
}
