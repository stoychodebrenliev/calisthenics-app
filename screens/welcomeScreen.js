import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function WelcomeScreen() {


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header1}>CALISTHENICS SKILL COACH</Text>
                <Text style={styles.header2}>Master Your Body</Text>
                <Text style={styles.bodyText}>Welcome to the Calisthenics Skill Coach app! This app is designed to help you track your progress and improve your calisthenics skills. You can view your profile, track your skills, and monitor your progress over time.</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable>
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.buttonText2}>Log In</Text>
                </Pressable>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,

    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E8C76A',
        marginBottom: 30,
        textAlign: 'center',
    },
    header2: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    bodyText: {
        fontSize: 16,
        color: '#ccc',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsContainer: {
        marginTop: 'auto',
        gap: 12,
        marginBottom: 20,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#121212',
        backgroundColor: '#E8C76A',
        width: '100%',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
    },
    buttonText2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E8C76A',
        width: '100%',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: '#E8C76A',
        borderWidth: 1,
    }
});