import React from 'react';
import {Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import AllChannelsScreen from '../screens/allChannelsScreen';
import FavoriteСhannelsScreen from '../screens/favoriteСhannelsScreen';
import SingleNewsScreen from '../screens/singleNewsScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="All" component={AllChannelsScreen} />
    <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
  </Stack.Navigator>
);

export const FavoriteStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavoriteСhannelsScreen}
      options={{
        headerRight: () => (
          <Button
            onPress={() => Alert.alert('Just an example')}
            title="News"
            color="#000"
          />
        ),
      }}
    />
    <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
  </Stack.Navigator>
);
