import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Button } from 'react-native-paper';
import { SplashScreen } from 'expo';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { WelcomeScreen } from './components/Welcome';
import { styles } from './style';

function LoginScreen ( {route, navigation} ) {
  var storeData = async (vals) => {
    try {
      // console.log(vals);
      await AsyncStorage.setItem('userInfo', JSON.stringify(vals));
      await AsyncStorage.setItem('age', vals["age"]);
      await AsyncStorage.setItem('studentId', vals["studentId"]);
      await AsyncStorage.setItem('name', vals["name"]);
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>READY to Read</Text>
      <Formik
        initialValues={{ name: '', age: '', studentId: '' }}
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
            Alert.alert(JSON.stringify(values));
            console.log(values);
            // Important: Make sure to setSubmitting to false so our loading indicator
            // goes away.
            formikActions.setSubmitting(false);
            navigation.navigate("Welcome", {"user": values});
            storeData(values);
          }, 500);
        }}>
        {props => (
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
                this.ageInput.focus()
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
                this.idInput.focus()
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
              style={{ marginTop: 16 }}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </View>
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
        const state = JSON.parse(savedStateString);
        setUserInfo(await AsyncStorage.getItem('userInfo'));

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

      </Stack.Navigator>
    </NavigationContainer>
  )
}

