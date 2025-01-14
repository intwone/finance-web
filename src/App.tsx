import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '@src/context/auth';
import { apolloClient } from '@src/services/clients/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './routes';
import GlobalStyle from './styles/global';
import theme from './theme';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Routers />
          <ToastContainer
            toastStyle={{
              backgroundColor: theme.colors.gray[800],
              color: theme.colors.gray[700],
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
