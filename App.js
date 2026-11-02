import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Pressable>
          <Text style={styles.navbarTextActive}>Home</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.navbarTextInactive}>Skills</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.navbarTextInactive}>Progress</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.navbarTextInactive}>Profile</Text>
        </Pressable>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#121212',
    alignItems: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 15,
  },

  navbarTextInactive: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },

  navbarTextActive: {
    color: '#F4D35E',
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#F4D35E',
    paddingBottom: 5,
  }

});

