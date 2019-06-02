import * as React from 'react';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import ChatPage from '../../pages/Chat/ChatPage';
import SettingsPage from '../../pages/Settings/SettingsPage';

// Fix React Router active class setting for redux connected components
const BlockedNavigation = withRouter(Navigation);

export const AppRouter = () => {
  return (
    <HashRouter>
      <React.Fragment>
        <BlockedNavigation />
        <Switch>
          <Route exact={true} path='/' component={ChatPage} />
          <Route path='/chat' component={ChatPage} />
          <Route path='/settings' component={SettingsPage} />
        </Switch>
      </React.Fragment>
    </HashRouter>
  );
};

export default AppRouter;