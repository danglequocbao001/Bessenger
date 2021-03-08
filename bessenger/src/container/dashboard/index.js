import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, ToastAndroid, SafeAreaView, FlatList, View} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {color, globalStyle} from '../../utility';
import {LogOutUser, UpdateUser} from '../../network';
import {clearAsyncStorage} from '../../asyncStorage';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import firebase from '../../firebase/config';
import {smallDeviceHeight, uid} from '../../utility/constants';
import {Profile, ShowUsers, StickyHeader} from '../../component';
import {Store} from '../../context/store';
import {deviceHeight} from '../../utility/styleHelper/appStyle';

const Dashboard = ({navigation}) => {
  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;
  const [getScrollPosition, setScrollPosition] = useState(0);

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
      let isSubscribed = true;
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
          // dataSnapShot.forEach((child) => {
          //   if (uid === child.val().uid) {
          //     users.push({
          //       uid: child.val().uid,
          //       name: child.val().name + ' (You)',
          //       profileImg: child.val().profileImg,
          //       email: child.val().email,
          //     });
          //   }
          // });
          dataSnapShot.forEach((child) => {
            if (uid === child.val().uid) {
              currentUser.uid = uid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
              currentUser.email = child.val().email;
            } else {
              users.push({
                uid: child.val().uid,
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
    return function cleanup() {
      firebase.database().goOffline();
    };
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
                dispatchLoaderAction({
                  type: LOADING_START,
                });
                let source = response.uri;
                UpdateUser(name.replace(/\s/g, '').toLowerCase(), source)
                  .then(() => {
                    setUserDetail({
                      ...userDetail,
                      profileImg: source,
                    });
                    toastService('Success, your avatar already updated!');
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
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
                dispatchLoaderAction({
                  type: LOADING_START,
                });
                let source = response.uri;
                UpdateUser(name.replace(/\s/g, '').toLowerCase(), source)
                  .then(() => {
                    setUserDetail({
                      ...userDetail,
                      profileImg: source,
                    });
                    toastService('Success, your avatar already updated!');
                    dispatchLoaderAction({
                      type: LOADING_STOP,
                    });
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

  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate('ShowFullImg', {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate('ShowFullImg', {
        name,
        img: profileImg,
      });
    }
  };

  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };

  return (
    <SafeAreaView
      style={[
        globalStyle.flex1,
        {backgroundColor: color.BORDER_LIGHT_GREYCOLOR},
      ]}>
      {getScrollPosition > getOpacity() && (
        <StickyHeader
          name={name}
          img={profileImg}
          onImgTap={() => imgTap(profileImg, name)}
        />
      )}
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        ListHeaderComponent={
          <View
            style={{
              opacity:
                getScrollPosition < getOpacity()
                  ? (getOpacity() - getScrollPosition) / 100
                  : 0,
            }}>
            <Profile
              img={profileImg}
              name={name}
              onEditImgTap={() => editAvatar()}
              onImgTap={() => imgTap(profileImg, name)}
            />
          </View>
        }
        renderItem={({item}) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            email={item.email}
            onImgTap={() => imgTap(item.profileImg, item.name)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
