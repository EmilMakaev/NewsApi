import React, {createContext} from 'react';
import {action} from 'mobx';
import {useLocalObservable} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/index';

export const StoreContext = createContext();

const StoreProvider = ({children}) => {
  const store = useLocalObservable(() => ({
    news: [],
    favouriteNews: [],
    searchNews: [],
    toggleSearch: false,
    currentRoute: null,
    getNews: async () => {
      try {
        const asyStore = await AsyncStorage.getItem('favouriteNewsAS');
        if (asyStore !== null) {
          const asyData = JSON.parse(asyStore);
          store.setDatafromAsynStore(asyData);
        }
      } catch (e) {
        console.log('e', e);
      }

      if (store.news.length) {
        return;
      }

      api.news.get().then(
        action((res) => {
          store.news.push(...res.articles);
        }),
      );
    },
    setDataAsyncStore: async () => {
      try {
        await AsyncStorage.setItem(
          'favouriteNewsAS',
          JSON.stringify(store.favouriteNews),
        );
      } catch (e) {
        console.log('e', e);
      }
    },
    setDatafromAsynStore: action((data) => {
      store.favouriteNews.push(...data);
    }),
    toggleFavourite: action((id) => {
      const checkItem = store.findElement(store.favouriteNews, id);

      if (checkItem) {
        store.favouriteNews.remove(checkItem);
        store.setDataAsyncStore();
        return;
      }

      const value = store.findElement(store.news, id);
      store.favouriteNews.push(value);
      store.setDataAsyncStore();
    }),
    checkFavouriteNews: (id) => store.findElement(store.favouriteNews, id),
    findElement: (value, id) => value.find((el) => el.url === id),
    getOneNews: action((id) => {
      if (store.currentRoute === 'FAVORITES') {
        return store.findElement(store.favouriteNews, id);
      }

      return store.findElement(store.news, id);
    }),
    searchFilterFunction: action((text) => {
      if (text === '') {
        store.toggleSearch = false;
      } else {
        store.toggleSearch = true;
      }

      const newData = store.favouriteNews.filter((item) => {
        const itemData = `${item.title?.toUpperCase()}
        ${item.description?.toUpperCase()} ${item.content?.toUpperCase()}`;
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      store.searchNews.replace(newData);
    }),
    setCurrentRoute: action((route) => {
      store.currentRoute = route;
    }),
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
