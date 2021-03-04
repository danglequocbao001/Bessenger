import React, {useLayoutEffect} from 'react';
import {View, Text, Alert, ToastAndroid} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {color} from '../../utility';
import {LogOutUser} from '../../network';
import {clearAsyncStorage} from '../../asyncStorage';

const Dashboard = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcon
          name="logout"
          size={26}
          color={color.WHITE}
          style={{right: 10}}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure to log out?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    logout();
                  },
                },
                {
                  text: 'No',
                },
              ],
              {
                cancelable: false,
              },
            )
          }
        />
      ),
    });
  }, [navigation]);

  const logout = () => {
    LogOutUser()
      .then(() => {
        clearAsyncStorage()
          .then(() => {
            navigation.replace('Login');
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
    ToastAndroid.showWithGravity(
      'Logged out',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
