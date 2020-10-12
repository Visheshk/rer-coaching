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

  async function setSeenStates () {
    let v0 = await AsyncStorage.getItem('video0seen');      setVid0Seen("true" == v0);  
    let v1 = await AsyncStorage.getItem('video1seen');      setVid1Seen("true" == v1);
    let v2 = await AsyncStorage.getItem('video2seen');      setVid2Seen("true" == v2);
    let v3 = await AsyncStorage.getItem('video3seen');      setVid3Seen("true" == v3);
    
    setReadCount((vid0Seen? 0: 1) + (vid1Seen? 0: 1) + (vid2Seen? 0: 1) + (vid3Seen? 0: 1));
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
      {(readCount > 2)? (
        <View style={{flex:1, padding: 50, opactity: 0.0, justifyContent: 'space-around'}}>
        
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
        ): null}
		</Container>
	);
}
