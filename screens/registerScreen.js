import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DissmissKeyboard from '../components/DismissKeyboard';
import { useState } from 'react';

export default function RegisterScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleRegister() {
        if(!username.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if(password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long.')
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email.trim())) {
            Alert.alert('Error', 'Please enter a valid email adress.')
        }

        if(password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!')
        }

    }

    return (
        <DissmissKeyboard>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
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

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Start your journey today!</Text>
                </View>
                <View style={styles.inputGroup}>

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#AAAA"
                        value={username}
                        onChangeText={setUsername}
                    />

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
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#FFF"
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>


                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="#AAAA"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons
                                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#FFF"
                            />
                        </Pressable>
                    </View>

                </View>

                <Pressable 
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>

                <Text style={styles.footerText}>If you already have an account?{'  '}
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Sign in
                    </Text>
                </Text>

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

    header: {
        marginTop: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#AAAA',
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