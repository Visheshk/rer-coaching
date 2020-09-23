import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';

import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
import { READY } from '../assets/loginvid.mp4';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

export function VideoWatch({navigation, route}) {
	// render() {
  const [userInfo, setUserInfo] = React.useState();
  const [pageTitle, setTitle] = React.useState("");
  const [thisPage, setPage] = React.useState();
  const [thisVid, setThisVid] = React.useState();
  const [vidUri, setVidUri] = React.useState("https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/ReadyToRead.mp4?raw=true");
  const [before, setBefore] = React.useState();
  const [after, setAfter] = React.useState();
  const [befState, setBefState] = React.useState(false);
  const [aftState, setAftState] = React.useState(false);
  // console.log(route.params.video);
  // const 
  // setPage(route.params.page);

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
  // const thisVid = videoLinks[paramVid];
  // console.log(thisVid);

  // const videoOrder = {
  //   "Picture": {"before": false, "next": "Connections"},
  //   "Connections": {"before": "Picture", "next": "Reading Fun"},
  //   "Reading Fun": {"before": "Connections", "next": "READY"},
  //   "READY": {"before": "Reading Fun", "next": "READY"},
  //   "Word": {"before": "READY", "next": false} 
  // };

  // const videoOrder = {
  //   "READY": {"before": false, "next": "Connections"},
  //   "Connections": {"before": "READY", "next": "Word"},
  //   "Word": {"before": "Connections", "next": "Picture"},
  //   "Picture": {"before": "Word", "next": false},
  // };

  const pageTitles = {
    "READY": "R.E.A.D.Y. to Read",
    "Connections": "Making Life Connections",
    "Word": "What's That Word?",
    "Picture": "Check Out the Pictures",
  };

  const pageList = Object.keys(pageTitles);

  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) { console.log(error); }

  };
  storeData();

  function changeVideo(dir) {
    let newPage = thisPage + dir;
    if (newPage > 3) {  newPage = 3;   }
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
    console.log(thisVid);
    setTitle(pageTitles[thisVid]);
    console.log(pageTitles[thisVid]);
    // document.title = title;
    navigation.setOptions({ "title": pageTitle});
    setVidUri(videoLinks[thisVid]);
    console.log(vidUri);
    setBefState(true);
    setAftState(true);
    if (thisPage == 0) {
      setBefState(false);
    }
    // console.log(vidUri);
    if (thisPage == 3) {
      console.log("last page");
      setAftState(false);
    }
  });

	return (
		<View style={{flex: 1, flexDirection: "column"}}>
      <View>
        <Video
          source={{ uri: vidUri }}
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
          <Button title="Next"
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
