import React from 'react';
import { Text, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Alert, AsyncStorage, Linking, Image, Keyboard } from 'react-native';
import { Modal } from 'react-native';
// import { Button } from 'react-native-elements';
// import Button from '@material-ui/core/Button';
import { Tile } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Right, Body } from 'native-base';

import 'react-native-gesture-handler';
import { Audio, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
// import { styles } from '../style';
import { useNavigation } from '@react-navigation/native';

import { updateSeenScreens } from '../extras/methods.tsx';
import {logo} from '../assets/images/ready-logo.png';
import coachApp from '../assets/icons/coaching-app.png';
import bunnyReading from '../assets/images/bunny-reading.png';

// export function WelcomeScreen({navigation, route}) {
export class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);    
    const { navigation } = this.props;
    // console.log("propos here", this.props.route.params);
    this.state = {
      userInfo: {}, 
      
      name: "", 
      age: "", 
      studyId: "", 
      
      isLoading: true, 
      speakerAppURL: "",

      seenVideoList: false,
      seenSpeakerVideo: false,

      speakerModal: false,

    };
    
    navigation.setOptions({ "headerRight": () => (
      <Button 
        color = "#AAA"
        onPress={() => navigation.navigate("Login")}
        title="Login"

      />
    )});
  }

  componentDidMount() {
   const getUInfo = async () => {
    // console.log("getting user info")
    AsyncStorage.getItem('userInfo').then(response =>  {
      let res = JSON.parse(response);
      let respEmpty = false;
      if (res == null) { respEmpty = true; }
      else if (res.name == null || res.name == "") { respEmpty = true; }
      else if (res.studentId == null || res.studentId == "") { respEmpty = true; }
      else if (res.age == null || res.age == "") { respEmpty = true; }
      // console.log(res);
      if (respEmpty == false ) {
        this.setState({
          userInfo: res,
          name: res.name,
          age: res.age,
          studyId: res.studentId
        });
        // console.log(" updating state from userInfo 22");
        // console.log(this.state);
        (async () => {
          try {
            // console.log(res);
            let resp = await fetch('https://talkwithme.herokuapp.com/api/users/', {
            method: 'POST',
            mode: 'cors',
            headers: {
               "Accept": "*/*",
              "Accept-Language": "en-US,en;q=0.5",
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
              "name": res.name, "age": res.age, "study_id": res.studentId
            })
          });

            let t = await resp.text();
            // console.log(t);
            this.setState({isLoading: false});
            this.setState({speakerAppURL: "https://talkwithme.herokuapp.com/talk/booklist.html?session=" + t});
            console.log(this.state.speakerAppURL);
          } catch (error) {
            console.log("fetch failing");
            console.error(error);
          }
        })();
      }
      else {
        navigation.navigate('Login');
      }
      // console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const getVideoData = async () => {
    try {
      this.setState({"seenVideoList": await AsyncStorage.getItem("seenVideoList")});
      this.setState({"seenSpeakerVideo": await AsyncStorage.getItem("seenSpeakerVideo")});
      console.log("getting just videolist");
      console.log(this.state.seenVideoList);
    } catch(e) {console.error(e);}
    /*
    await AsyncStorage.getItem('seenScreens').then(res => {
      const seenScreens = res;
      let seenS = seenScreens != null ? JSON.parse(seenScreens) : null;
      console.log("first retrieve " + res);
      if (seenS == null) {
        console.log("seens found null");
        seenS = {
          "seenVideoList": false,
          "seenSpeakerVideo": false
        }
        // try {AsyncStorage.setItem('seenVideoList', false);} catch (e) {console.error(e);}
        try {AsyncStorage.setItem('seenScreens', JSON.stringify(seenS));} catch (e) {console.error(e);}
        
      }
      else {
        console.log("setting state");
        console.log(seenS);
        this.setState({"seenVideoList": seenS["seenVideoList"], "seenSpeakerVideo": seenS["seenSpeakerVideo"]});
      }
    })
    .catch (err => {
      console.error(err);
    });
    */
  }
  getVideoData();
  getUInfo();
  // console.log(this.props.navigation);
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    // console.log("refocussed");
    // console.log("refocussed");
    // console.log("refocussed");

    getVideoData();
    getUInfo();
  });

    Keyboard.dismiss();

  }
  // handleOnPress = () => 
  modalChange = (newState) => this.setState({ "speakerModal": newState })
  
  modalClose = function () {
    this.modalChange(false);
    Linking.openURL(this.state.speakerAppURL); 
  }
  
  speakerClick = function () {
    if (!this.state.isLoading){
      console.log("on tile click");
      console.log(this.state.seenSpeakerVideo == "true");
      if (this.state.seenVideoList != "false") {
        if (this.state.seenSpeakerVideo == "true") {
          Linking.openURL(this.state.speakerAppURL); 
        }
        else {
          this.setState({"seenSpeakerVideo": true})

          updateSeenScreens("seenSpeakerVideo", true);
          this.modalChange(true);
        }
        // navigation.navigate('Speaker', {'speakerurl': this.state.speakerAppURL}) ;
      }
      else {
        alert("Try out the coaching experience before Reading Aloud with Floppy!");
      }
    } 
  }
  
  AllVideos = function() {
    if (this.state.seenVideoList == "true") {
      return(
        <TouchableOpacity onPress={() => alert("This will lead you to the videos you have seen across the app.")}>
          <CardItem bordered>
          <Text>All Videos</Text>
          <Left />
          <Right style={{alignSelf: "flex-end"}}>
            <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
              <Icon name="arrow-forward" />
            </View>
          </Right>
          </CardItem>
        </TouchableOpacity>
      )
    }
    else {
      return(<View />);
    }
  }

  render() {
  const { navigation } = this.props;
	return (
    <Container>
      <Content>
    		<View style={{flexDirection: "column"}}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image source={require('../assets/images/ready-logo.png')} style={{width: "100%", height: 200, resizeMode: 'contain'}}/>
          </View>

          <Text style={styles.title}> Hi {this.state.name}! </Text>

          <View style={{flex: 1, flexDirection: 'row', borderRadius: 5, overflow: 'visible'}}>
            <View style={styles.tileView}>
               <Tile
                imageSrc={coachApp}
                title="Coaching Experience"
                imageContainerStyle={{borderWidth: 3, margin:0}}
                containerStyle={[styles.tileContainer, {borderWidth: 0}]}
                imageProps={{resizeMode: "contain"}}
                onPress={() => {navigation.navigate('VideoList', {name: this.state.name})}}
              >
              </Tile>
            </View>   

            <View style={styles.tileView}>
              <Tile
                imageSrc={bunnyReading}
                title="Read Aloud with Floppy"
                imageContainerStyle={{borderWidth: 3, margin:0}}
                containerStyle={[styles.tileContainer, {borderWidth: 0, opacity: this.state.isLoading ? 0.3: 1.0}]}
                disabled={this.state.isLoading}
                imageProps={{resizeMode: "contain", width: "50%"}}
                onPress={() => {
                  this.speakerClick();
                }}
              >
              </Tile>      
            </View>
          </View>
          <View style={{position: 'absolute', top: 0}}>
            <Text style={{textAlign: "right", fontSize: 9, padding: 10, opacity: 0.5}}> v1.2.7 </Text>
          </View>
      	</View>
        <Card style={{flex: 0}}>
          <TouchableOpacity onPress={() => this.modalChange(true)}>
            <CardItem bordered>
            <Text>Helpful Tips</Text>
            <Left />
            <Right style={{alignSelf: "flex-end"}}>
              <View style={{alignSelf: "flex-end", flexDirection: "row"}}>
                <Icon name="arrow-forward" />
              </View>
            </Right>
            </CardItem>
          </TouchableOpacity>

          {this.AllVideos()}
        </Card>
      </Content>
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.speakerModal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.modalChange(false);
          }}
        >
          <View style= {styles.overlay} />
          <View style={styles.centeredView}>

            <View style={styles.modalView}>
              <View style = {{width:"100%"}}>
                <TouchableHighlight
                  style={{ ...styles.closeButton}}
                  onPress={() => this.modalChange(false)}
                >
                
                <Text style={styles.buttonTextStyle}>X</Text>
                </TouchableHighlight>
              </View>
              <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                <Text style={styles.modalText}>Learn How to Read Aloud With Floppy</Text>
                
              </View>
              <VideoPlayer
                showControlsOnLoad={true}
                height={400}
                width={300}
                videoProps={{
                  source : { uri: 'https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true', overrideFileExtensionAndroid: 'mp4' },
                  resizeMode : Video.RESIZE_MODE_CONTAIN,
                  shouldPlay: false,
                }}
              />
              <View style={{paddingTop: 10}}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", paddingTop: 10}}
                  onPress={() => this.modalClose()}
                >
                
                <Text style={styles.buttonTextStyle}>Head to Read Aloud</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
    </Container>
	);
	}
}

export default function(props) {
  const navigation = useNavigation();
  return <MyBackButton {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "100%", padding: 5, elevation: 4, borderWidth: 3, borderColor: '#333'
  },

  tileView: {
    flex: 0.5, padding: 5
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    // fontWeight: 'bold',
  },

  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
    position: 'absolute'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    backgroundColor: "#dd1111",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end"
    // alignSelf: "right"    
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22    
  }

});

