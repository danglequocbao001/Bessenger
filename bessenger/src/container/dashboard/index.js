import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, ToastAndroid, SafeAreaView, FlatList} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {color, globalStyle} from '../../utility';
import {LogOutUser, UpdateUser} from '../../network';
import {clearAsyncStorage} from '../../asyncStorage';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import firebase from '../../firebase/config';
import {uuid} from '../../utility/constants';
import {Profile, ShowUsers} from '../../component';
import {Store} from '../../context/store';

const Dashboard = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
    email: '',
  });

  const {name, profileImg} = userDetail;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // dispatchLoaderAction({
    //   type: LOADING_START,
    // });
    try {
      firebase
        .database()
        .ref('users')
        .on('value', (dataSnapShot) => {
          dispatchLoaderAction({
            type: LOADING_START,
          });
          let users = [];
          let currentUser = {
            id: '',
            name: '',
            profileImg: '',
            email: '',
          };
          dataSnapShot.forEach((child) => {
            if (uuid === child.val().uuid) {
              users.push({
                uuid: child.val().uuid,
                name: child.val().name + ' (You)',
                profileImg: child.val().profileImg,
                email: child.val().email,
              });
            }
          });
          dataSnapShot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.uuid = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
              currentUser.email = child.val().email;
            } else {
              users.push({
                uuid: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
                email: child.val().email,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (err) {
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
      alert(err);
    }
  }, []);

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
                cancelable: true,
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
    toastService('Logged out');
  };

  const toastService = (messeage) => {
    ToastAndroid.showWithGravity(
      messeage,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const editAvatar = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },
    };

    Alert.alert(
      'Choose option',
      'You want to pick image from library or camera?',
      [
        {
          text: 'Library',
          onPress: () => {
            launchImageLibrary(option, (response) => {
              if (response.didCancel) {
                toastService('Canceled');
              } else if (response.errorCode) {
                toastService('Error, try again!');
              } else {
                let source = response.uri;
                dispatchLoaderAction({
                  type: LOADING_START,
                });
                UpdateUser(uuid, source)
                  .then(() => {
                    setUserDetail({
                      ...userDetail,
                      profileImg: source,
                    });
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
                    toastService('Success, your avatar already updated!');
                  })
                  .catch(() => {
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
                    toastService(err);
                  });
              }
            });
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(option, (response) => {
              if (response.didCancel) {
                toastService('Canceled');
              } else if (response.errorCode) {
                toastService('Error, try again!');
              } else {
                let source = response.uri;
                dispatchLoaderAction({
                  type: LOADING_START,
                });
                UpdateUser(uuid, source)
                  .then(() => {
                    setUserDetail({
                      ...userDetail,
                      profileImg: source,
                    });
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
                    toastService('Success, your avatar already updated!');
                  })
                  .catch(() => {
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
                    toastService(err);
                  });
              }
            });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.WHITE}]}>
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <Profile
            img={profileImg}
            name={name}
            onEditImgTap={() => editAvatar()}
          />
        }
        renderItem={({item}) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            email={item.email}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
