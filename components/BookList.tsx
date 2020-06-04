import React from 'react';
import { View, Text, Alert, AsyncStorage, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon, Tile } from 'react-native-elements'

import bearcover from '../assets/books/bear-cover.png';

export function BookList({navigation, route}) {
  //****TODO: make this list dynamic in the future
  const [userInfo, setUserInfo] = React.useState();
  const [bookPage, setBookPage] = React.useState(1);
  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
      Alert.alert("user information not found! Go home and enter details again?");
    }
    // try {
    //   setBookPage(await AsyncStorage.getItem('bookPage'));
    //   console.log(bookPage);
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("user information not found! Go home and enter details again?");
    // }
  };
  storeData();
  return (
    <View style={styles.mainView}>
    <Tile
      imageSrc={bearcover}
      title="Start Reading"
      containerStyle={styles.container}
      titleStyle = {styles.title}
      imageProps={{resizeMode: "contain"}}
      onPress={() => navigation.navigate('BookRead', {book:"BearFight"})}
    >
    </Tile>
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    height: "100%"
  },

  container: {
    height: "100%"
  },

  title: {
    textAlign: "center"
  }

});

