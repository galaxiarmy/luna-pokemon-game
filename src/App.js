// App.js
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native'
import {Provider} from 'react-redux';
import CompareScreen from './pages/compare';
import HomeScreen from './pages/home';
import store from './redux/store';
import DetailsPage from './pages/details';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Compare') {
              iconName = 'compare';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          options={{
            headerTitle: 'Poke App - Hanif Pratama Widyanugroho',
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerTitle: 'Poke App - Hanif Pratama Widyanugroho',
          }}
          name="Compare"
          component={CompareScreen}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <AutocompleteDropdownContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Details"
              component={DetailsPage}
              options={{
                headerTitle: 'Poke App - Hanif Pratama Widyanugroho',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AutocompleteDropdownContextProvider>
    </Provider>
  );
};

export default App;
