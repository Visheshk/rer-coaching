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

export function SeenVideoList({navigation, route}) {
  
  const SEEN_OPACITY = 0.6;

  let rc = 0;
  let videoUrls = [
    {"title": "Introduction to R.E.A.D.Y", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/welcome.mp4?raw=true"}
    {"title": "How to use the Coaching Experience", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true"}
    {"title": "How to Read With Floppy", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true"}
  ]
    
  //downloaded URLS
  //

  
  };
  

  React.useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss();      
    }, 1000);

  }, [navigation]);


  return (

    <Container>
      <Content>
        <VideoPlayer
          showControlsOnLoad={true}
          height={400}
          switchToPortrait= {()=> {}}
          videoProps={{
            source : { uri: 'https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true', overrideFileExtensionAndroid: 'mp4' },
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
