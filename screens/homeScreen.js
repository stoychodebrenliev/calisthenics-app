import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {

    const [userName, setUserName] = useState('')
    const [showWelcome, setShowWelcome] = useState(true);
    const [workouts, setWorkouts] = useState([]);

    async function getUser() {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            Alert.alert('Error', error.message);
            return;
        }

        setUserName(data.user?.user_metadata?.username ?? '');

        const { data: workoutData, error: workoutError } = await supabase
            .from('training_logs')
            .select('*')
            .eq('user_id', data.user.id)
            .order('workout_date', { ascending: false });

        if (workoutError) {
            console.log('Workout error:', workoutError.message);
            return;
        }

        setWorkouts(workoutData ?? []);
    }

    useEffect(() => {
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

            <Pressable
                style={styles.addWorkoutButton}
                onPress={() => navigation.navigate('AddWorkout')}
            >
                <Text style={styles.addWorkoutText}>
                    + Add Workout
                </Text>
            </Pressable>

            <Text style={styles.workoutCount}>
                Saved workouts: {workouts.length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 24,
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

    },
    workoutCount: {
        color: '#E8C76A',
        fontSize: 18,
        marginTop: 24,
        marginLeft: 16,
    },

    addWorkoutButton: {
        backgroundColor: '#E8C76A',
        marginHorizontal: 16,
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    addWorkoutText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 16
    }
})