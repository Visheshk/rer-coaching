import React from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';

export function VideoList({navigation, route}) {
	// render() {
  // const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState();
  var storeData = async (vals) => {
    try {
      // console.log(vals);
      await AsyncStorage.setItem('currentScreen', 'WelcomeScreen');
    } catch (error) {
      // Error saving data
    }
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
    }
  };
  storeData();
	return (


		<View>

    <Card style={{width: "100%"}}>
      <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {video: 'READY'})}>
      <CardItem bordered>
        <Icon active name="ios-book" />
        <Text>READY TO Read</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onClick={() => navigation.navigate('VideoWatch', {video: 'Reading Fun'})}>
         <CardItem bordered>
          <Icon active name="md-rocket" />
          <Text>Making Reading Fun</Text>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
         </CardItem>
       </TouchableOpacity>
  
       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {video: 'Connections'})}>
        <CardItem >
        <Icon active name="md-git-network" />
        <Text>Making Life Connections</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {video: 'Word'})}>
        <CardItem >
        <Icon active name="md-search" />
        <Text>What's That Word?</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {video: 'Picture'})}>
        <CardItem >
        <Icon active name="md-photos" />
        <Text>Check Out the Pictures</Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>       
         
     </Card>
           
		</View>
	);
}
