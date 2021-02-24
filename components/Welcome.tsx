import React from 'react';
import { Text, Button, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, TextInput, Alert, AsyncStorage, Image, Keyboard } from 'react-native';
import * as Linking from 'expo-linking';
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
import { useNavigation, CommonActions } from '@react-navigation/native';

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
      floppyTileTransparency: 0.5,
      seenSpeakerVideo: false,

      speakerModal: false,

    };
    
    
  }

  componentDidMount() {
    // getVideoData();
    // console.log(Linking.makeUrl('path'));

    
    this.props.navigation.setOptions({ "headerRight": () => (
      <Button 
        color = "#AAA"
        onPress={() => this.props.navigation.navigate("Login")}
        title="Login"
      />
    )});

    const getUInfo = async () => {
      const atLogin = await AsyncStorage.getItem("atLogin");
      // if (atLogin == "false") {

      // console.log("getting user info")
      // const PERSISTENCE_KEY = 'NAVIGATION_STATE';
      // const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        // console.log(savedStateString);
      // let sss = JSON.parse(savedStateString);
      // console.log(sss)

      AsyncStorage.getItem('userInfo').then(response =>  {
        let res = JSON.parse(response);
        let respEmpty = false;
        if (res == null) { respEmpty = true; }
        else if (res.name == null || res.name == "") { respEmpty = true; }
        else if (res.studentId == null || res.studentId == "") { respEmpty = true; }
        else if (res.age == null || res.age == "") { respEmpty = true; }
        else if (atLogin == "true") {respEmpty = true;}
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
              // console.log(this.state.speakerAppURL);
            } catch (error) {
              console.log("fetch failing");
              console.error(error);
            }
          })();
        }
        else {
          this.props.navigation.navigate('Login');
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
        // console.log("getting just videolist");
        // console.log("videolist bool is " + this.state.seenVideoList);
        let ftt = 0.5;
        // console.log(this.state.seenVideoList);
        // console.log(this.state.seenVideoList == "true");
        if (this.state.seenVideoList == "true") { ftt = 1.0; }
        // console.log(ftt)
        this.setState({"floppyTileTransparency": ftt})
      } catch(e) {console.error(e);}
    }
    getVideoData();
    getUInfo();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log("on focuys");
      getVideoData();
      getUInfo();
    });

    Keyboard.dismiss();

  }

  componentDidUpdate() {
    // console.log("updating comp");
  }
  // handleOnPress = () => 
  modalChange = (newState) => this.setState({ "speakerModal": newState })
  
  modalClose = function () {
    this.modalChange(false);
    Linking.openURL(this.state.speakerAppURL); 
  }
  
  speakerClick = function () {
    console.log(this.state.seenVideoList);
    if (!this.state.isLoading){
      // console.log("on tile click");
      // console.log(this.state.seenSpeakerVideo == "true");
      if (this.state.seenVideoList != "false") {
        // if (this.state.seenSpeakerVideo == "true") {
          Linking.openURL(this.state.speakerAppURL); 
        // }
        // else {
          // this.setState({"seenSpeakerVideo": true})

          // updateSeenScreens("seenSpeakerVideo", true);
          // this.modalChange(true);
          // this.props.navigation.navigate("FloppyPage", {"speakerURL": this.state.speakerAppURL});
          // console.log("trying to navigate to floppy tut");
        // }
        // navigation.navigate('Speaker', {'speakerurl': this.state.speakerAppURL}) ;
      }
      else {
        alert("Look through the R.E.A.D.Y. Videos before Reading Aloud with Floppy!");
      }
    } 
  }
  
  AllVideos = function() {
    if (this.state.seenVideoList == "true") {
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate("AllVideoList")}>
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

  floppyReset = async function () {
    try {
      await AsyncStorage.setItem("seenSpeakerVideo", "false")
      this.setState({"seenSpeakerVideo": "false"});
      // this.setState({"seenSpeakerVideo": await AsyncStorage.getItem("seenSpeakerVideo")});
      console.log("resetting floppy tut");
      // console.log(this.state.seenVideoList);
    } catch(e) {console.error(e);}
  }

  render() {
  const { navigation } = this.props;
	return (
    <Container>
      <Content>
    		<View style={{flexDirection: "column"}}>
          <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableWithoutFeedback onLongPress={() => this.floppyReset()}>
            <Image source={require('../assets/images/ready-logo.png')} style={{width: "100%", height: 200, resizeMode: 'contain'}}/>
            </TouchableWithoutFeedback>
          </View>

          <Text style={styles.title}> Hi {this.state.name}!</Text>

          <View style={{flex: 1, flexDirection: 'column', borderRadius: 5, overflow: 'visible'}}>
            <TouchableOpacity  onPress={() => {this.speakerClick();}} >
              <View style={styles.tileView}>
                
                <View style={styles.tileText} >
                  <Text style={{fontSize: 30, fontWeight: "bold"}}>Read Aloud With Floppy</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Image source={bunnyReading} style={{width: "100%", height: 150, resizeMode: 'contain'}}/>
                </View>

                
              </View>   
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, flexDirection: 'column', borderRadius: 5, overflow: 'visible', justifyContent: "flex-start",}}>
            <TouchableOpacity onPress={() => {navigation.navigate('VideoList', {name: this.state.name, speakerURL: this.state.speakerAppURL})}}>
              
              <View style={styles.tileView}>
                
                <View style={styles.tileText}>
                  <Text style={{fontSize: 30}}>R.E.A.D.Y. Resources</Text>
                </View>              

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
                  <Image source={coachApp} style={{margin: 5, width: "100%", height: 110, resizeMode: 'contain'}}/>
                </View>
                
              </View>
              
            </TouchableOpacity>
          </View>

          <View style={{position: 'absolute', top: 0}}>
            <Text style={{textAlign: "right", fontSize: 9, padding: 10, opacity: 0.5}}> v2.5 </Text>
          </View>
      	</View>
        
      </Content>
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
    flex: 1, padding: 10, flexDirection: "row", borderWidth: 0, margin: 5, elevation: 3,
  },

  tileText: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: "center" ,
    left:20
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

