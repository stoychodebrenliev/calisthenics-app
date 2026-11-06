import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable 
                    style= {styles.arrowBack} 
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
                />

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    placeholderTextColor="#AAAA" 
                />

                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Password" 
                    placeholderTextColor="#AAAA" 
                    secureTextEntry 
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm Password" 
                    placeholderTextColor="#AAAA" 
                    secureTextEntry 
                />

            </View>

        <Pressable style={styles.button}>
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


})