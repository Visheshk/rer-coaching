import React from 'react';
// import ReactDOM from "react-dom";
import { Formik, useFormik } from 'formik';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { TextInput, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png'; 
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files'; 
import { SplashScreen } from 'expo';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import "./styles.css";
import "./style.css";

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: '',
      studyId: '',
      age: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">What's your name?</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <label htmlFor="studyId">Do you have a study ID?</label>
      <input
        id="studyId"
        name="studyId"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.studyId}
      />
      <label htmlFor="age">How old is your child?</label>
      <input
        id="age"
        name="age"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.age}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// export default Basic;

function LoginScreen( {route, navigation} ) {
  return (

    // SignupForm();
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SignupForm />
    <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>           
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }
      />

      <Button
        title="Create post"
        onPress={() => navigation.navigate('Details')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function DetailsScreen( {route, navigation} ) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const [postText, setPostText] = React.useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <>
        <TextInput
          multiline
          placeholder="What's on your mind?"
          style={{ height: 200, padding: 10, backgroundColor: 'white' }}
          value={postText}
          onChangeText={setPostText}
        />
        <Button
          title="Done"
          onPress={() => {
            // Pass params back to home screen
            navigation.navigate('Home', { post: postText });
          }}
        />
      </>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}   
          initialParams={{ itemId: 42 }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // SplashScreen.preventAutoHide();
  // setTimeout(SplashScreen.hide, 5000);

  // const [selectedImage, setSelectedImage] = React.useState(null);

  // let openImagePickerAsync = async () => {
  //   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (pickerResult.cancelled === true) {
  //     return;
  //   }
  //   if (Platform.OS === 'web') {
  //     let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
  //     setSelectedImage({ localUri: pickerResult.uri, remoteUri });
  //   } else {
  //     setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
  //   } 

  //   console.log(pickerResult);
  // };

  // let openShareDialogAsync = async () => {
  //   if (!(await Sharing.isAvailableAsync())) {
  //     alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
  //     return;
  //   }

  //   Sharing.shareAsync(selectedImage.localUri);
  // };


  // if (selectedImage !== null) {
  //   return (

  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: selectedImage.localUri }}
  //         style={styles.thumbnail}
  //       />
  //       <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
  //         <Text style={styles.buttonText}>Share this photo</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  
  // return (
  //   <View style={styles.container}>
  //     <Image source={logo} style={styles.logo} /> 

  //     <Text style={styles.instructions}> 
  //       To share a photo from your phone with a friend, just press the button below!
  //     </Text>

  //     <TouchableOpacity
  //       onPress={openImagePickerAsync}
  //       style={styles.button}>
  //       <Text style={styles.buttonText}>Pick a photo</Text>
  //     </TouchableOpacity>

  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }, 
});
