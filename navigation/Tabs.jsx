import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../component/HomeScreen';
import Books from '../component/Books';
import Authors from '../component/Authors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,  // Hides text labels
        tabBarStyle: {
          backgroundColor: 'white', // Customize tab bar color
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 60, // Adjust height if needed
        },
      }}>
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Books"
        component={Books}
        options={{
          headerShown: false,
        //   tabBarIcon: ({ color, size }) => (
        //     <FontAwesomeIcon icon={faBook} size={size} color={color} />
        //   ),
        }}
      />

      <Tab.Screen
        name="Authors"
        component={Authors}
        options={{
          headerShown: false,
        //   tabBarIcon: ({ color, size }) => (
        //     <FontAwesomeIcon icon={faUser} size={size} color={color} />
        //   ),
        }}
      />

    </Tab.Navigator>
  );
};

export default Tabs;
