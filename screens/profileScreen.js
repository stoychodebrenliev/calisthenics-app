import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        Alert.alert('Logout failed', error.message);
        return;
    }
}

export default function ProfileScreen() {

    return (
        <View>
            <Text>Profile Screen</Text>
        </View>
    );
}