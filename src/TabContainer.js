import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  ListView,
  Image,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  scrollTab: {
    flex: 1,
  },
  tabContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
});

export default class TabContainer extends Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row, newRow) => row !== newRow }),
    };
  }


  _renderItem(item, rowId) {
    return (
      <View
        style={{
          backgroundColor: 'lightgray',
          borderColor: 'gray',
          borderWidth: 1,
          height: 110,
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            height: 80,
            width: 150,
          }}
          source={{uri: item.url}}
        />
        <View
          style={{
            height: 30,
            width: 150,
          }}
        >
          <Text>
            {item.title}
          </Text>
        </View>
      </View>
    );
  }


  render() {
    const {
      tab,
    } = this.props;

    const dataSource = this.state.dataSource.cloneWithRows(tab.items);

    return (
      <ListView
        enableEmptySections
        style={styles.scrollTab}
        contentContainerStyle={styles.tabContainer}
        dataSource={dataSource}
        renderRow={this._renderItem}
      />
    );
  }
}
