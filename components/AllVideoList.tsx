import React, {Component} from 'react';
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

const videoUrls1 = [
  {"title": "Introduction to R.E.A.D.Y", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/welcome.mp4?raw=true"},
  {"title": "How to use the Coaching Experience", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true"},
  {"title": "How to Read With Floppy", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true"}
]

const videoUrls2 = [
  {"title": "Recall the Past", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Recall%20The%20Past%20Final%20V2.mp4?raw=true"},
  {"title": "Explain New Words or Ideas", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Explain%20New%20Words%20Or%20Ideas%20Final%20V2.mp4?raw=true"},
  {"title": "Ask Questions", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Ask%20Questions%20Final%20V2.mp4?raw=true"},
  {"title": "Discuss the Future", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Discuss%20The%20Future%20Final%20V2.mp4?raw=true"},
  {"title": "You Can Make a Difference", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/You%20Can%20Make%20A%20Difference%20Final%20V2.mp4?raw=true"},
]

const videoUrls = [
  {"title": "Introduction to R.E.A.D.Y", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/welcome.mp4?raw=true"},
  {"title": "How to use the Coaching Experience", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true"},
  {"title": "How to Read With Floppy", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true"},
  {"title": "", "url": ""},
  {"title": "Recall the Past", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Recall%20The%20Past%20Final%20V2.mp4?raw=true"},
  {"title": "Explain New Words or Ideas", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Explain%20New%20Words%20Or%20Ideas%20Final%20V2.mp4?raw=true"},
  {"title": "Ask Questions", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Ask%20Questions%20Final%20V2.mp4?raw=true"},
  {"title": "Discuss the Future", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Discuss%20The%20Future%20Final%20V2.mp4?raw=true"},
  {"title": "You Can Make a Difference", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/You%20Can%20Make%20A%20Difference%20Final%20V2.mp4?raw=true"}, 
]

const SEEN_OPACITY = 0.6;
export class AllVideoList extends React.Component {

  v1Arr = videoUrls1.map((vurl) => {
    return(<Text>{vurl.text}</Text>);
  });

  render() {  
    return (
      <Container>
        <Content>
        <Card style={{flex: 0}}>
          
        </Card>
        {
          videoUrls.map(function (vurl) {
            if (vurl["title"] == "") {
              return(
                <CardItem bordered>
                <Text> </Text>
                <Left />
                
                </CardItem>
              )
            }
            return(
              <TouchableOpacity onPress={() => alert(vurl.url)}>
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
        </Content>
      </Container>
    );
  }
}


const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={videoUrls1}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

export default FlatListBasics;
