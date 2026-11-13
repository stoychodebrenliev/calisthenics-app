import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function SkillsScreen({ navigation }) {

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function getSkills() {
            const { data, error } = await supabase
                .from('skills')
                .select('*');
            
            if(error) {
                console.log(error.message);
                return;
            }

            setSkills(data);
        }

        getSkills();
    }, []);

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
                        onPress={() => navigation.navigate('SkillDetails', { skill: item })}
                    >
                        <Image
                            source={{ uri: item.image_url }}
                            style={styles.skillImage}
                        />
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
        width: '100%',
        height: '20%',
        borderTopWidth: 1,
        borderTopColor: '#383838',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
        objectFit: 'scal'
    }
})
