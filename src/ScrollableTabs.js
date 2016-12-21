import React, { Component } from 'react';

import {
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const initWidth = Dimensions.get('window').width;

export default class ScrollableTabs extends Component {

  constructor(props) {
    super(props);
    this._renderLeftSibling = this._renderLeftSibling.bind(this);
    this._renderRightSibling = this._renderRightSibling.bind(this);
    this.state = {
      activeTab: props.activeTab,
      panX: new Animated.Value(0),
      isLeftVisible: false,
      isRightVisible: false,
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => this._isVerticalScroll(gestureState),
      onPanResponderGrant: (evt, gestureState) => this._enableSibling(evt, gestureState),
      onPanResponderMove: (evt, gestureState) => Animated.event([{dx: this.state.panX}])(gestureState),
      onPanResponderRelease: () => this._animateTransition(),
    });
  }

  _isVerticalScroll(gestureState) {
    const { dx, dy } = gestureState;
    return Math.abs(dx) > Math.abs(dy);
  }

  _getDeviceWidth() {
    return Dimensions.get('window').width;
  }

  _enableSibling(evt, gestureState) {
    const { vx } = gestureState;
    const direction = Math.sign(vx);
    let stateUpdate = {};
    if (this._canScrollLeft(direction)) {
      stateUpdate = { ...stateUpdate, isLeftVisible: true };
      this.state.panX.setOffset( - this._getDeviceWidth());
    }
    if (this._canScrollRight(direction)) {
      stateUpdate = { ...stateUpdate, isRightVisible: true };
    }
    this.setState(stateUpdate);
  }

  _canScrollLeft(direction) {
    return direction > 0 && this.state.activeTab > 0;
  }

  _canScrollRight(direction) {
    return direction < 0 && this.state.activeTab < this.props.children.length - 1;
  }


  _animateTransition() {
		const { panX, activeTab } = this.state;
		const direction = panX._value > 0 ? 1 : -1;
		const canMove = this._canScrollLeft(direction) || this._canScrollRight(direction);
    const isSwipeLongEnough = Math.abs(panX._value) > this.props.swipeThreshold;

		if (isSwipeLongEnough && canMove) {
			this._startAnimatedTransition(this._getDeviceWidth() * direction, activeTab - direction);
		} else {
			this._startAnimatedTransition(0, activeTab);
		}
	}

  _resetValues(newActiveTab) {
    this.state.panX.setValue(0);
    this.state.panX.setOffset(0);
    this.setState({
      activeTab: newActiveTab,
      isLeftVisible: false,
      isRightVisible: false,
    });
  }

  _startAnimatedTransition(toValue, newActiveTab) {
		let { panX } = this.state;
    panX.stopAnimation();
    const animatedConfig = {
      tension: 70,
      friction: 10,
      toValue: toValue,
      onComplete: () => this._resetValues(newActiveTab),
    };
    this.props.onTabChange(newActiveTab);
		this.finishPanAnimation = Animated.spring(panX, animatedConfig)
    this.finishPanAnimation.start();
  }


  _getWidthStyles() {
    const anyTabVisible = this.state.isLeftVisible || this.state.isRightVisible;
    if (!anyTabVisible) {
      return { flexGrow: 1 };
    }
    return {
      width: this._getDeviceWidth(),
    };
  }

  _getTabRendererArray() {
    const widthStyles = this._getWidthStyles();
    return this.props.children.map((child, index) => (
      () => (
        <View
          key={child.props.index}
          style={[
            widthStyles,
          ]}
        >
          {child}
        </View>
      )
    ));
  }

  _renderLeftSibling(tabRendererArray) {
    const {
      activeTab,
      isLeftVisible,
    } = this.state;
    const hasLeftSibling = activeTab > 0;
    const leftTabIndex = activeTab - 1;
    if (!hasLeftSibling || !isLeftVisible) { return null; }
    return tabRendererArray[leftTabIndex]();
  }

  _renderRightSibling(tabRendererArray) {
    const {
      activeTab,
      isRightVisible
    } = this.state;

    const hasRightSibling = activeTab < this.props.children.length - 1
    const rightTabIndex = activeTab + 1;

    if (!hasRightSibling || !isRightVisible) { return null; }
    return tabRendererArray[rightTabIndex]();
  }

  render() {
    const tabRendererArray = this._getTabRendererArray();
    const {
      activeTab,
    } = this.state;

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          { transform: [{ translateX: this.state.panX }] },
          { flex: 1, flexDirection: 'row' },
        ]}
      >
        { this._renderLeftSibling(tabRendererArray) }
        { tabRendererArray[activeTab]() }
        { this._renderRightSibling(tabRendererArray)  }
      </Animated.View>
    );
  }
}

ScrollableTabs.defaultProps = {
	activeTab: 0,
  swipeThreshold: initWidth / 7,
  onTabChange: undefined,
};
