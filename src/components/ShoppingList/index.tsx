import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import { styles } from './styles'
import { Product, ProductProps } from '../Product'

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([])

  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then((response) => {
  //       const data = response.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         }
  //       }) as ProductProps[]
  //       setProducts(data)
  //     })
  //     .catch((error) => console.log(error))
  // })

  useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      // .limit(1)
      // .where('quantity', '==', 2)
      .orderBy('quantity')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]
        setProducts(data)
      })

    return () => subscriber()
  })

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  )
}
