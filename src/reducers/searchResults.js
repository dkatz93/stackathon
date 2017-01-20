import axios from 'axios'


let initialState = {
	results: [],
	search: ''
}

const reducer = (state=initialState, action) => {
	const newState = Object.assign({}, state)
	switch(action.type) {
		case GET_RESULTS:
			newState.results = action.results;
			break;
		case SET_GOOGLE_SEARCH:
			newState.search = action.search
			break;
		default: 
			return state;
	}
	return newState;
}

// --------- Constants ---------

const GET_RESULTS = 'GET_RESULTS'
const SET_GOOGLE_SEARCH = 'SET_GOOGLE_SEARCH'

// --------- Action Creators ---------

export const getResults = (results) => ({
	type: GET_RESULTS,
	results
})

export const setGoogleSearch = (search) => ({
	type: SET_GOOGLE_SEARCH,
	search: search
})


var googleSearch = "https://www.google.com/search?q=nature,+flora,+landscape&espv=2&biw=1360&bih=662&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjZ747FwtHRAhVs5oMKHcCCDOcQ_AUIBigB"

export function makeGoogleSearch(arr){
	return(dispatch) => {
		let newSearch = googleSearch.replace(/nature/i, arr[0])
		let newSearch2 = newSearch.replace(/flora/i, arr[1])
		let newSearch3 = newSearch2.replace(/landscape/i, arr[2])
		dispatch(setGoogleSearch(newSearch3))
	}
}

// export const searchResults = (search) => {
// 	return(dispatch) => {
// 		axios.get(search)
// 		.then(res => console.log('response', res))
// 		.catch(err => console.log(err))
// 	}
// }



export default reducer;