
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { ApolloProvider } from '@apollo/client';
import client from './clients/apolloClient';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


 return(
  <ApolloProvider client={client}>
  <NavigationContainer>
    <Tabs/>
  </NavigationContainer>
  </ApolloProvider>
 );
}

const styles = StyleSheet.create({
  
});

export default App;
