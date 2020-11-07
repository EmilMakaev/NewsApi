import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StackNavigator, FavoriteStackNavigator} from './stackNavigator';
import {StoreContext} from '../stores/storeProvider';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const {setCurrentRoute} = useContext(StoreContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ALL"
          component={StackNavigator}
          listeners={{
            tabPress: () => {
              setCurrentRoute('ALL');
            },
          }}
        />
        <Tab.Screen
          name="FAVORITES"
          component={FavoriteStackNavigator}
          listeners={{
            tabPress: () => {
              setCurrentRoute('FAVORITES');
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
