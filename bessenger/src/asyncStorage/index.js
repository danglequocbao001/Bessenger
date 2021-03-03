import AsyncStorage from '@react-native-async-storage/async-storage'

export const keys = {
   uuid: 'uuid',
}

const setAsyncStorage = async (key, item) => {
   try {
      await AsyncStorage.setItem(key, item)
   } catch (err) {
      console.log(err)
   }
}

const getAsyncStorage = async (key) => {
   try {
      const value = await AsyncStorage.getItem(key);
      if(value) {
         return value
      } else {
         return null
      }
   } catch (err) {
      console.log(err);
      return null
   }
}

const clearAsyncStorage = async () => {
   try {
      await AsyncStorage.clear()
   } catch(err) {
      console.log(err)
   }
}

export {setAsyncStorage, getAsyncStorage, clearAsyncStorage}