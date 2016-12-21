import React, { Component } from 'react';

import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import { TABS } from './MockData';
import ScrollableTabs from './ScrollableTabs';
import TabContainer from './TabContainer';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    }
  }

  render() {
    return (
      <ScrollableTabs
        activeTab={this.state.activeTab}
        onTabChange={(activeTab) => this.setState({ activeTab })}
      >
        {TABS.map((tab, index) =>
          <TabContainer tab={tab} key={index} index={index} />
        )}
      </ScrollableTabs>
    );
  }
}
