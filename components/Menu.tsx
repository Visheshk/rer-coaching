import React from 'react';
import { View, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import { styles } from '../style';

import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import Videos from '../assets/videos.png'; 
import Start from '../assets/start.png'; 
import Letsread from '../assets/letsread.png'; 

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
    storeData();
		return (
      <View style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
       <TouchableOpacity key="video" onPress={() => navigation.navigate("VideoList")}> 
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={Videos} />
              <Body>
                <Text>Videos</Text>
                <Text note>Tips for building young kids' literacy skills.
</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={Videos} style={{height: null, width: null, flex: 1}}/>
          </CardItem>
        </Card>
        </TouchableOpacity>

        <TouchableOpacity key="letsread" onPress={() => navigation.navigate("BookList")}> 
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={Letsread} />
              <Body>
                <Text>Let's Read</Text>
                <Text note>Learn and practice simple literacy-building strategies for reading aloud with your child.</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={Videos} style={{height: null, width: "45%", flex: 1}}/>
          </CardItem>
        </Card>
        </TouchableOpacity>

      </View>
		);
	// }
}
