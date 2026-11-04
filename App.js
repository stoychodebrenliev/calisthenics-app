import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import HomeScreen from './screens/homeScreen';
import SkillsScreen from './screens/skillsScreen';
import ProgressScreen from './screens/progressScreen';
import ProfileScreen from './screens/profileScreen';

const Tab = createBottomTabNavigator();

const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#E8C76A',
    background: '#121212',
    card: '#121212',
    text: '#F5F5F5',
    border: '#333333',
  },
};

export default function App() {
  return (
    <>
    <StatusBar style="light" />

    <NavigationContainer theme={appTheme}>
      <Tab.Navigator
          screenOptions={{
            tabBarIcon: () => <View />,
            tabBarIconStyle: { display: 'none' },
            headerShown: false,
            tabBarPosition: 'top',
            tabBarShowIcon: () => null,
            tabBarActiveTintColor: '#E8C76A',
            tabBarInactiveTintColor: '#F5F5F5',
            tabBarStyle: {
              backgroundColor: '#121212',
              borderBottomWidth: 1,
              borderBottomColor: '#333333',
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              textTransform: 'none',
              marginTop: 10
            },
            sceneStyle: {
              backgroundColor: '#121212',
            },
          }}
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Skills" component={SkillsScreen} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}



