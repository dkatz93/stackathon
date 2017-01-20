import {Actions} from 'react-native-router-flux'
const ImagePicker = require('react-native-image-picker');
import Clarifai from 'clarifai';

var app = new Clarifai.App(
  'eOaCCchkbWuyEvwwn4QR2lKizf0ipsMM7a5UnLv2',
  'ma9jFjdtKtjtgYHSbyvK5_J40xy8ZiNnCcfgSLIN'
);

let initialState = {
	img: null,
	tags: null
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
		default: 
			return state;
	}
	return newState;
}


// --------- Constants ---------

const SET_IMAGE = 'SET_IMAGE'
const CLEAR_IMAGE = 'CLEAR_IMAGE'
const SET_TAGS = 'SET_TAGS'

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
	    console.log('Response = ', response);
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
	      	console.log('resdata', res)
				  let tags = [];
				  for (let i = 0; i<res.outputs[0].data.concepts.length; i++) {
				    tags.push(res.outputs[0].data.concepts[i].name);
				  }
				  dispatch(setTags(tags))
				},
				(error)=>{
				  console.log(error);  
				});
	    }
	  });
	}
}

export default reducer;



