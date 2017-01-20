import {TouchableHighlight, TouchableOpacity, View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux'
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setImage, setUploadedImg, clearImage} from '../reducers/uploadedImg';


class CreateSearch extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tags: null,
			img: null
		}
	}

	switchPage(){
		Actions.ImageUploaded()
	}

	render() {
		console.log(this.props)
		return (
			<View style={styles.container}>
		  	{ !this.props.uploadedImg.img  ?

				<View style={styles.container}>
					<TouchableOpacity style={styles.plusButton} onPress={this.props.actions.setUploadedImg.bind(this)}>
						<Image source={{ uri: 'https://cms-assets.tutsplus.com/uploads/users/523/posts/27345/preview_image/search-icon-large.png'}} style={styles.searchIcon} />
					</TouchableOpacity> 
				</View>
				
				:

				<View style={styles.container}>
					<TouchableHighlight onPress={this.props.actions.clearImage.bind(this)} style={styles.buttonStyle}>
						<Text style={styles.textStyle}>Choose a new PiQ</Text>
					</TouchableHighlight>

					<Image source={this.props.uploadedImg.img}
						style={styles.image} />

					<TouchableHighlight  style={styles.buttonStyle}>
						<Text style={styles.textStyle} onPress={this.switchPage.bind(this)}>Search PiQs</Text>
					</TouchableHighlight>
				</View>

				}
		  </View>
		);
  }

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 200,
    height:200 
  },
  searchIcon: {
  	width: 150,
    height:150 
  },
  buttonStyle: {
  	alignSelf: 'stretch',
  	backgroundColor: '#fff',
  	borderRadius: 5,
  	borderWidth: 1,
  	borderColor: '#007aff',
  	marginTop: 10,
  	marginBottom: 10
  },
  textStyle: {
  	alignSelf: 'center',
  	color: '#007aff',
  	fontSize: 16,
  	fontWeight: '600',
  	paddingTop: 5,
  	paddingBottom: 5
  }
};

function mapStateToProps(state){
	return {
		uploadedImg: state.uploadedImg,
		searchResults: state.searchResults
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators({setUploadedImg, setImage, clearImage}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSearch)