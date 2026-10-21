import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </QueryClientProvider>
);
