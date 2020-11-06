import { AsyncStorage } from 'react-native';

export const updateSeenScreens = async function (key, val) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (e) {console.error(e);}
}