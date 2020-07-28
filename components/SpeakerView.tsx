import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export function SpeakerView ( {route, navigation} ) {	// const speakerurl = route.params["speakerurl"];
	const speakerurl = route.params["speakerurl"];
	
	// React.useEffect(() => {
	// 	navigation.setParams({
	// 		headerShown: false
	// 	})
	// });
  
  return (
    <WebView
      source={{
        uri: speakerurl 
      }}
    />
  );
}

SpeakerView.navigationOptions = {
  headerShown: false
}
