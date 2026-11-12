import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable, Modal } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

import HomeScreen from './screens/homeScreen';
import SkillsScreen from './screens/skillsScreen';
import ProgressScreen from './screens/progressScreen';
import ProfileScreen from './screens/profileScreen';
import WelcomeScreen from './screens/welcomeScreen';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import SkillDetailsScreen from './screens/skillDetailsScreen';

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

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        Alert.alert('Logout failed', error.message);
        return;
    }
}

  return (
    <>
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
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setProfileMenuVisible(true);
            },
          }}
        />
      </Tab.Navigator>

      <Modal
        transparent={true}
        visible={profileMenuVisible}
        animationType='fade'
        onRequestClose={() => setProfileMenuVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setProfileMenuVisible(false)}
          />

          <View style={{
            position: 'absolute',
            top: 110,
            right: 10,
            backgroundColor: '#1F1F1F',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColorL: '#383838',

          }}>
            <Text style={{ color: '#F5F5F5' }}>
              My Profile
            </Text>

            <Pressable onPress={handleLogout}>
            <Text style={{ color: '#e65643', marginTop: 15 }}>
              Log Out
            </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    )
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {session ? (
            <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
            />
            <Stack.Screen
              name="SkillDetails"
              component={SkillDetailsScreen} 
            />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
              />

              <Stack.Screen
                name="Login"
                component={LoginScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}



