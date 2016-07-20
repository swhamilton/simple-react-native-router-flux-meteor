'use strict';

import React, {
  Component
} from 'react';
import {
  Text,
  View
} from 'react-native';
export default class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <View><Text>Dashboard scene</Text>
      </View>
    );
  }
}
