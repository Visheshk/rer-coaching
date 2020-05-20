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
    // const videoLinks = {
    //   "READY": "https://www.dropbox.com/s/48myczlan6btufk/loginvid.mp4?dl=0",
    //   "Reading Fun": "https://www.dropbox.com/s/qtnn10iru7v89xt/welcomevid.mp4?dl=0"
    // };
    const videoLinks = {
      "READY": "../assets/loginvid.mp4",
      "Reading Fun": "../assets/welcomevid.mp4"
    };
    const thisVid = videoLinks[paramVid];
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
        source={READY}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls={true}
        shouldPlay={false}
        isLooping
        style={{ maxHeight: 300 }}
      />
				
			</View>
		);
	// }
}
