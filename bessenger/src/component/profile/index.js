import React from 'react';
import {Image, View, Text} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';
import {globalStyle, color} from '../../utility';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default ({img, name, onImgTap, onEditImgTap}) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
        {img ? (
          <Image source={{uri: img}} style={styles.img} resizeMode="cover" />
        ) : (
          <View
            style={[
              globalStyle.sectionCentered,
              styles.img,
              {backgroundColor: Math.floor(Math.random()*16777215).toString(16)},
            ]}>
            <Text style={styles.name}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
        <TouchableOpacity>
          <SimpleLineIcon
            name="pencil"
            size={20}
            onPress={onEditImgTap}
            color={color.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.welcome}>{name}</Text>
  </View>
);
