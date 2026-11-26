import { View, Text, StyleSheet } from 'react-native';

export default function AddWorkoutScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Add Workout
            </Text>
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
})