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
  
  const [readCount, setReadCount] = React.useState(0);
  let rc = 0;
  const SEEN_OPACITY = 0.6;

  var storeData = async (vals) => {
    
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
    }
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
    console.log("thrd");
    console.log(v0 + v1 + v2 + v3);
    rc = ((v0=="true")? 1: 0) + ((v1=="true")? 1: 0) + ((v2=="true")? 1: 0) + ((v3=="true")? 1: 0);
    console.log("Rc is " + rc);
    setReadCount(rc);
    console.log(readCount);
  }

  async function setSeenStates () {
    let v0 = await AsyncStorage.getItem('video0seen');      await setVid0Seen("true" == String(v0));
    let v1 = await AsyncStorage.getItem('video1seen');      await setVid1Seen("true" == String(v1));
    let v2 = await AsyncStorage.getItem('video2seen');      await setVid2Seen("true" == String(v2));
    let v3 = await AsyncStorage.getItem('video3seen');      await setVid3Seen("true" == String(v3));
    // console.log(v0 == "true");
    console.log(v0 + " " + v1 + " " + v2 + " " + v3);
    console.log(vid0Seen + " " + vid1Seen + " " + vid2Seen + " " + vid3Seen);
    // await setReadCount((vid0Seen? 1: 0) + (vid1Seen? 1: 0) + (vid2Seen? 1: 0) + (vid3Seen? 1: 0));
    updateReadCount(v0, v1, v2, v3);
    
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
        <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 0, video: 'READY', "name": "READY To Read"})}>
        <CardItem bordered style = {{opacity: vid0Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>READY TO Read</Text>
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

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 1, video: 'Connections', "name": "Making Life Connections"})}>
          <CardItem bordered style = {{opacity: vid1Seen ? SEEN_OPACITY: 1.0}}>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Making Life Connections</Text>
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
    
         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 2, video: 'Word', "name": "What's That Word?"})}>
          <CardItem bordered style = {{opacity: vid2Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>What's That Word?</Text>
          
          
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

         <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 3, video: 'Picture', "name": "Check Out the Pictures"})}>
          <CardItem bordered style = {{opacity: vid3Seen ? SEEN_OPACITY: 1.0}}>
          <Left>
          <Icon  name="movie" type="MaterialIcons"/>
          <Text>Check Out the Pictures</Text>
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
         
        </Card>
      </Content>
      
        <View style={{flex:1, padding: 50, opacity: 1.0, justifyContent: 'space-around'}}>
        
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
