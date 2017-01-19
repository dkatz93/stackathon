import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import CreateSearch from './components/CreateSearch'
import ImageUploaded from './components/ImageUploaded'


const RouterComponent = () => {
  return (
  	<Router sceneStyle={{ paddingTop: 65 }}> 
  		<Scene key="CreateSearch" component={CreateSearch} title="PIQS"/>
  		<Scene key="ImageUploaded" component={ImageUploaded} title="PIQS"/>
  	</Router>
  );
}

export default RouterComponent;