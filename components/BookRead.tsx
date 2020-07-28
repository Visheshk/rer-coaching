import React from 'react';
import { Dimensions, Slider, StyleSheet, Text, Button, TouchableOpacity, TouchableHighlight, View, Alert, AsyncStorage, Image, Picker } from 'react-native';
import { Root, ActionSheet } from "native-base";

import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';
import { Icon, Tile } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';

import { PageRecorder } from './PageRecorder';
import { PR2 } from './pr2';
import rtArrow from '../assets/icons/rtArrow.png'; 
import ltArrow from '../assets/icons/ltArrow.png'; 

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

class Page {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const  gitImageUrl = "https://raw.githubusercontent.com/Visheshk/rer-coaching/master/assets/books/bearpages/bear-";
const PAGES = [
  require("../assets/books/bearpages/bear-pg1.png"),
  require("../assets/books/bearpages/bear-pg2.png"),
  require("../assets/books/bearpages/bear-pg3.png"),
  require("../assets/books/bearpages/bear-pg4.png"),
  require("../assets/books/bearpages/bear-pg5.png"),
  require("../assets/books/bearpages/bear-pg6.png"),
  require("../assets/books/bearpages/bear-pg7.png"),
  require("../assets/books/bearpages/bear-pg8.png"),
  require("../assets/books/bearpages/bear-pg9.png"),
  require("../assets/books/bearpages/bear-pg10.png"),
  require("../assets/books/bearpages/bear-pg11.png"),
  require("../assets/books/bearpages/bear-pg12.png"),
  require("../assets/books/bearpages/bear-pg13.png"),
  require("../assets/books/bearpages/bear-pg14.png"),
  require("../assets/books/bearpages/bear-pg15.png"),
  require("../assets/books/bearpages/bear-pg16.png"),
  require("../assets/books/bearpages/bear-pg17.png"),
  require("../assets/books/bearpages/bear-pg18.png"),
  require("../assets/books/bearpages/bear-pg19.png"),
  require("../assets/books/bearpages/bear-pg20.png"),
  require("../assets/books/bearpages/bear-pg21.png"),
  require("../assets/books/bearpages/bear-pg22.png"),
  require("../assets/books/bearpages/bear-pg23.png"),
  require("../assets/books/bearpages/bear-pg24.png"),
  require("../assets/books/bearpages/bear-pg25.png"),
  require("../assets/books/bearpages/bear-pg26.png"),
  require("../assets/books/bearpages/bear-pg27.png"),
  require("../assets/books/bearpages/bear-pg28.png"),
  require("../assets/books/bearpages/bear-pg29.png"),
  require("../assets/books/bearpages/bear-pg30.png")
]

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
  const [leftState, setLeftState] = React.useState(true);
  const [rightState, setRightState] = React.useState(true);
  const DISABLED_OPACITY = 0.5;
  const imageW = Dimensions.get('window').height*0.6;
    const imageH = Dimensions.get('window').height*0.8;
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
      // console.log("setting up current page " + currentPage + " " + imageName);
      // console.log("bear pages " + bearPages[imageName]);
      setImageURL(gitImageUrl + imageName + ".png");
      // setButtonStates();
      navigation.setOptions({ "title": 'Read!'});
    } catch (error) { console.log(error); }

  };
  

  React.useEffect(() => {
    setButtonStates();
    storeData();
  }); 
  // const [selectedValue, setSelectedValue] = useState("java");
  const BUTTONS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ];
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>

        <Button 
          color = "#777777"
          onPress={() => ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: 0,
              title: "Go to Page"
            },
            buttonIndex => {
              setPage(parseInt(BUTTONS[buttonIndex]));
              // console.log(buttonIndex)
            }
          )}
          title={`Page ${currentPage}`}/>
        </View>
      ),
    });
  }, [navigation, currentPage, setCurrentPage, ActionSheet]);


  function setButtonStates() {
    setLeftState(true);
    setRightState(true);
    if (currentPage == 1) {
      setLeftState(false);
    }
    else if (currentPage == 30) {
      setRightState(false);
    }
  }

  async function setPage(cp) {
    await AsyncStorage.setItem('bookPage', cp.toString());
    setCurrentPage(cp);
    setImageName("pg" + cp);
    setImageURL(gitImageUrl + "pg" + cp + ".png");
    console.log(imageURL);
  }

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
      setPage(cp);
      
      // console.log("bear pages " + bearPages[imageName]);
    }
    setButtonStates();

    
    
  };
  return (
    <Root>
    <View style={{
      flexDirection: 'column',
      height: "100%"
    }}>

    <ImageZoom cropWidth={imageW}
               cropHeight={imageH}
               imageWidth={imageW}
               imageHeight={imageH}
               style={{alignSelf: "center", position: 'absolute'}}
               >
      
      <Image
        source={PAGES[(currentPage - 1)]}
        style={styles.pageImage}
        
      />

      </ImageZoom>

      <View style={{
        flexDirection: 'row',
      }}>
        <View style={[styles.buttonStyle, {alignItems: "flex-start"}]} >
          <TouchableOpacity 
            onPress={() => changePage(-1)} 
            style={[styles.touchStyle, {opacity: leftState ? 1.0: DISABLED_OPACITY}]} 
            disabled={!leftState}>
            <Image source={ltArrow} style={{height: 50, width: 50}}/>
          </TouchableOpacity>
        </View>
          
        <View style={{
          flex: 1,
          height: "100%",
          width: 400
          // flexGrow: 1,
        }} >

        </View>
            
        <View style={[styles.buttonStyle, {alignItems: "flex-end"}]} >
          <TouchableOpacity 
            onPress={() => changePage(1)} 
            style={[styles.touchStyle, {opacity: rightState ? 1.0: DISABLED_OPACITY}]} 
            disabled={!rightState}>
            <Image source={rtArrow} style={{height: 50, width: 50}}/>
          </TouchableOpacity>
        </View>


    </View>

    <View style={{
        flex: 1
      }}>

      <View style={{flex: 5}}>
        <PR2 page={currentPage}/>
      </View>
    </View>
    
  </View>
  </Root>
    
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
  },
  pageImage: {
    width: "100%", 
    height: "100%", 
    position: "absolute",
    resizeMode: "contain"
  },
  buttonStyle: {
    flex: 1,
    maxWidth: 60,
    height: Dimensions.get('window').height*0.8,
    justifyContent: "center",
    alignSelf: "center"
  },
  touchStyle: {
    flex: 1, 
    width: "100%", 
    justifyContent: "center",
    alignSelf: "center"
  }

});

