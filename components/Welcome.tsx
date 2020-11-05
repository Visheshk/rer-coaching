import React from 'react';
import { Text, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Alert, AsyncStorage, Linking, Image, Keyboard } from 'react-native';
import { Modal } from 'react-native';
// import { Button } from 'react-native-elements';
// import Button from '@material-ui/core/Button';
import { Tile } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Right, Body } from 'native-base';

import 'react-native-gesture-handler';
import { Audio, Video } from 'expo-av';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
// import { styles } from '../style';
import { useNavigation } from '@react-navigation/native';

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
    console.log("getting user info")
    AsyncStorage.getItem('userInfo').then(response =>  {
      let res = JSON.parse(response);
      let respEmpty = false;
      if (res == null) { respEmpty = true; }
      else if (res.name == null || res.name == "") { respEmpty = true; }
      else if (res.studentId == null || res.studentId == "") { respEmpty = true; }
      else if (res.age == null || res.age == "") { respEmpty = true; }
      console.log(res);
      if (respEmpty == false ) {
        this.setState({
          userInfo: res,
          name: res.name,
          age: res.age,
          studyId: res.studentId
        });
        console.log(" updating state from userInfo 22");
        console.log(this.state);
        (async () => {
          try {
            console.log(res);
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
            console.log(t);
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
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const getVideoData = async () => {
    await AsyncStorage.getItem('seenScreens').then(res => {
      const seenScreens = res;
      let seenS = seenScreens != null ? JSON.parse(seenScreens) : null;
      if (seenS == null) {
        seenS = {
          "seenVideoList": false,
          "seenSpeakerVideo": false
        }
        try {AsyncStorage.setItem('seenScreens', JSON.stringify(seenS))}
        catch (e) {console.error(e);}
        
      }
      else {
        this.setState({"seenVideoList": seenS["seenVideoList"], "seenSpeakerVideo": seenS["seenSpeakerVideo"]});
      }
    })
    .catch (err => {
      console.error(err);
    });
  }
  this.focusListener = this.props.navigation.addListener('focus', () => {
    getVideoData();
    getUInfo();
  });

    Keyboard.dismiss();

  }
  // handleOnPress = () => 
  modalChange = (newState) => this.setState({ "speakerModal": newState })

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
                  if (!this.state.isLoading){ 
                    if (this.state.seenSpeakerVideo) {
                      Linking.openURL(this.state.speakerAppURL); 
                    }
                    else {
                      this.setState({"seenSpeakerVideo": true})
                      this.modalChange(true);
                    }
                    // navigation.navigate('Speaker', {'speakerurl': this.state.speakerAppURL}) ;
                  } 
                }}
              >
              </Tile>      
            </View>
          </View>
          <View style={{position: 'absolute', top: 0}}>
            <Text style={{textAlign: "right", fontSize: 9, padding: 10, opacity: 0.5}}> v1.2.6 </Text>
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => this.modalChange(false)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});

