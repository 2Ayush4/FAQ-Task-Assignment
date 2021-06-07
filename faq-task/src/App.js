import React, {Component} from 'react'
import Loginpage from './components/LoginPage'
import RegistrationPage from './components/RegistrationPage'
import ResetPassword from './components/ResetPassword'
import FAQ from './components/FAQ'

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor( ){
    super()
  }

  render( ){
    return (
      <React.Fragment>
          <BrowserRouter>
              <Switch>
              <Route exact path="/">
                  <Loginpage />
                </Route>
                <Route path="/login">
                  <Loginpage />
                </Route>
                <Route path="/register">
                  <RegistrationPage />
                </Route>
                <Route path="/faq">
                  <FAQ />
                </Route>
                <Route path="/resetpassword">
                  <ResetPassword />
                </Route>
              </Switch>
      </BrowserRouter>
      </React.Fragment>
    )
  }

}

export default App;
