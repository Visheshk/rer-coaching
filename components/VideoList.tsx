import React from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity, TouchableHighlight, Keyboard, Image } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

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

  const [vidStatus, setVidStatus] = React.useState()


  const [vidSeen, setVidSeen] = React.useState([vid0Seen, vid1Seen, ]);
  
  const [readCount, setReadCount] = React.useState(0);
  const SEEN_OPACITY = 0.6;

  let rc = 0;
  let videoUrls = [
    {
      "name": "R - Recall the Past", 
      "videoUrl": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/DRAFT_Recall%20The%20Past_9-26-20.mp4", 
      "thumbnail": "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/videos/R%20-%20Recall%20the%20Past%20Thumbnail.png", 
      "index": 0
    }, 
    {
      "name": "E - Explain New Words and Ideas", 
      "videoUrl": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/DRAFT_Explain%20New%20Words%20Or%20Ideas_9-28-20.mp4?raw=true", 
      "thumbnail": "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/videos/E%20-%20Explain%20New%20Words_Ideas%20Thumbnail.png", 
      "index": 1
    }
  ];
  //downloaded URLS
  //

  var storeData = async (vals) => {
    
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
    }

    // in asyncstorage - store [v0seen, ... ,v5 seen]
    // if not found, write them all as false and do asynctorage.set
    try {
      let vidStatus = await AsyncStorage.getItem('videoStatus');
      if (vidStatus == null) {
        vidStatus = videoUrls;
        for (vu in videoUrls) {
          // videoUrls[vu] = 
        }
      }
      setVidStatus(JSON.parse(vidStatus));
    }
    catch (error) {

    }

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
    console.log(readCount);
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
    
    console.log(readCount);

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

    // await setReadCount(setRead)

    setSeenStates();

  }

 

  // React.useEffect(() => {
    
  // });

	return (

		<Container>
      <Content>
        <Card style={{flex: 0}}>
        <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 0, video: 'Difference', "name": "You Can Make a Difference"})}>
        <CardItem bordered style = {{opacity: vid0Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>You Can Make a Difference</Text>
          </Left>
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {changeReadState("video0seen", vid0Seen);}}>
                <Icon name={seenIcon(vid0Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 1, video: 'Questions', "name": "Ask Questions"})}>
          <CardItem bordered style = {{opacity: vid1Seen ? SEEN_OPACITY: 1.0}}>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Ask Questions</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {changeReadState("video1seen", vid1Seen);}}>
                <Icon name={seenIcon(vid1Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>
    
         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 2, video: 'Ideas', "name": "Explain New Words or Ideas"})}>
          <CardItem bordered style = {{opacity: vid2Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Explain New Words or Ideas</Text>
          </Left>
          <Right>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {changeReadState("video2seen", vid2Seen);}}>
                <Icon name={seenIcon(vid2Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 3, video: 'Past', "name": "Recall the Past"})}>
          <CardItem bordered style = {{opacity: vid3Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Recall the Past</Text>
          </Left>
          <Right>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {changeReadState("video3seen", vid3Seen);}}>
                <Icon name={seenIcon(vid3Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 4, video: 'Future', "name": "Discuss the Future"})}>
          <CardItem bordered style = {{opacity: vid4Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Discuss the Future</Text>
          </Left>
          <Right>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {changeReadState("video4seen", vid4Seen);}}>
                <Icon name={seenIcon(vid4Seen)} style={{color: "blue", paddingRight: 20}}/>
              </TouchableOpacity>

              <Icon name="arrow-forward" />
            </View>
          </Right>
         </CardItem>
         </TouchableOpacity>    
         
        </Card>
      </Content>
      
        <View style={{flex:0.75, padding: 50, opacity: 1.0, justifyContent: 'space-around'}}>
        
          <Text style={{backgroundColor: "#eee", padding: 15, borderRadius: 10}}>
            If you're done watching the videos, click 'Let's Read' to practice your literacy-building strategies!
          </Text>
         
          <TouchableOpacity style={{flex:0.7}} key="letsread" onPress={() => navigation.navigate("BookList")}> 
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail square source={Letsread} style={{resizeMode: "contain"}}/>
                  <Body>
                    <Text>Let's Read</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>

        </View>
      
		</Container>
	);
}
