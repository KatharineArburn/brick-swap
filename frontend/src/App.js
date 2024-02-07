import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import LegoList from './components/Lego/LegoList';
import LegoDetails from './components/Lego/LegoDetails';

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
        {/* <Route path='/spots/new' component={CreateSpotForm} /> */}
        {/* <Route path="/spots/current" component={ManageSpots} /> */}
        <Route exact path="/lego/:legoId" component={LegoDetails} />
        {/* <Route exact path='/spots/:spotId/edit' component={EditSpotForm} /> */}
      </Switch>
      }
    </>
  );
}

export default App;
