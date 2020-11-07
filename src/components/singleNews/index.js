import React, {useContext} from 'react';
import {Text, SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {StoreContext} from '../../stores/storeProvider';

const SingleNews = () => {
  const {getOneNews} = useContext(StoreContext);
  const {params} = useRoute();

  const news = getOneNews(params?.id);
  const {urlToImage, title, description} = news;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!!urlToImage && (
          <Image
            style={styles.image}
            source={{
              uri: urlToImage,
            }}
          />
        )}
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    width: '98%',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SingleNews;
