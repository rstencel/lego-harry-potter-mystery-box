import '../styles/globals.css'
import type { AppProps } from 'next/app'
import messages from '../translations/en'
import { IntlProvider } from 'react-intl'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => (
  <IntlProvider locale='en' messages={messages}>
    <Component {...pageProps} />
    <ToastContainer />
  </IntlProvider>
)

export default App