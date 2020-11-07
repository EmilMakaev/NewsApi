import React, {useState, useRef, useContext} from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {useScrollToTop} from '@react-navigation/native';

import ItemOfFlatList from './itemOfFlatList';
import Search from '../../components/search';
import {StoreContext} from '../../stores/storeProvider';

const CustomFlatList = ({data, search}) => {
  const {toggleSearch} = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef(null);

  useScrollToTop(ref);

  const renderItem = ({item}) => (
    <ItemOfFlatList
      title={item.title}
      image={item.urlToImage}
      description={item.description}
      url={item.url}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {(showSearch || toggleSearch) && <Search />}
      {data.length ? (
        <FlatList
          ref={ref}
          data={toJS(data)}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index + 4,
            index,
          })}
          ItemSeparatorComponent={() => (
            <View style={styles.flatListSeparator} />
          )}
          onScroll={
            search
              ? (e) => {
                  if (e.nativeEvent.contentOffset.y > 30) {
                    setShowSearch(true);
                  } else {
                    setShowSearch(false);
                  }
                }
              : null
          }
          scrollEventThrottle={16}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : (
        <Text>There are not any News!</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListSeparator: {
    marginVertical: 4,
  },
  contentContainerStyle: {
    paddingBottom: 125,
  },
});

export default observer(CustomFlatList);
