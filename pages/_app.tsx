import Layout from '../components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


// Layoutは全てのページに適応するために_app.tsxにてComponentを包み込む
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
