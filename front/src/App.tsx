import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './content/authentication/Login';
import { AuthContext } from './contexts/AuthContext';
import routes from './router';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  const { state } = useContext(AuthContext);

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {!state.isLoading && state.token ? content : <Login />}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
