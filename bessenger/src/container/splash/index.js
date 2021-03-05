import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import {Logo} from '../../component';
import {color, globalStyle} from '../../utility';
import {getAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utility/constants';
import {LOADING_START, LOADING_STOP} from '../../context/actions/type';
import { Store } from '../../context/store';

const Splash = ({navigation}) => {

  const globalState = useContext(Store);
  const {dispatchLoaderAction} = globalState;

  useEffect(() => {
    const redirect = setTimeout(() => {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      getAsyncStorage(keys.uuid)
        .then((uuid) => {
          if (uuid) {
            setUniqueValue(uuid);
            navigation.replace('Dashboard');
          }
          navigation.replace('Login');
        })
        .catch((err) => {
          // alert(err);
          navigation.replace('Login');
        });
    }, 2500);
    return () => {
      clearTimeout(redirect);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    };
  }, [navigation]);

  return (
    <View
      style={[globalStyle.containerCentered, {backgroundColor: color.WHITE}]}>
      <Logo />
    </View>
  );
};

export default Splash;
