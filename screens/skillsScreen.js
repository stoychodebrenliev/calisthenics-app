import { View, Text, StyleSheet, Pressable, FlatList, Image, RefreshControl } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function SkillsScreen({ navigation }) {

    const [skills, setSkills] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    async function getSkills() {
        const { data, error } = await supabase
            .from('skills')
            .select('*');

        if (error) {
            console.log(error.message);
            return;
        }

        setSkills(data ?? []);
    }

    useEffect(() => {
        getSkills();
    }, []);

    async function handleRefresh() {
        setRefreshing(true);

        try {
            await getSkills();
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore Skills</Text>
            <Text style={styles.header2}>Choose a skill and start your journey.</Text>

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#E8C76A"
                        colors={['#E8C76A']}
                        progressBackgroundColor="#1F1F1F"
                    />
                }
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
        paddingHorizontal: 18,
        paddingVertical: 14
    },
    header: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 8,
        textAlign: 'center',
    },
    header2: {
        color: '#A0A0A0',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center'
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
