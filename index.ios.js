/**
* Sample React Native + Meteor
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import Meteor, { createContainer, connectMeteor } from 'react-native-meteor';
import { Router, Scene, Actions, Modal, Switch } from 'react-native-router-flux';
import Loading from './app/Loading';
import Login from './app/Login';
import Dashboard from './app/Dashboard';

class SimpleMeteor extends Component {
  componentWillMount() {

    Meteor.connect('http://localhost:3000/websocket');//do this only once

    this.scenes = Actions.create(
      <Scene key="root" component={createContainer(this.getMeteorData, Switch)} selector={this.selector}>
        <Scene key="login" component={Login} title="Login" />
        <Scene key="loading" component={Loading} title="Loading" />
        <Scene key="loggedIn">
          <Scene key="dashboard" component={Dashboard} title="Dashboard" />
        </Scene>
      </Scene>
    );
  }

  getMeteorData() {
    return {
      connected: Meteor.status().connected,
      user: Meteor.user(),
      loggingIn: Meteor.loggingIn(),
    };
  }

  selector(data, props) {
    if (!data.connected || data.loggingIn) { return 'loading'; }
    else if (!data.user) { return 'login'; }
    return 'loggedIn';
  }

  render() {
    return (
      <Router scenes={this.scenes} />
    );
  }
}

AppRegistry.registerComponent('SimpleMeteor', () => SimpleMeteor);
