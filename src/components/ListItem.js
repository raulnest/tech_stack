import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  NativeModules
 } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    // const {library, selectedLibraryId} = this.props;
    // if(library.item.id === selectedLibraryId) {
    //   return(
    //     <Text>
    //       {library.item.description};
    //     </Text>
    //   );
    // }

    const { library, expanded } = this.props;
    if(expanded) {
      return(
        <CardSection>
          <Text style={{flex:1}}>
            {library.item.description};
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const {titleStyle} = styles;
    const { id, title } = this.props.library.item;



    return(
      <TouchableWithoutFeedback
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>{title.toString()} </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize:18,
    paddingLeft:15
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  //return {selectedLibraryId: state.selectedLibraryId};
  //return {expanded : expanded};
  return { expanded };
};

export default connect(mapStateToProps, actions) (ListItem);
