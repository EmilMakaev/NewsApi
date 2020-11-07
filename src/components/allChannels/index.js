import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {StoreContext} from '../../stores/storeProvider';
import CustomFlatList from '../../ui/flatList';

const AllChannels = () => {
  const {news, getNews} = useContext(StoreContext);

  useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <SafeAreaView>
      <CustomFlatList data={news} />
    </SafeAreaView>
  );
};

export default AllChannels;
