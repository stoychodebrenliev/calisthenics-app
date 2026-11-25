import { View, Text, StyleSheet, Pressable, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function SkillsScreen({ navigation }) {

    const [skills, setSkills] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function getSkills() {

        setErrorMessage('');

        try {
            const { data, error } = await supabase
                .from('skills')
                .select('*');

            if (error) {
                setErrorMessage(error.message)
                return;
            }

            setSkills(data ?? []);

        } catch (error) {
            setErrorMessage(error.message || 'Failed to load skills.');
        } finally {
            setLoading(false)
        }
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

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#E8C76A"
                    style={styles.loadingIndicator}
                />
            )}

            {errorMessage !== '' && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        Failed to load skills. Please try again.
                    </Text>

                    <Pressable onPress={getSkills} style={styles.retryButton}>
                        <Text style={styles.retryText}>Try Again</Text>
                    </Pressable>
                </View>
            )}
            {errorMessage === '' && (
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
            )}
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
    },
    loadingIndicator: {
        marginTop: 30,
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 16,
    },
    errorContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },

    retryButton: {
        backgroundColor: '#E8C76A',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 12,
    },

    retryText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
