import {TouchableHighlight, View, Text, Image} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
const ImagePicker = require('react-native-image-picker');


class ImageUploaded extends React.Component {
	render() {
		const tags = this.props.uploadedImg.tags.join(', ')
		return (
			<View style={styles.container}>
				<Image 
					source={this.props.uploadedImg.img}
					style={styles.image}
				 />
				<Text></Text>
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
		uploadedImg: state.uploadedImg,
		searchResults: state.searchResults
	}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploaded)