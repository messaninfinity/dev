import "../css/index.css";
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'next-auth/client'
import 'rsuite/dist/styles/rsuite-default.css'
import { StoreProvider } from 'easy-peasy';
import { store } from '../store/stack_store';

import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (

    <StoreProvider store={store}>
      <Provider session={pageProps.session}>
        <ChakraProvider>

          <Head>
            <title>CloudX Dashboard</title>
            <meta
              name="Description"
              content="A Next.js starter styled using Tailwind CSS."
            />
            
          </Head>

          <Component {...pageProps} />

        </ChakraProvider>
      </Provider>


    </StoreProvider>

  );
}

export default MyApp;
