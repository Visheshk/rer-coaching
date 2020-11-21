import React from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';

import 'react-native-gesture-handler';
import { useKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
// import { READY } from '../assets/loginvid.mp4';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';
import { sources, titles } from './videoInfo';
import { VideoControl } from './VideoControl';


export function VideoWatch({navigation, route}) {
	// render() {
  const [userInfo, setUserInfo] = React.useState();
  const [pageTitle, setTitle] = React.useState("");
  const [thisPage, setPage] = React.useState();
  const [thisVid, setThisVid] = React.useState();
  const [vidUri, setVidUri] = React.useState();
  const [befState, setBefState] = React.useState(false);
  const [aftState, setAftState] = React.useState(false);

  const videoLinks = {
    // "Picture": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/CheckOutThePictures.mp4?raw=true",
    // "Connections": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/MakingLifeConnections.mp4?raw=true",
    // "Reading Fun": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/MakingReadingFun.mp4?raw=true",
    // "READY": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/ReadyToRead.mp4?raw=true",
    // "Word": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/WhatsThatWord.mp4?raw=true"
    "Past": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Recall%20The%20Past%20Final%20V2.mp4?raw=true",
    "Ideas": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Explain%20New%20Words%20Or%20Ideas%20Final%20V2.mp4?raw=true",
    "Questions": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Ask%20Questions%20Final%20V2.mp4?raw=true",
    "Future": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Discuss%20The%20Future%20Final%20V2.mp4?raw=true", 
    "Difference": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/You%20Can%20Make%20A%20Difference%20Final%20V2.mp4?raw=true",    
  };
 
  const pageTitles = {
    "Past": "Recall the Past",
    "Ideas": "Explain New Words or Ideas",
    "Questions": "Ask Questions",
    "Future": "Discuss the Future",
    "Difference": "You Can Make a Difference",
  };

  const pageList = Object.keys(pageTitles);

  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) { console.log(error); }

  };
  storeData();
  useKeepAwake();

  function changeVideo(dir) {
    let newPage = thisPage + dir;
    if (newPage > 4) {  newPage = 4;   }
    else if (newPage < 0) {  newPage = 0;  }
    setPage(newPage);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {textAlign: 'center'}
    });
  });

  React.useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss();      
    }, 1000);
    // Update the document title using the browser API
    // setThisVid()
    // setPage(route.params.page);
    // console.log(thisPage);
    if (thisPage == null || thisPage == undefined) {
      setPage(route.params.page);
    }

    (async() => {
      try {
        let vidItem = "video" + thisPage + "seen";
        console.log(vidItem);
        await AsyncStorage.setItem(vidItem, 'true') 
      } catch (error) {console.log(error);}
    })();
    
    setThisVid(pageList[thisPage]);
    setTitle(pageTitles[thisVid]);
    navigation.setOptions({ "title": pageTitle});
    setVidUri(videoLinks[thisVid]);

    console.log(thisVid);
    console.log(pageTitles[thisVid]);
    console.log(vidUri);
    setBefState(true);
    setAftState(true);
    if (thisPage == 0) {
      setBefState(false);
    }
    // console.log(vidUri);
    if (thisPage == 4) {
      console.log("last page");
      setAftState(false);
    }

  });

	return (
		<View style={{flex: 1, flexDirection: "column"}}>
      <VideoControl uri={vidUri} height={400}/>

      <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>          
        <View style={{ flex: 1, alignItems: "flex-start", margin: 20}}>
          <Button 
            onPress={() => changeVideo(-1)}
            title="Previous"
            disabled={!befState}
          >
          </Button>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end", margin: 20}}>
          <Button title={!aftState? "Last Page": "Next"}
            onPress={() => changeVideo(1)}
            disabled={!aftState}
          >
          </Button>
        </View>
      </View>


		</View>

	);
	// }
}
