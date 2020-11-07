import React, {useContext} from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {StoreContext} from '../../stores/storeProvider';

const Search = () => {
  const {searchFilterFunction} = useContext(StoreContext);

  return (
    <TextInput
      onChangeText={(text) => searchFilterFunction(text)}
      style={styles.textInput}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Search;
