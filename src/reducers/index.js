import { combineReducers } from 'redux';
import uploadedImg from './uploadedImg';
import searchResults from './searchResults';

export default combineReducers({
	uploadedImg: uploadedImg,
	searchResults: searchResults
})