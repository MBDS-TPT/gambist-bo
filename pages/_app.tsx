import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorStyles } from '../styles/colors';
import { createGlobalStyle } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {


  const GlobalStyle = createGlobalStyle<Record<string, any>>`
    ${ColorStyles}
  `;

  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
