import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import LegoList from './components/Lego/LegoList';
import LegoDetails from './components/Lego/LegoDetails';
import CreateLegoForm from './components/Lego/LegoForms/CreateLegoForm';
import EdiLegoForm from './components/Lego/LegoForms/UpdateLegoForm';
import ProfilePage from './components/Profile/Profile';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path="/" component={LegoList} />
        <Route path='/lego/new' component={CreateLegoForm} />
        <Route exact path='/lego/:legoId/edit' component={EdiLegoForm} />
        <Route exact path="/lego/:legoId" component={LegoDetails} />
        <Route path="/profile/:userId" component={ProfilePage} />
        <Route><h1>Page Not Found</h1></Route>
      </Switch>
      }
    </>
  );
}

export default App;
