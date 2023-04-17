import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto'

import theme from './src/theme'
import { Routes } from '@routes/index'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  })
  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  )
}
