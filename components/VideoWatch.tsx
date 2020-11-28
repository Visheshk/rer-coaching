import React from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
// import { READY } from '../assets/loginvid.mp4';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';
import { readyVideoTitles } from './videoInfo';
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


  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) { console.log(error); }

  };
  storeData();

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

    if (Number.isInteger(thisPage)) {
      rvt = readyVideoTitles[thisPage];
      console.log(rvt);
      console.log(thisPage);
      setThisVid(rvt["pageTitle"]);
      setTitle(rvt["title"]);
      navigation.setOptions({ "title": pageTitle});
      setVidUri(rvt["url"]);

      console.log(thisVid);
      // console.log(pageTitles[thisVid]);
      console.log(vidUri);
      setBefState(true);
      setAftState(true);
      if (thisPage == 0) {
        setBefState(false);
      }
      // console.log(vidUri);
      if (thisPage == 5) {
        console.log("last page");
        setAftState(false);
      }
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
