import {TouchableHighlight, View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setImage, setUploadedImg} from '../reducers/uploadedImg';


class CreateSearch extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
		  <View style={styles.container}>
		  	{ !this.props.uploadedImg  ?

				<TouchableHighlight onPress={this.props.actions.setUploadedImg.bind(this)}>
					<Text> + </Text>
				</TouchableHighlight> 
				:
				<Image 
					source={this.props.uploadedImg}
					style={styles.image}
				 />
				}
		  </View>
		);
  }

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height:200 
  }
};

function mapStateToProps(state){
	return {
		uploadedImg: state.uploadedImg
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators({setUploadedImg, setImage}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSearch)