import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";


function MyApp({ Component, pageProps }) {
  return (
  <MoralisProvider serverUrl="https://zyc9lue3uyo5.usemoralis.com:2053/server" appId="9UvL0V8oIagi2S0vJCvjJrEwmb1Y1WDmW2jcwQld">
  <Component {...pageProps} />
  </MoralisProvider>
  
  )
}
  export default MyApp