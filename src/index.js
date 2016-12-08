import React, { Component } from 'react';
import { View } from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import { TABS } from './MockData';
import TabContainer from './TabContainer';
export default class Home extends Component {
  constructor(props) {
      super(props);
      this._renderScrollableTabBar = this._renderScrollableTabBar.bind(this);
    }

  _renderScrollableTabBar() {
    return (<DefaultTabBar />);
  }

  render() {
    return (
      <ScrollableTabView
        initialPage={0}
        prerenderingSiblingsNumber={1}
        renderTabBar={this._renderScrollableTabBar}
        locked={true}
      >
        {TABS.map((tab, index) =>
          <TabContainer
            tab={tab}
            tabLabel={tab.name}
            key={index}
          />
        )}
      </ScrollableTabView>

    );
  }
}
