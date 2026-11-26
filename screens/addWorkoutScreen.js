import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddWorkoutScreen() {

    const [completed, setCompleted] = useState(false);
    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Add Workout
            </Text>
            <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>
                    Workout Completed
                </Text>

                <Switch
                    value={completed}
                    onValueChange={setCompleted}
                    trackColor={{ false: '#555555', true: '#E8C76A' }}
                    thumbColor="#F5F5F5"
                />
            </View>
            <Pressable onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>
                    Choose Date: {workoutDate.toLocaleDateString()}
                </Text>
            </Pressable>

            {showDatePicker && (
                <DateTimePicker
                    value={workoutDate}
                    mode="date"
                    onValueChange={(event, selectedDate) => {
                        setWorkoutDate(selectedDate);
                        setShowDatePicker(false);
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212'
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F5F5F5'
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },

    switchLabel: {
        color: '#F5F5F5',
        fontSize: 16,
    },
    dateText: {
        color: '#E8C76A',
        fontSize: 16,
        marginTop: 24,
    },
})