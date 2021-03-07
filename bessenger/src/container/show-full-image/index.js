import React, {useLayoutEffect, Fragment} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {globalStyle, color} from '../../utility';

export default ({route, navigation}) => {
  const {params} = route;
  const {name, img, imgText} = params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name}</Text>,
    });
  }, [navigation]);
  return (
    <Fragment>
      {img ? (
        <Image
          source={{uri: img, cache: 'only-if-cached'}}
          style={[globalStyle.flex1]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            globalStyle.containerCentered,
            {
              backgroundColor:
                '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
          ]}>
          <Text style={styles.text}>{imgText}</Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  text: {color: color.WHITE, fontSize: 200, fontWeight: 'bold'},
});
