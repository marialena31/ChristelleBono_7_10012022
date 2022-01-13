import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import Feed from './pages/feed';
import Home from './pages/home';
import Profile from './pages/profile';
import Footer from './components/footer/footer.component';

function App() {
  return (
        <div>
          <Header/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/feed' exact component={Feed} />
                <Route path='/profile' exact component={Profile} />
                <Redirect to='/' />
            </Switch>
          <Footer/>
        </div>
);
}

export default App;
