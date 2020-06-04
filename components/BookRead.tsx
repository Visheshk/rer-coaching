import React from 'react';
import { Dimensions, Slider, StyleSheet, Text, TouchableHighlight, View, Alert, AsyncStorage } from 'react-native';

import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Icon, Tile } from 'react-native-elements';
import { Image } from 'react-native';
import { PageRecorder } from './PageRecorder';

import bearcover from '../assets/books/bear-cover.png';
import bearpages from '../assets/books/';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

const  gitImageUrl = "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/books/bearpages/bear-";
const pg1 = require("../assets/books/bearpages/bear-pg1.png");
const pg2 = require("../assets/books/bearpages/bear-pg2.png");
const pg3 = require("../assets/books/bearpages/bear-pg3.png");
const pg4 = require("../assets/books/bearpages/bear-pg4.png");
const pg5 = require("../assets/books/bearpages/bear-pg5.png");
const pg6 = require("../assets/books/bearpages/bear-pg6.png");
const pg7 = require("../assets/books/bearpages/bear-pg7.png");
const pg8 = require("../assets/books/bearpages/bear-pg8.png");
const pg9 = require("../assets/books/bearpages/bear-pg9.png");
const pg10 = require("../assets/books/bearpages/bear-pg10.png");
const pg11 = require("../assets/books/bearpages/bear-pg11.png");
const pg12 = require("../assets/books/bearpages/bear-pg12.png");
const pg13 = require("../assets/books/bearpages/bear-pg13.png");
const pg14 = require("../assets/books/bearpages/bear-pg14.png");
const pg15 = require("../assets/books/bearpages/bear-pg15.png");
const pg16 = require("../assets/books/bearpages/bear-pg16.png");
const pg17 = require("../assets/books/bearpages/bear-pg17.png");
const pg18 = require("../assets/books/bearpages/bear-pg18.png");
const pg19 = require("../assets/books/bearpages/bear-pg19.png");
const pg20 = require("../assets/books/bearpages/bear-pg20.png");
const pg21 = require("../assets/books/bearpages/bear-pg21.png");
const pg22 = require("../assets/books/bearpages/bear-pg22.png");
const pg23 = require("../assets/books/bearpages/bear-pg23.png");
const pg24 = require("../assets/books/bearpages/bear-pg24.png");
const pg25 = require("../assets/books/bearpages/bear-pg25.png");
const pg26 = require("../assets/books/bearpages/bear-pg26.png");
const pg27 = require("../assets/books/bearpages/bear-pg27.png");
const pg28 = require("../assets/books/bearpages/bear-pg28.png");
const pg29 = require("../assets/books/bearpages/bear-pg29.png");
const pg30 = require("../assets/books/bearpages/bear-pg30.png");

export function BookRead({navigation, route}) {

  // const classes = useStyles();
  const bookName = route.params["book"];

  // const pageNumber = route.params["page"].bookPage;
  //****TODO: make this list dynamic in the future
  const [userInfo, setUserInfo] = React.useState();
  // const [bookPages, setBookPages] = React.useState("{}");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [imageName, setImageName] = React.useState("pg1");
  const [imageURL, setImageURL] = React.useState("https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/books/bearpages/bear-pg1.png");
  // console.log(bearPages);
  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));

    } catch (error) {
      console.log(error);
    }
    try {
      setCurrentPage(await AsyncStorage.getItem('bookPage'));
      // if (isNaN(parseInt(currentPage))) {
      //   setCurrentPage(1);
      // }
      if (currentPage == null) {
        setCurrentPage(1);
        await AsyncStorage.setItem('bookPage', "1");
      }
      setImageName("pg" + currentPage);
      console.log("setting up current page " + currentPage + " " + imageName);
      // console.log("bear pages " + bearPages[imageName]);
      setImageURL(gitImageUrl + imageName + ".png");
    } catch (error) { console.log(error); }

  };
  storeData();

  async function changePage(dir) {
    console.log(dir);
    if (currentPage == 1 && dir == -1) {
      console.log("first page!");
    }
    else if (currentPage == 30 && dir == 1) {
      console.log("last page!");
    }
    else {
      var cp = parseInt(currentPage) + dir;
      if (isNaN(parseInt(cp)) == true || cp == null) {
        cp = 1;
      }
      // console.log(cp);
      console.log("cp is " + cp);
      await AsyncStorage.setItem('bookPage', cp.toString());
      setCurrentPage(cp);
      setImageName("pg" + cp);
      setImageURL(gitImageUrl + "pg" + cp + ".png");
      console.log(imageURL);
      // console.log("bear pages " + bearPages[imageName]);

    }
  };
  return (
    <View style={{
      flexDirection: 'column',
      height: "100%"
    }}>

      <View style={{
        flexDirection: 'row',
        flex: 4
      }}>
        <View style={{
          flex: 1,
          maxWidth: 70,
          justifyContent: "center",
          alignItems: "flex-start"
          // flexGrow: 1,
        }} >
          <Icon
            reverse
            name='caret-left'
            type='font-awesome'
            color='#517fa4'
            containerStyle={{  justifyContent: "center" }}
            onPress={() => changePage(-1)} 
          />

        </View>
          
        <View style={{
          flex: 1,
          height: "100%"
          // flexGrow: 1,
        }} >
          
          <Image
            source={{uri: imageURL }}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            
          />

        </View>
            
        <View style={{
          flex: 1,
          maxWidth: 70,
          // flexGrow: 1,
          justifyContent: "center",
          alignItems: "flex-end"
        }} >
          <Icon
            reverse
            name='caret-right'
            type='font-awesome'
            color='#517fa4'
            containerStyle={{  justifyContent: "center" }}
            onPress={() => changePage(1)} 
          />
        </View>

    </View>
    <View style={{
        flexDirection: 'row',
        flex: 1
      }}>
      <PageRecorder />
    </View>
  </View>
    
  );
}