import React from 'react'
import './App.css'
import Home from './pages/Home';
import SigninPages from './pages/SignIn';
import SignupPages from './pages/SignUp';
import { 
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom'
 
function App() {
  return (
    <div>
      <Router>
        <Switch>
           <Route exact path="/" >
              <Home/>
           </Route>
           <Route path="/home" >
              <Home/>
           </Route><Route path="/signin" >
              <SigninPages/>
           </Route>
           <Route path="/signup" >
              <SignupPages/>
           </Route>
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
