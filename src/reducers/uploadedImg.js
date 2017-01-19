import {Actions} from 'react-native-router-flux'
const ImagePicker = require('react-native-image-picker');

let initialState = {
	img: null
	tags: null
}

const reducer = (state=null, action) => {
	switch(action.type) {
		case SET_IMAGE:
			return action.img
			break;
		case CLEAR_IMAGE:
			return action.img
			break;
	}
	return state;
}


// --------- Constants ---------

const SET_IMAGE = 'SET_IMAGE'

const CLEAR_IMAGE = 'CLEAR_IMAGE'

// --------- Action Creators ---------

export const setImage = (img) => ({
	type: SET_IMAGE,
	img
})

export const clearImage = () => ({
	type: CLEAR_IMAGE,
	img: null
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
	    	let source;

	    	//androids would be handled differently 
		    source = { uri: response.uri.replace('file://', '') };

		    dispatch(setImage(source))

				app.models.predict(Clarifai.GENERAL_MODEL, {base64:response.data})
				.then((res) => {
				  console.log('Clarifai response = ', res);
				  let tags = '';
				  for (let i = 0; i<res.data.outputs[0].data.concepts.length; i++) {
				    tags += res.data.outputs[0].data.concepts[i].name + ' ';
				  }
				  this.setState({tagText:tags});
				},
				(error)=>{
				  console.log(error);  
				});
		  };
		});
	}
	Actions.ImageUploaded()
}


export default reducer;



