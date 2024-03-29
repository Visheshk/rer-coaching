import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Button } from 'react-native-paper';
import * as SplashScreen  from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Audio, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import * as Analytics from 'expo-firebase-analytics';
import { VideoControl } from './components/VideoControl';
// import { useKeepAwake, activateKeepAwake } from 'expo-keep-awake';
// import Slider from '@react-native-community/slider';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { NetInfo } from '@react-native-community/netinfo';
import 'react-native-gesture-handler';

import { WelcomeScreen } from './components/Welcome';
import { MenuScreen } from './components/Menu';
import { VideoList } from './components/VideoList';
import { VideoWatch } from './components/VideoWatch';
import { BookList } from './components/BookList';
import { BookRead } from './components/BookRead';
import { SpeakerView } from './components/SpeakerView';
import { PageRecorder } from './components/PageRecorder';
import { AllVideoList } from './components/AllVideoList';
import { HelpfulTips } from './components/HelpfulTips';
import { VideoPage } from './components/VideoPage';
import { PR2 } from './components/pr2';


import { FloppyPage } from './components/FloppyPage';

import { styles } from './style';

// import { Ionicons } from '@expo/vector-icons';

// import { Material } from '@expo/vector-icons';

function LoginScreen ( {route, navigation} ) {
  const [isReady, setIsReady] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [studId, setStudId] = React.useState("");
  const [vidSeen, setVidSeen] = React.useState(false);

  const videoTrack = React.useRef(null);
  
  // navigation.dispatch(state => {
  //   // Remove the home route from the stack
  //   const routes = state.routes.filter(r => r.name !== 'Login');

  //   return CommonActions.reset({
  //     ...state,
  //     routes,
  //     index: routes.length - 1,
  //   });
  // });


  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'Login' }]
  // });


  var storeData = async (vals, forward=true) => {
    // useKeepAwake();
    try {
      console.log(vals);
      await AsyncStorage.setItem('bookPages', JSON.stringify({}));
      await AsyncStorage.setItem('userInfo', JSON.stringify(vals));
      await AsyncStorage.setItem('age', vals["age"]);
      await AsyncStorage.setItem('studentId', vals["studentId"]);
      await AsyncStorage.setItem('name', vals["name"]);
      // await AsyncStorage.getItem('introVidSeen', vals["name"]);
      console.log(forward);
      if (forward) {
        console.log("trying to navigate");
        
      }
      return true;
      
    } catch (error) {
      // Error saving data
    }
  };
  
  let playbackObject;
  // useKeepAwake();

  var _handleVideoRef = component => {
    playbackObject = component;
  }

  var getVideoProgress = progress => {
    console.log("video progress printed here " + progress);
    // console.log(progress);
    if (progress == true) {
      console.log("video seen");
      setVidSeen(true);
      AsyncStorage.setItem("introVidSeen", "true");
    }
  }
  // var pauseVideo = function () {
  //   // playbackObject.pauseAsync();
  // }

  // Analytics.setDebugModeEnabled(true);
  React.useEffect(() => {
    Analytics.setCurrentScreen('LoginScreen');
    navigation.dispatch(state => {
      // Remove the home route from the stack
      const routes = state.routes.filter(r => r.name == 'Login');

      return CommonActions.reset({
        ...state,
        routes,
        index: 0,
      });
    });
    AsyncStorage.setItem("atLogin", "true");

    // console.log(navigation);
    // console.log(route);
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       { name: 'Login' },
    //     ],
    //   })
    // );

    navigation.setOptions({ "headerLeft": null});
    (async() => {
      try {
        const uinf = await AsyncStorage.getItem('userInfo');
        // const introVidSeen = await AsyncStorage.getItem('introVidSeen');
        console.log(uinf);
        if (uinf !== null){
          setUserInfo(JSON.parse(uinf));
        }
        else {
          setUserInfo({"name": "", "age": "", "studentId": ""});
        }
        // if (introVidSeen !== null) {
        //   setVidSeen(JSON.parse(introVidSeen));
        // }
        console.log(userInfo);
        // if (userInfo !== undefined && userInfo !== null) {
        //   setName(userInfo.name);
        //   setAge(userInfo.age)
        //   setStudId(userInfo.studentId);
        // }

        const introVidSeen = await AsyncStorage.getItem('introVidSeen');
        console.log("intro vid seen " + introVidSeen);
        if (introVidSeen !== null) {
          console.log("intro vid seen " + introVidSeen);
          setVidSeen(JSON.parse(introVidSeen));
        }
      } finally {
        setIsReady(true);
      }

      try {
        const introVidSeen = await AsyncStorage.getItem('introVidSeen');
        
      }
      finally {
        // const introVidSeen = await AsyncStorage.getItem('introVidSeen');
        // if (introVidSeen !== null) {
        //   console.log("intro vid seen " + introVidSeen);
        //   setVidSeen(JSON.parse(introVidSeen));
        // }
      }

    })();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <TouchableWithoutFeedback onLongPress={() => {AsyncStorage.setItem("introVidSeen", "false"); setVidSeen(false);}}>
        <Text style={styles.title} >R.E.A.D.Y. to Read</Text>
      </TouchableWithoutFeedback>
        <VideoControl
          height={300}
          uri='https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/Intro%20Final%20V2.mp4?raw=true'
          ref={videoTrack}
          progressHandler={getVideoProgress}
        />
      <Text> {"\n"} </Text>
      <Formik
        initialValues={userInfo}
        enableReinitialize = {true}
        validationSchema={Yup.object({
          name: Yup.string()              
            .required('Required'),
          age: Yup.number()              
            .required('Required'),
          studentId: Yup.mixed()
            .oneOf([1510, 1515, 1610, 1615, 1710, 1715, 1810, 1815, 1910, 1915, 2210, 2215, 2310, 2315, 2410, 2415, 2510, 2515, 2610, 2615,
              "1510", "1515", "1610", "1615", "1710", "1715", "1810", "1815", "1910", "1915", "2210", "2215", "2310", "2315", "2410", "2415", "2510", "2515", "2610", "2615",
              "Admin","admin", "ADMIN","Ready1","ready1", "READY1"], "Not a valid research ID")
            .required('Required')
        })}
        onSubmit={(values, formikActions) => {
          // console.log(values);
          //fvalues = form values object; to add other info for log event
          let fvalues = values;
          fvalues["vidSeen"] = vidSeen;
          Analytics.logEvent("FormSubmit", fvalues);
          if (vidSeen == true) {
            // cons
            Analytics.setUserProperties({
              "researchID": fvalues.studentId, 
              "name": fvalues.name, 
              "age": fvalues.age});
            setTimeout(async() => {
              // pauseVideo();
              console.log(values);
              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
              formikActions.setSubmitting(false);
              await storeData(values, true);
              await AsyncStorage.setItem("atLogin", "false");
              // console.log(videoTrack.video);
              // console.log("here i will navigate");
              navigation.navigate("Welcome", {"user": values});
              // Alert.alert(JSON.stringify(values));
              // AsyncStorage("")
            }, 500);
          }
          else {
            
            Alert.alert("Progress after finishing the introduction video","Watch through the whole video so you're ready to enter the app!", 
             [
              { text: "OK", onPress: () => {console.log("OK Pressed"); formikActions.setSubmitting(false);} }
            ],
            { cancelable: true } );
          }
        }}>
        {props => (
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
          >
          
          <View>
           <TextInput
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur('name')}
              value={props.values.name}
              autoFocus
              placeholder="What's your name?"
              style={styles.input}
              onSubmitEditing={() => {
                // on certain forms, it is nice to move the user's focus
                // to the next input when they press enter.
                // this.ageInput.focus()
              }}
            />
            {props.touched.name && props.errors.name ? (
              <Text style={styles.error}>{props.errors.name}</Text>
            ) : null}

            <TextInput
              onChangeText={props.handleChange('age')}
              onBlur={props.handleBlur('age')}
              value={props.values.age}
              placeholder="What's your child's age?"
              style={styles.input}
              onSubmitEditing={() => {
                // on certain forms, it is nice to move the user's focus
                // to the next input when they press enter.
                // this.idInput.focus()
              }}
              // ref={el => this.ageInput = el}
            />
            {props.touched.age && props.errors.age ? (
              <Text style={styles.error}>{props.errors.age}</Text>
            ) : null}
            
            <TextInput
              onChangeText={props.handleChange('studentId')}
              onBlur={props.handleBlur('studentId')}
              value={props.values.studentId}
              autoFocus
              placeholder="What is your research ID?"
              style={styles.input}
              // ref={el => this.idInput = el}
            />
            {props.touched.studentId && props.errors.studentId ? (
              <Text style={styles.error}>{props.errors.studentId}</Text>
            ) : null}

            <Button
              onPress={props.handleSubmit}
              color="black"
              mode="contained"
              loading={props.isSubmitting}
              disabled={props.isSubmitting}
              style={{ marginVertical: 16, opacity: vidSeen? 1.0: 0.5 }}>
              Submit
            </Button>
            
          </View>
          
          </KeyboardAvoidingView>
        )}
      </Formik>
      
    </View>
    </TouchableWithoutFeedback>
    <View style={{position: 'absolute', bottom: 0}}>
      <Text style={{textAlign: "right", fontSize: 10, padding: 10, opacity: 0.5}}> v2.6 </Text>
    </View>

    </ScrollView>

  );
}

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [screenState, setScreenState] = React.useState();


  // const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        SplashScreen.preventAutoHideAsync();
        console.log("loading font ideally");
        await Expo.Font.loadAsync({
          // Ionicons
          // , Material
          // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        // console.log(savedStateString);
        let state = JSON.parse(savedStateString);
        const uInfo = await AsyncStorage.getItem('userInfo');
        const parseduInfo = JSON.parse(uInfo);
        setUserInfo(parseduInfo);
        if (uInfo === null || state == null) {
          state = "Login";
        }
        else {
          // state = "Welcome";
          console.log("starting state!!");
          // console.log(state);
        }
        // console.log(state);
        setInitialState(state);

      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    if (!isReady) {
      restoreState();
    }


  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // Load any resources or data that we need prior to rendering the app
  /*
  React.useEffect(() => {
    
  }, []);
  */
  return (
    <NavigationContainer
      // initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Speaker"
          component={SpeakerView}
          options={{title: 'Back to Coaching App'}}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{title: 'Menu'}}
        />
        <Stack.Screen
          name="BookList"
          component={BookList}
          options={{title: "Let's Read!"}}
        />
        <Stack.Screen
          name="BookRead"
          component={BookRead}
          options={{title: "Let's Read!"}}
        />
        <Stack.Screen
          name="PageRecorder"
          component={PageRecorder}
          options={{title: 'Record'}}
        />
        <Stack.Screen
          name="pr2"
          component={PR2}
          options={{title: 'Record tester'}}
        />
        <Stack.Screen
          name="VideoList"
          component={VideoList}
          options={{title: 'Videos'}}
        />
        <Stack.Screen
          name="VideoWatch"
          component={VideoWatch}
          options={
            {headerTitleStyle: {textAlign: 'center'}}, 
            ({ route }) => ({ title: route.params.name }) 
          }
        />

        <Stack.Screen
          name="FloppyPage"
          component={FloppyPage}
          options={
            {title: 'Learn to Read With Floppy'}
            
          }
        />

        <Stack.Screen
          name="AllVideoList"
          component={AllVideoList}
          options={
            {title: 'All Videos'}
          }
        />

        <Stack.Screen
          name="HelpfulTips"
          component={HelpfulTips}
          options={
            {title: 'Tips for Getting Started'}
          }
        />

        <Stack.Screen
          name="VideoPage"
          component={VideoPage}
          options={
            {title: 'Watch Video'}
          }
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

