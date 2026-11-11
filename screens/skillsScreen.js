import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';


const skills = [
    { id: '1', name: 'Handstand' },
    { id: '2', name: 'Pull-up' },
    { id: '3', name: 'L-Sit' },
    { id: '4', name: 'Muscle-up' }
];

export default function SkillsScreen() {
    return (
        <View style={styles.container}>
            <Text>Skills Screen</Text>

            <FlatList
                data={skills}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.skillCard}
                        onPress={() => console.log(item.name)}
                    >
                        <View style={styles.skillFooter}>
                            <Text style={styles.skillName}>{item.name}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    skillCard: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#1F1F1F',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
    },
    skillName: {
        color: '#F5F5F5',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    skillFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
},
})
