import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Trips from '../Trips/Trips';
import NewTrip from '../NewTrip/NewTrip';
import Paddlers from '../Paddlers/Paddlers';
import GearList from '../GearList/GearList';
import MealList from '../MealList/MealList';
import Dashboard from '../Dashboard/Dashboard';
import GearHome from '../GearHome/GearHome';
import MealHome from '../MealHome/MealHome';
import DetailTrips from '../DetailTrips/DetailTrips';
import ShoppingList from '../ShoppingList/ShoppingList';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/trips/:id">
            <Trips />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/newtrip">
            <NewTrip />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/paddlers/:id">
            <Paddlers />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/dashboard/:id">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/detail/:id">
            <DetailTrips />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/gear/:id">
            <GearHome />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/meal/:id"          >
            <MealHome />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/shoppinglist/:id">
            <ShoppingList />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/gearlist/:id">
            <GearList />
          </ProtectedRoute>

          <ProtectedRoute
            exact path="/meallist/:id">
            <MealList />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
