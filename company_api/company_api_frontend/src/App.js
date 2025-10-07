import { Route,Routes } from 'react-router-dom';
import './App.css';
import PageNotFound from './PageNotFound';
import { ThemeProvider,createTheme } from '@mui/material';
import Admin from './Admin/Admin';
import SignUp from './Admin/Signup';
import Dashboard from './Admin/Dashboard';
import ErrorBoundary from './Error_Handlers/ErrorBoundary';
const theme= createTheme({
  typography:{
    fontFamily:"Ubuntu",
    fontWeight:"400"
  },
  custom:{
    labelFontSize:"0.9vw",
    lightgrey:'hsl(225, 23%, 24%)'
  }
})
function App() {
  return (
  <>
  <ErrorBoundary>
  <ThemeProvider theme={theme}>
  <Routes>
    {/* Admin */}
    <Route path='/admin' element={<Admin/>}>
    <Route index element={<SignUp/>}></Route>
    <Route path='dashboard' element={<Dashboard/>}/>
    </Route>
    <Route path='*' element={<PageNotFound/>}/>
  </Routes>
  </ThemeProvider>
  </ErrorBoundary>
  </>
  );
}

export default App;
