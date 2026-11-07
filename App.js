import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/homeScreen';
import SkillsScreen from './screens/skillsScreen';
import ProgressScreen from './screens/progressScreen';
import ProfileScreen from './screens/profileScreen';
import WelcomeScreen from './screens/welcomeScreen';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

function MainTabs() {
  return (
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
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={appTheme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }} 
          />
      </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}



