import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider  } from '@material-ui/core/styles';
import Header from '../components/ui/Header'
import theme from './ui/Theme';

function App() {
  return (
    <ThemeProvider  theme={theme}>
    <BrowserRouter>
    <Header /> 
      hello
      <Switch>
      <Route exact path='/' component={()=> <div>Home</div>} />
      <Route exact path='/services' component={()=> <div>Services</div>} />
      <Route exact path='/revo' component={()=> <div>Revo</div>} />
      <Route exact path='/about' component={()=> <div>About</div>} />
      <Route exact path='/contact' component={()=> <div>Contact</div>} />

      </Switch>

    </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
