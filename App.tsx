import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Button } from 'react-native-paper';
import { SplashScreen } from 'expo';
import { Audio, Video } from 'expo-av';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { WelcomeScreen } from './components/Welcome';
import { MenuScreen } from './components/Menu';
import { VideoList } from './components/VideoList';
import { VideoWatch } from './components/VideoWatch';
import { BookList } from './components/BookList';
import { BookRead } from './components/BookRead';
import { SpeakerView } from './components/SpeakerView';
import { PageRecorder } from './components/PageRecorder';
import { PR2 } from './components/pr2';

import { styles } from './style';
import { LoginVideo } from './assets/loginvid.mp4';

function LoginScreen ( {route, navigation} ) {
  const [isReady, setIsReady] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [studId, setStudId] = React.useState("");

  var storeData = async (vals, forward=true) => {
    try {
      // console.log(vals);
      await AsyncStorage.setItem('bookPages', JSON.stringify({}));
      await AsyncStorage.setItem('userInfo', JSON.stringify(vals));
      await AsyncStorage.setItem('age', vals["age"]);
      await AsyncStorage.setItem('studentId', vals["studentId"]);
      await AsyncStorage.setItem('name', vals["name"]);
      // console.log(forward);
      // if (forward) {
        // console.log("trying to navigate");
        // navigation.navigate("Welcome", {"user": values});
      // }
    } catch (error) {
      // Error saving data
    }
  };
  let playbackObject;

  var _handleVideoRef = component => {
    playbackObject = component;
  }
  var pauseVideo = function () {
    playbackObject.pauseAsync();
  }

  React.useEffect(() => {
    (async() => {
      try {
        const uinf = await AsyncStorage.getItem('userInfo');
        console.log(uinf);
        if (uinf !== null){
          setUserInfo(JSON.parse(uinf));
        }
        else {
          setUserInfo({"name": "", "age": "", "studentId": ""});
        }
        console.log(userInfo);
        // if (userInfo !== undefined && userInfo !== null) {
        //   setName(userInfo.name);
        //   setAge(userInfo.age)
        //   setStudId(userInfo.studentId);
        // }
      } finally {
        setIsReady(true);
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
      <Text style={styles.title}>R.E.A.D.Y. to Read  v1.2</Text>
      
      <Video
        source={{ uri: 'http://18.215.149.31/wp-content/uploads/2020/05/loginvid.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls={true}
        shouldPlay={false}
        isLooping={false}
        style={{ height: 300 }}
        ref={_handleVideoRef}
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
          studentId: Yup.string()              
            .required('Required')
        })}
        onSubmit={(values, formikActions) => {
          // console.log(values);
          setTimeout(() => {
            
            pauseVideo();
            console.log(values);
            // Important: Make sure to setSubmitting to false so our loading indicator
            // goes away.
            formikActions.setSubmitting(false);
            storeData(values, true);
            // Alert.alert(JSON.stringify(values));
            setTimeout(() => {
              navigation.navigate("Welcome", {"user": values});  
            }, 200);
            
            
          }, 500);
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
              style={{ marginVertical: 16 }}>
              Submit
            </Button>
            
          </View>
          
          </KeyboardAvoidingView>
        )}
      </Formik>
      
    </View>
    </TouchableWithoutFeedback>

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
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        console.log(savedStateString);
        const state = JSON.parse(savedStateString);
        const uInfo = await AsyncStorage.getItem('userInfo');
        const parseduInfo = JSON.parse(uInfo);
        setUserInfo(parseduInfo);
        // if (uInfo === null || state == null) {
        //   state = "Login";
        // }
        console.log(state);
        setInitialState(state);

      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  /*
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());
        // userInfo = {};
        await AsyncStorage.getItem('userInfo').then(value => {
          console.log(value);
          setUserInfo(value);
        });
        await AsyncStorage.getItem('currentScreen').then(value => {
          console.log(value);
          setUserInfo(value);
        })
        // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        console.log(userInfo);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  */

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Welcome'}}
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

      </Stack.Navigator>
    </NavigationContainer>
  )
}

