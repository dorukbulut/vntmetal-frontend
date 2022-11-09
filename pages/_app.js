import '../styles/globals.css'
import Head from "next/head"
export default function MyApp({ Component, pageProps }) {
    return (

      <div>
        <Head>
          <title>DÖKÜM YÖNETİM SİSTEMİ</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </div>
      
    )
     
  }