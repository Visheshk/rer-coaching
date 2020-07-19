import React from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Container, Header, Content, Card, CardItem, Text, Icon, Left, Right } from 'native-base';

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

		<Container>
    <Content>
    <Card style={{flex: 0}}>
      <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 0, video: 'READY', "name": "READY To Read"})}>
      <CardItem bordered>
        <Left>
        <Icon  name="movie" type="MaterialIcons"/>
        <Text>READY TO Read</Text>
        </Left>
        <Right style={{alignSelf: "flex-end"}}>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 1, video: 'Connections', "name": "Making Life Connections"})}>
        <CardItem bordered>
        <Icon  name="movie" type="MaterialIcons"/>
        <Text>Making Life Connections</Text>
        <Left />
        <Right style={{alignSelf: "flex-end"}}>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>
  
       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 2, video: 'Word', "name": "What's That Word?"})}>
        <CardItem bordered>
        <Left>
        <Icon  name="movie" type="MaterialIcons"/>
        <Text>What's That Word?</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 3, video: 'Picture', "name": "Check Out the Pictures"})}>
        <CardItem bordered>
        <Left>
        <Icon  name="movie" type="MaterialIcons"/>
        <Text>Check Out the Pictures</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>       
         
     </Card>
     </Content>
		</Container>
	);
}
