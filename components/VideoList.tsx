import React from 'react';
import { Dimensions, View, StyleSheet, TextInput, Alert, TouchableOpacity, TouchableHighlight, Keyboard, Image } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Audio, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { useKeepAwake } from 'expo-keep-awake';

import { updateSeenScreens } from '../extras/methods.tsx';
import Letsread from '../assets/images/letsread2.png'; 
import Videos from '../assets/images/videos2.png'; 
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Right, Body } from 'native-base';

export function VideoList({navigation, route}) {
	// render() {
  // const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState();
  const [vid0Seen, setVid0Seen] = React.useState(false);
  const [vid1Seen, setVid1Seen] = React.useState(false);
  const [vid2Seen, setVid2Seen] = React.useState(false);
  const [vid3Seen, setVid3Seen] = React.useState(false);
  const [vid4Seen, setVid4Seen] = React.useState(false);

  // const [vidStatus, setVidStatus] = React.useState()


  // const [vidSeen, setVidSeen] = React.useState([vid0Seen, vid1Seen]);
  
  const [readCount, setReadCount] = React.useState(0);
  const [readAll, setReadAll] = React.useState(false);
  const [seenScreens, setSeenScreens] = React.useState();
  const SEEN_OPACITY = 0.6;

  let rc = 0;
  let videoUrls = {
    "past": {
      "title": "R - Recall the Past", 
      "videoUrl": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/DRAFT_Recall%20The%20Past_9-26-20.mp4", 
      "thumbnail": "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/videos/R%20-%20Recall%20the%20Past%20Thumbnail.png", 
      "index": 0
    }, 
    "ideas": {
      "title": "E - Explain New Words and Ideas", 
      "videoUrl": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/DRAFT_Explain%20New%20Words%20Or%20Ideas_9-28-20.mp4?raw=true", 
      "thumbnail": "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/videos/E%20-%20Explain%20New%20Words_Ideas%20Thumbnail.png", 
      "index": 1
    }
  };
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
    try {
      vs = await AsyncStorage.getItem('videoStatus');
      if (vs == null) {
        vs = videoUrls;
        for (let vu in videoUrls) {
          // console.log("video url " + vu);
          // videoUrls[vu] = 
          vs[vu] = videoUrls[vu];
          vs[vu]["downloaded"] = false;
        }
        // AsyncStorage.setItem("videoStatus", JSON.stringify(vidStatus));
      }
      else {
        console.log(vs);
        // AsyncStorage.setItem("videoStatus", JSON.parse(vidStatus));
      }
      
    }
    catch (error) {
      console.error(error);
    }

    return vs;

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
  useKeepAwake();

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
    console.log("Rc is " + rc);
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

  async function changeReadState(vidName, seenState) {
    // console.log(vidName);
    // console.log(vidName + seenState);
    await AsyncStorage.setItem(vidName, String(!seenState));
    setSeenStates();
  }

  function letsReadButton() { 
    console.log("pressing this butting");
    if (readCount > 4) {navigation.navigate("BookList");}
    else {Alert.alert("Unlocks after videos","See all videos to unlock access to recording experience", 
       [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true } ); }
  }

	return (

		<Container>
      <Content>
        <VideoPlayer
          showControlsOnLoad={true}
          height={400}
          videoProps={{
            source : { uri: 'https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching%20tut.mp4?raw=true', overrideFileExtensionAndroid: 'mp4' },
            resizeMode : Video.RESIZE_MODE_CONTAIN,
            shouldPlay: false,
          }}
        />
      
        <Card style={{flex: 0}}>
         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 0, video: 'Past', "name": "Recall the Past"})}>
          <CardItem bordered style = {{opacity: vid0Seen ? SEEN_OPACITY: 1.0}}>
          <Thumbnail source={require("../assets/images/video-posters/Rthumb.png")} square style={styles.vidThumb}/>
          <Text>Recall the Past</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Text style={styles.timestamp}>1:30</Text>
              <TouchableOpacity onPress={() => {changeReadState("video0seen", vid0Seen);}}>
                <Icon name={seenIcon(vid0Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 1, video: 'Ideas', "name": "Explain New Words or Ideas"})}>
          <CardItem bordered style = {{opacity: vid1Seen ? SEEN_OPACITY: 1.0}}>
          
          <Thumbnail source={require("../assets/images/video-posters/Ethumb.png")} square style={styles.vidThumb}/>
          <Text>Explain New Words or Ideas</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Text style={styles.timestamp}>1:17</Text>
              <TouchableOpacity onPress={() => {changeReadState("video1seen", vid1Seen);}}>
                <Icon name={seenIcon(vid1Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 2, video: 'Questions', "name": "Ask Questions"})}>
        <CardItem bordered style = {{opacity: vid2Seen ? SEEN_OPACITY: 1.0}}>
          <Thumbnail source={require("../assets/images/video-posters/Athumb.png")} square style={styles.vidThumb}/>
          <Text>Ask Questions</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Text style={styles.timestamp}>0:59</Text>
              <TouchableOpacity onPress={() => {changeReadState("video2seen", vid2Seen);}}>
                <Icon name={seenIcon(vid2Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
        </CardItem>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 3, video: 'Future', "name": "Discuss the Future"})}>
        <CardItem bordered style = {{opacity: vid3Seen ? SEEN_OPACITY: 1.0}}>
          
          <Thumbnail source={require("../assets/images/video-posters/Dthumb.png")} square style={styles.vidThumb}/>
          <Text>Discuss the Future</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Text style={styles.timestamp}>1:17</Text>
              <TouchableOpacity onPress={() => {changeReadState("video3seen", vid3Seen);}}>
                <Icon name={seenIcon(vid3Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
        </CardItem>
        </TouchableOpacity>    

        <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 4, video: 'Difference', "name": "You Can Make a Difference"})}>
        <CardItem bordered style = {{opacity: vid4Seen ? SEEN_OPACITY: 1.0}}>
          
          <Thumbnail source={require("../assets/images/video-posters/Ythumb.png")} square style={styles.vidThumb}/>
          <Text>You Can Make a Difference</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Text style={styles.timestamp}>1:27</Text>
              <TouchableOpacity onPress={() => {changeReadState("video4seen", vid4Seen);}}>
                <Icon name={seenIcon(vid4Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

         
        </Card>

      
      
        <View style={{padding: 30, opacity: 1.0, justifyContent: 'space-around'}}>
        
          <Text style={{backgroundColor: "#eee", padding: 15, borderRadius: 10}}>
            When you're done watching the videos, you'll be able to click 'Let's Read' to practice your literacy-building strategies!
          </Text>
         
          <TouchableOpacity 
            // disabled={readAll? false: true} 
            style={{flex:0.7, opacity:1, elevation: -1}} 
            key="letsread" 
            onPress={() => letsReadButton()}> 
            <Card style={{opacity: readAll? 1.0: SEEN_OPACITY}}>
              <CardItem>
                <Left>
                  <Thumbnail source={Letsread} square style={{resizeMode: "contain"}}/>
                  <Body>
                    <Text>Let's Read</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>

        </View>
      </Content>
		</Container>
	);
}
