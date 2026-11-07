import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DissmissKeyboard from '../components/DismissKeyboard';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin() {

    if (!email.trim() || !password) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
    });

    if (error) {
        if (error.code === 'invalid_credentials') {
            Alert.alert('Login failed', 'Incorrect email or password.');
        } else {
            Alert.alert('Login failed', error.message);
        }
        return;
    }

    navigation.replace('MainTabs');
}
    
    return (
        <DissmissKeyboard>
            <SafeAreaView style={styles.container}>
                <Pressable
                    style={styles.arrowBack}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back-outline"
                        size={20}
                        color="#E8C76A"
                    />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
                <View style={styles.content}>
                    <View style={styles.header}>

                        <Text style={styles.title}>Log In To Your Account</Text>
                    </View>
                    <View style={styles.inputGroup}>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#AAAA"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordContainer}>

                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#AAAA"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={22}
                                    color="#FFF"
                                />
                            </Pressable>
                        </View>

                    </View>

                    <Pressable 
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Log in</Text>
                    </Pressable>

                    <Text style={styles.footerText}> Don't have an account?{'  '}
                        <Text
                            style={styles.link}
                            onPress={() => navigation.navigate('Register')}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </SafeAreaView>
        </DissmissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        paddingTop: 40,
    },
    content: {
        flex: 1,
        paddingTop: 100,
    },

    header: {
        marginTop: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    arrowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
        color: '#E8C76A',
    },
    backText: {
        color: '#E8C76A',
        fontSize: 16,
    },

    inputGroup: {
        gap: 8,
    },

    label: {
        color: '#F5F5F5',
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#1F1F1F',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#383838',
        color: '#F5F5F5',
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#E8C76A',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
    },

    footerText: {
        color: '#AAAA',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },

    link: {
        color: '#E8C76A',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        borderWidth: 1,
        borderColor: '#383838',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 15,
    },

    passwordInput: {
        flex: 1,
        color: '#F5F5F5',
        fontSize: 16,
    },


})