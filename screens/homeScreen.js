import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {

    const [userName, setUserName] = useState('')
    const [showWelcome, setShowWelcome] = useState(true);
    async function getUser() {
        const { data, error } = await supabase.auth.getUser();

        if(error) {
            Alert.alert('Error', error.message);
            return;
        }

        setUserName(data.user?.user_metadata?.username ?? '');

    }

    useEffect (() => {
        getUser();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setShowWelcome(false);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View>
            <Text style={styles.welcomeText}>
                {showWelcome 
                ? `Welcome back, ${userName}!` 
                : 'Your Training Dashboard'}
            </Text>
            <Text style={styles.secondWelcome}>
                Ready to master your next skill?
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize:24,
        fontWeight: 'bold',
        color: '#F5F5F5',
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 12
    },
    secondWelcome: {
        fontSize: 15,
        color: '#ccc',
        paddingLeft: 16,

    }
})