import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListSubmission from '../pages/ListSubmission';
import ListSubmissionAdmin from '../pages/ListSubmissionAdmin';
import AddSubmission from '../pages/AddSubmission';
import EditSubmission from '../pages/EditSubmission';
import AddProfile from '../pages/AddProfile';
import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';
import AddReward from '../pages/AddReward';
import RedeemedRewards from '../pages/RedeemedRewards';
import ListReward from '../pages/ListReward';
import RewardsPage from '../pages/RewardsPage';
import ListRewardAdmin from '../pages/ListRewardAdmin';
import EditReward from '../pages/EditReward';
import AddChallenge from '../pages/AddChallenge';
import ListChallenge from '../pages/ListChallenge';
import ChallengesPage from '../pages/ChallengesPage';
import ListChallengeAdmin from '../pages/ListChallengeAdmin';
import EditChallenge from '../pages/EditChallenge';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/add-profile" component={AddProfile}/>
            <ProtectedRoute path="/edit-profile/:_id" component={EditProfile}/>
            <ProtectedRoute path="/profile" component={Profile}/>
            <ProtectedRoute path="/home" component={Home}/>
            <ProtectedRoute path="/add" component={AddSubmission}/>
            <ProtectedRoute path="/list" component={ListSubmission}/>
            <ProtectedRoute path="/edit/:_id" component={EditSubmission}/>
            <ProtectedRoute path="/rewards/add" component={AddReward}/>
            <ProtectedRoute path="/challenges/add" component={AddChallenge}/>
            <ProtectedRoute path="/rewards/list" component={ListReward}/>
            <ProtectedRoute path="/challenges/list" component={ListChallenge}/>
            <ProtectedRoute path="/rewards/edit/:_id" component={EditReward}/>
            <ProtectedRoute path="/challenges/edit/:_id" component={EditChallenge}/>
            <ProtectedRoute path="/rewards/redeemed" component={RedeemedRewards}/>
            <ProtectedRoute path="/rewards" component={RewardsPage}/>
            <ProtectedRoute path="/challenges/view" component={ChallengesPage}/>
            <AdminProtectedRoute path="/review/submissions" component={ListSubmissionAdmin}/>
            <AdminProtectedRoute path="/review/rewards" component={ListRewardAdmin}/>
            <AdminProtectedRoute path="/review/challenges" component={ListChallengeAdmin}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
