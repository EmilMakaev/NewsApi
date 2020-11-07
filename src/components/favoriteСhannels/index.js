import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {observer} from 'mobx-react';

import {StoreContext} from '../../stores/storeProvider';
import CustomFlatList from '../../ui/flatList';

const FavoriteСhannels = () => {
  const {favouriteNews, searchNews, toggleSearch} = useContext(StoreContext);

  const data = toggleSearch ? searchNews : favouriteNews;

  return (
    <SafeAreaView>
      <CustomFlatList data={data} search />
    </SafeAreaView>
  );
};

export default observer(FavoriteСhannels);
