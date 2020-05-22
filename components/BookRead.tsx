import React from 'react';
import { Dimensions, Slider, StyleSheet, Text, TouchableHighlight, View, Alert, AsyncStorage } from 'react-native';

import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Icon, Tile } from 'react-native-elements';
import { Image } from 'react-native';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import bearcover from '../assets/books/bear-cover.png';
import bearPages from '../assets/books/bearList';
// import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
// import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const useStyles = makeStyles({
  root: {
    maxWidth: "345px",
    // width: "40%",
    height: "auto"
  },

  media: {
    padding: "5px",
    display: "block",
    margin: "auto",
    width: "100%"
  }
});


export function BookRead({navigation, route}) {
  const classes = useStyles();
  const bookName = route.params["book"];
  // const pageNumber = route.params["page"].bookPage;
  //****TODO: make this list dynamic in the future
  const [userInfo, setUserInfo] = React.useState();
  // const [bookPages, setBookPages] = React.useState("{}");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [imageName, setImageName] = React.useState("p1");
  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));

    } catch (error) {
      console.log(error);
    }
    try {
      setCurrentPage(await AsyncStorage.getItem('bookPage'));
      console.log(currentPage);
      setImageName("p" + currentPage);
    } catch (error) { console.log(error); }

  };
  storeData();

  async function changePage(dir) {
    console.log(dir);
    if (currentPage == 1 && dir == -1) {
      console.log("first page!");
    }
    else if (currentPage == 30 && dir == 30) {
      console.log("last page!");
    }
    else {
      var cp = parseInt(currentPage) + dir;
      if (isNaN(parseInt(cp))) {
        cp = 1;
      }
      // console.log(cp);
      await AsyncStorage.setItem('bookPage', cp);
      setCurrentPage(cp);
      setImageName("p" + cp);      
      // console.log(bearPages[imageName]);
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
            source={{ uri: bearPages[imageName] }}
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
              <View style={{width: "100%", height: "100%", backgroundColor: 'skyblue'}} />
    </View>
  </View>
    
  );
}