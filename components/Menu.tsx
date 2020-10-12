import React from 'react';
import { View, StyleSheet, TextInput, Alert, Image, TouchableOpacity, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';
import { styles } from '../style';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Audio, Video } from 'expo-av';

import Videos from '../assets/images/videos2.png'; 
import Start from '../assets/start.png'; 
import Letsread from '../assets/images/letsread2.png'; 

export function MenuScreen({navigation, route}) {
	// render() {
    const [userInfo, setUserInfo] = React.useState();
    var storeData = async (vals) => {
      try {
        setUserInfo(await AsyncStorage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
    };

    React.useEffect(() => {
      setTimeout(() => {
        Keyboard.dismiss();      
      }, 1000);
      
    });

    storeData();
		return (
      <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
        <Video
          usePoster={true}
          source={{ uri: 'https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Intro10-1-20.mp4?raw=true', overrideFileExtensionAndroid: 'mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          useNativeControls={true}
          shouldPlay={false}
          isLooping={false}
          style={{ height: 300 }}
        />
       <TouchableOpacity key="video" onPress={() => navigation.navigate("VideoList")}> 
        <Card>
          <CardItem>
            <Left>
              <Thumbnail square source={Videos} style={{resizeMode: "contain"}}/>
              <Body>
                <Text>Videos</Text>
                <Text note>Tips for building young kids' literacy skills.</Text>
              </Body>
            </Left>
          </CardItem>
          
        </Card>
        </TouchableOpacity>

       

      </View>
		);
	// }
}
