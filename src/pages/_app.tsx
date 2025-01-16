// pages/_app.tsx
import './globals.css';  // Adjust path as necessary to point to your globals.css

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
