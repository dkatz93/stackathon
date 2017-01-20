import {Actions} from 'react-native-router-flux'
const ImagePicker = require('react-native-image-picker');
import Clarifai from 'clarifai';

var app = new Clarifai.App(
  'eOaCCchkbWuyEvwwn4QR2lKizf0ipsMM7a5UnLv2',
  'ma9jFjdtKtjtgYHSbyvK5_J40xy8ZiNnCcfgSLIN'
);

import {getImageResults, makeGoogleSearch} from './searchResults'


let initialState = {
	img: null,
	tags: null,
	topTags: []
}

const reducer = (state=initialState, action) => {
	const newState = Object.assign({}, state)
	switch(action.type) {
		case SET_IMAGE:
			newState.img = action.img
			break;
		case CLEAR_IMAGE:
			newState.img = action.img
			newState.tags = action.tags
			break;
		case SET_TAGS:
			newState.tags = action.tags
			break;
		case SET_TOP_TAGS:
			newState.topTags = action.topTags
			break;
		default: 
			return state;
	}
	return newState;
}


// --------- Constants ---------

const SET_IMAGE = 'SET_IMAGE'
const CLEAR_IMAGE = 'CLEAR_IMAGE'
const SET_TAGS = 'SET_TAGS'
const SET_TOP_TAGS = 'SET_TOP_TAGS'

// --------- Action Creators ---------

export const setImage = (img) => ({
	type: SET_IMAGE,
	img
})

export const clearImage = () => ({
	type: CLEAR_IMAGE,
	img: null,
	tags: ''
})

export const setTags = (tags) => ({
	type: SET_TAGS,
	tags: tags
})


export const setTopTags = (topTags) => ({
	type: SET_TOP_TAGS,
	topTags: topTags
})


var options = {
  title: 'Select an Image',
  storageOptions: {
    skipBackup: true,
  },
  maxWidth: 480
};	


export const setUploadedImg = () => {
	return (dispatch) => {
		ImagePicker.showImagePicker(options, (response) => {
	    if (response.didCancel) {
	      console.log('User cancelled image picker');
	    }
	    else if (response.error) {
	      console.log('ImagePicker Error: ', response.error);
	    }
	    else {
	    	//androids would be handled differently
	    	let source = { uri: response.uri.replace('file://', '') };
	      dispatch(setImage(source))
	      app.models.predict(Clarifai.GENERAL_MODEL, {base64:response.data})
	      .then((res) => {
				  let tags = {};
				  let tagData = res.outputs[0].data
				  for (let i = 0; i<tagData.concepts.length; i++) {
				  	tags[tagData.concepts[i].value] = tagData.concepts[i].name
				  }
				  dispatch(setTags(tags))
				  dispatch(getTopThreeTags(tags))
				},
				(error)=>{
				  console.log(error);  
				});
	    }
	  });
	}
}

export const getTopThreeTags = (tags) => {
	return (dispatch) => {
		let orderedTags = Object.keys(tags).sort();
		let topTagArray = [];
		let len = orderedTags.length
		topTagArray.push(tags[orderedTags[len-1]], tags[orderedTags[len-2]], tags[orderedTags[len-3]], tags[orderedTags[len-4]])
		if (topTagArray.indexOf('no person') > -1) {
			topTagArray.splice(topTagArray.indexOf('no person'), 1)
		}
		console.log('TOP TAGS', topTagArray)
		dispatch(setTopTags(topTagArray))
		dispatch(makeGoogleSearch(topTagArray))
	}
}

export default reducer;



