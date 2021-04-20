import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left, Body, Thumbnail} from 'native-base';
import styles from './styles';
import {color} from '../../utility';
const ShowUsers = ({name, img, onImgTap, onNameTap, email, uid}) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderColor: color.SILVER,
              borderWidth: 2,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                '#' + Math.floor(Math.random() * 16777215).toString(16),
            }}
            onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{uri: img}} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>

          <Body>
            <Text style={styles.profileName} onPress={onNameTap}>
              {name}
            </Text>
            <Text style={styles.profileEmail} onPress={onNameTap}>
              {email}
            </Text>
            <Text style={styles.profileEmail}>{uid}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ShowUsers;
