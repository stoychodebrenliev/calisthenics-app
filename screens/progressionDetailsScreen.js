import { View, Text, StyleSheet } from 'react-native';

export default function ProgressionDetailsScreen({ route }) {
    const { progression } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {progression.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        color: '#F5F5F5',
        fontSize: 24,
        fontWeight: 'bold',
    },
});