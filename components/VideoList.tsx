import React from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

import { Container, Header, Content, Card, CardItem, Text, Icon, Left, Right } from 'native-base';

export function VideoList({navigation, route}) {
	// render() {
  // const classes = useStyles();
  const [userInfo, setUserInfo] = React.useState();
  const [vid0Seen, setVid0Seen] = React.useState(false);
  const [vid1Seen, setVid1Seen] = React.useState(false);
  const [vid2Seen, setVid2Seen] = React.useState(false);
  const [vid3Seen, setVid3Seen] = React.useState(false);
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
    Keyboard.dismiss();
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      (async() => {
        try {
          let v0 = await AsyncStorage.getItem('video0seen');      setVid0Seen("true" == v0);  
          console.log(vid0Seen);
        } catch (err) { console.log (err); }
        
        let v1 = await AsyncStorage.getItem('video1seen');      setVid1Seen("true" == v1);
        let v2 = await AsyncStorage.getItem('video2seen');      setVid2Seen("true" == v2);
        let v3 = await AsyncStorage.getItem('video3seen');      setVid3Seen("true" == v3);
        
        console.log(vid1Seen);
        console.log(vid2Seen);
        console.log(vid3Seen);
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


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
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('VideoWatch', {page: 1, video: 'Connections', "name": "Making Life Connections"})}>
        <CardItem bordered style = {{opacity: vid1Seen ? SEEN_OPACITY: 1.0}}>
        <Icon  name="movie" type="MaterialIcons"/>
        <Text>Making Life Connections</Text>
        <Left />
        <Right style={{alignSelf: "flex-end"}}>
          <Icon name="arrow-forward" />
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
          <Icon name="arrow-forward" />
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
          <Icon name="arrow-forward" />
        </Right>
       </CardItem>
       </TouchableOpacity>       
         
     </Card>
     </Content>
		</Container>
	);
}
