import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';

import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
import { READY } from '../assets/loginvid.mp4';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

export function VideoWatch({navigation, route}) {
	// render() {
    const [userInfo, setUserInfo] = React.useState();
    console.log(route.params.video);
    const paramVid = route.params.video;
    // navigation.setParams({ "title": paramVid });

    // const videoLinks = {
    //   "READY": "https://www.dropbox.com/s/48myczlan6btufk/loginvid.mp4?dl=0",
    //   "Reading Fun": "https://www.dropbox.com/s/qtnn10iru7v89xt/welcomevid.mp4?dl=0"
    // };
    const videoLinks = {
      "Picture": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/CheckOutThePictures.mp4?raw=true",
      "Connections": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/MakingLifeConnections.mp4?raw=true",
      "Reading Fun": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/MakingReadingFun.mp4?raw=true",
      "READY": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/ReadyToRead.mp4?raw=true",
      "Word": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/WhatsThatWord.mp4?raw=true"

    };
    const thisVid = videoLinks[paramVid];
    console.log(thisVid);
    // const imageURI = Asset.fromModule(READY).uri;

    var storeData = async (vals) => {
      try {
        setUserInfo(await AsyncStorage.getItem('userInfo'));
      } catch (error) { console.log(error); }
    };
    storeData();
		return (
			<View>
        <Video
        source={{uri: thisVid }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls={true}
        shouldPlay={false}
        isLooping
        style={{ height: 300 }}
      />
				
			</View>
		);
	// }
}
