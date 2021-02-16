import React from 'react';
import { Dimensions, View, StyleSheet, TextInput, Alert, TouchableOpacity, TouchableHighlight, Keyboard, Image } from 'react-native';
import * as Linking from 'expo-linking';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Audio, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { VideoControl } from './VideoControl';
// import { useKeepAwake } from 'expo-keep-awake';

import { updateSeenScreens } from '../extras/methods.tsx';
import Letsread from '../assets/images/letsread2.png'; 
import Videos from '../assets/images/videos2.png'; 
import bunnyReading from '../assets/images/bunny-reading.png';
import { readyVideoTitles } from './videoInfo';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Right, Body } from 'native-base';

export function VideoList({navigation, route}) {
	// render() {
  // const classes = useStyles();
  const { speakerURL } = route.params;
  // const nparams = navigation.params;
  const [userInfo, setUserInfo] = React.useState();
  const [vid0Seen, setVid0Seen] = React.useState(false);
  const [vid1Seen, setVid1Seen] = React.useState(false);
  const [vid2Seen, setVid2Seen] = React.useState(false);
  const [vid3Seen, setVid3Seen] = React.useState(false);
  const [vid4Seen, setVid4Seen] = React.useState(false);
  const [vid5Seen, setVid5Seen] = React.useState(false);
  const [seenList, setSeenList] = React.useState([false, false, false, false, false]);

  // const [vidStatus, setVidStatus] = React.useState()


  // const [vidSeen, setVidSeen] = React.useState([vid0Seen, vid1Seen]);
  
  const [readCount, setReadCount] = React.useState(0);
  const [readAll, setReadAll] = React.useState(false);
  const [seenScreens, setSeenScreens] = React.useState();
  const SEEN_OPACITY = 0.6;

  let rc = 0;

  //downloaded URLS
  //

  var storeData = async (vals) => {
    let vs = null;
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
      // setSeenScreens(await AsyncStorage.setItem('seenScreens'));
    } catch (error) {
      console.log(error);
    }

    // in asyncstorage - store [v0seen, ... ,v5 seen]
    // if not found, write them all as false and do asynctorage.set

    // file list (from asyncstorage)
    // new file list (from url)
    // files downloaded: 
    // files not downloaded: 


    // in asyncstorage retrieve files info from url
    // and retrieve downloaded files list
    // retrieve video files info from url
    // see difference between remote files info and asyncstorage
    // write new file to AsyncStorage, and keep a dictionary of changes not synced; 
      // write not downloaded files to dictionary as well

    // render button component
      //  uses seen information, goes to page with a "title", "video file link", "downloaded status"
      //  if downloaded video is true, go to next video, otherwise 

  };
  storeData();
  // useKeepAwake();

  // setVidStatus(await AsyncStorage.getItem("videoStatus"));
  // console.log(vidStatus);

  React.useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss();      
    }, 1000);
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setSeenStates();
      
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  function updateReadCount (v0, v1, v2, v3, v4) {
    // console.log("thrd");
    // console.log(v0 + v1 + v2 + v3);
    rc = ((v0=="true")? 1: 0) + ((v1=="true")? 1: 0) + ((v2=="true")? 1: 0) + ((v3=="true")? 1: 0) + ((v4=="true")? 1: 0);
    // console.log("Rc is " + rc);
    setSeenList([JSON.parse(v0), JSON.parse(v1), JSON.parse(v2), JSON.parse(v3), JSON.parse(v4)]);
    // console.log(seenList);
    setReadCount(rc);
    if (rc > 4) {
      setReadAll(true);
      try { updateSeenScreens("seenVideoList", true);} catch (e) {console.error(e);}
    }
    else {
      setReadAll(false);
      try { updateSeenScreens("seenVideoList", false);} catch (e) {console.error(e);}
    }
    // console.log("update read count " + readCount);
  }

  async function setSeenStates () {
    // let v5 = await AsyncStorage.getItem('video5seen');      await setVid5Seen("true" == String(v5));
    let v0 = await AsyncStorage.getItem('video0seen');      await setVid0Seen("true" == String(v0));
    let v1 = await AsyncStorage.getItem('video1seen');      await setVid1Seen("true" == String(v1));
    let v2 = await AsyncStorage.getItem('video2seen');      await setVid2Seen("true" == String(v2));
    let v3 = await AsyncStorage.getItem('video3seen');      await setVid3Seen("true" == String(v3));
    let v4 = await AsyncStorage.getItem('video4seen');      await setVid4Seen("true" == String(v4));
    // console.log(v0 == "true");
    // console.log(v0 + " " + v1 + " " + v2 + " " + v3);
    // console.log(vid0Seen + " " + vid1Seen + " " + vid2Seen + " " + vid3Seen);
    // await setReadCount((vid0Seen? 1: 0) + (vid1Seen? 1: 0) + (vid2Seen? 1: 0) + (vid3Seen? 1: 0));
    updateReadCount(v0, v1, v2, v3, v4);
    // console.log(seenList);
    
    // console.log("seen states " + readCount);

  }

  function seenIcon(seenState) {
    if (seenState == true) {
      return "checkmark-circle";
    }
    else {
      return "checkmark-circle-outline";
    }
  }

  async function changeReadState(index) {
    // console.log(vidName);
    // console.log(vidName + seenState);
    let vidName = "video" + index.toString() + "seen";
    let seenState = JSON.parse(seenList[index]);
    // console.log(vidName + " " + seenState + !seenState);
    await AsyncStorage.setItem(vidName, String(!seenState));
    setSeenStates();
  }

  async function changeReadState2(vidName, seenState) {
    // console.log(vidName);
    // console.log(vidName + seenState);
    await AsyncStorage.setItem(vidName, String(!seenState));
    setSeenStates();
  }

  function letsReadButton() { 
    // console.log("pressing this butting");
    if (readCount > 4) {
      // navigation.navigate("BookList");
      if (speakerURL == undefined) {
        navigation.navigate("Welcome");
        // console.log(speakerURL);
      }
      else {
        Linking.openURL(speakerURL);
      }
    }
    else {Alert.alert("Unlocks after viewing R.E.A.D.Y. videos","See all videos to Read Aloud with Floppy", 
       [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true } ); }
  }

  const otherVideoUrls = [
    {"key": "l111", "title": "", "url": ""},
    {"key": "l11", "title": "Introduction to R.E.A.D.Y", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/welcome.mp4?raw=true"},
    // {"key": "l1.5", "title": "Introduction to Coaching Experience", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Intro%20Final%20V2.mp4?raw=true"},
    // {"key": "l12", "title": "Coaching Experience Tutorial", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true"},
    // {"key": "l13", "title": "Read Aloud With Floppy Tutorial", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true"},
  ]

  function goToVideo(title, url) {
    navigation.navigate("VideoPage", {"title": title, "url": url});
  }


	return (

		<Container>
      <Content>
              
        <Card style={{flex: 0}}>
          { readyVideoTitles.map ((rvt, index) => {
            return(
              <TouchableOpacity key={rvt.key} onPress={() => navigation.navigate('VideoWatch', {"page": rvt["key"], "video": rvt["pageTitle"], "name": rvt["title"]})}>
                <CardItem bordered style = {{opacity: seenList[index] ? SEEN_OPACITY: 1.0}}>
                <Thumbnail source={rvt.thumbnail} square style={styles.vidThumb}/>
                <Text>{rvt.title}</Text>
                <Left />
                <Right style={{alignSelf: "flex-end"}}>
                  <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
                    <Text style={styles.timestamp}>{rvt.length}</Text>
                    <TouchableOpacity onPress={() => {changeReadState(index);}}>
                      <Icon name={seenIcon(seenList[index])} style={{color: "blue", paddingRight: 20}}/>
                    </TouchableOpacity>

                    <Icon name="arrow-forward" />
                  </View>
                </Right>
               </CardItem>
               </TouchableOpacity>
               )
            } ) 
          }
          {
            otherVideoUrls.map( (vurl) => {
              if (vurl["title"] == "") {
                return(
                  <CardItem bordered key={vurl.key}>
                  <Text> </Text>
                  <Left />
                  
                  </CardItem>
                )
              }
              return(
                <TouchableOpacity key={vurl.key} onPress={() => goToVideo(vurl.title, vurl.url)}>
                  <CardItem bordered>
                    <Text>{vurl.title}</Text>
                    <Left />
                    <Right style={{alignSelf: "flex-end"}}>
                      <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
                        <Icon name="arrow-forward" />
                      </View>
                    </Right>
                  </CardItem>
                </TouchableOpacity>
            )
            })
          }         

          <TouchableOpacity onPress={() => navigation.navigate("HelpfulTips")}>
            <CardItem bordered>
            <Text>Tips for Getting Started</Text>
            <Left />
            <Right style={{alignSelf: "flex-end"}}>
              <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
                <Icon name="arrow-forward" />
              </View>
            </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>


      </Content>
		</Container>
	);
}
