import store from '@/store/store'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }) {
  return (

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>

  );
}
