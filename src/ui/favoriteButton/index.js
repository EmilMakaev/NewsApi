import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {StoreContext} from '../../stores/storeProvider';

const FavoriteButton = observer(
  ({text = false, BGcolor = '#fff', onPress, url}) => {
    const {checkFavouriteNews} = useContext(StoreContext);

    const status = checkFavouriteNews(url);

    if (!text) {
      if (!status) {
        text = 'add';
        BGcolor = 'green';
      } else {
        text = 'delete';
        BGcolor = 'red';
      }
    }

    return (
      <TouchableOpacity onPress={onPress} style={styles({BGcolor}).button}>
        <Text style={styles({}).text}>{text}</Text>
      </TouchableOpacity>
    );
  },
);

const styles = ({BGcolor}) =>
  StyleSheet.create({
    button: {
      backgroundColor: BGcolor,
      padding: 5,
      width: 60,
      alignItems: 'center',
    },
    text: {
      color: '#fff',
    },
  });

export default FavoriteButton;
