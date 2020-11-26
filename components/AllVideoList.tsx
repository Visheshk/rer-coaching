import React, {Component} from 'react';
import { Dimensions, View, StyleSheet, TextInput, Alert, TouchableOpacity, TouchableHighlight, Keyboard, Image } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Audio, Video } from 'expo-av';

import { updateSeenScreens } from '../extras/methods.tsx';
import Letsread from '../assets/images/letsread2.png'; 
import Videos from '../assets/images/videos2.png'; 
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Right, Body } from 'native-base';

const videoUrls = [
  {"key": "l1", "title": "Introduction to R.E.A.D.Y", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/welcome.mp4?raw=true"},
  {"key": "l1.5", "title": "Introduction to Coaching Experience", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Intro%20Final%20V2.mp4?raw=true"},
  {"key": "l2", "title": "Coaching Experience Tutorial", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/coaching-tut.mp4?raw=true"},
  {"key": "l3", "title": "Read Aloud With Floppy Tutorial", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true"},
  {"key": "l4", "title": "", "url": ""},
  {"key": "l5", "title": "Recall the Past", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Recall%20The%20Past%20Final%20V2.mp4?raw=true"},
  {"key": "l6", "title": "Explain New Words or Ideas", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Explain%20New%20Words%20Or%20Ideas%20Final%20V2.mp4?raw=true"},
  {"key": "l7", "title": "Ask Questions", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Ask%20Questions%20Final%20V2.mp4?raw=true"},
  {"key": "l8", "title": "Discuss the Future", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Discuss%20The%20Future%20Final%20V2.mp4?raw=true"},
  {"key": "l9", "title": "You Can Make a Difference", "url": "https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/You%20Can%20Make%20A%20Difference%20Final%20V2.mp4?raw=true"}, 
]

const SEEN_OPACITY = 0.6;
export class AllVideoList extends React.Component {
  constructor (props) {
    super(props);
    // console.log(this.props);

  }

  goToVideo(title, url) {
    this.props.navigation.navigate("VideoPage", {"title": title, "url": url});
  }

  render() {  
    return (
      <Container>
        <Content>
        <Card style={{flex: 0}}>
          
        </Card>
        {
          videoUrls.map( (vurl) => {
            if (vurl["title"] == "") {
              return(
                <CardItem bordered key={vurl.key}>
                <Text> </Text>
                <Left />
                
                </CardItem>
              )
            }
            return(
              <TouchableOpacity key={vurl.key} onPress={() => this.goToVideo(vurl.title, vurl.url)}>
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