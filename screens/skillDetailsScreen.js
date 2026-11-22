import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function SkillDetailsScreen({ route, navigation }) {

    const { skill } = route.params;
    const [tips, setTips] = useState([]);
    const [progressions, setProgressions] = useState([]);

    useEffect(() => {
        async function fetchTips() {
            const { data, error } = await supabase
                .from('skills_tips')
                .select('*')
                .eq('skill_id', skill.id)
                .order('sort_order', { ascending: true });

            if (error) {
                console.log(error.message);
                return;
            }

            setTips(data);
            console.log('Tips:', data);
        }

        fetchTips();
    }, [skill.id]);

    useEffect(() => {
        async function fetchProgressions() {
            const { data, error } = await supabase
                .from('progressions')
                .select('*')
                .eq('skill_id', skill.id)
                .order('sort_order', { ascending: true });

            if (error) {
                console.log(error.message);
                return;
            }

            setProgressions(data);
        }

        fetchProgressions();
    }, [skill.id]);

    const techniqueTips = tips.filter((tip) => tip.type === 'technique');

    const mistakes = tips.filter((tip) => tip.type === 'mistake');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name='arrow-back'
                        size={24}
                        color='#F5F5F5'
                    />
                </Pressable>

                <Text style={styles.headerTitle}>Skills Overview</Text>

                <Ionicons
                    name='bookmark-outline'
                    size={24}
                    color="#E8C76A"
                    style={{ marginLeft: 'auto', backgroundColor: '#252525', padding: 6, borderRadius: 12 }}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <Image
                    source={{ uri: skill.image_url }}
                    style={styles.skillImage}
                />

                <Text style={styles.skillTitle}>
                    {skill.name}
                </Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                        {skill.description}
                    </Text>
                </View>

                <View style={styles.sectionHeader}>
                    <Ionicons
                        name='bulb-outline'
                        size={24}
                        color='#E8C76A'
                    />
                    <Text style={styles.sectionTitle}>Technique Tips</Text>
                </View>

                {techniqueTips.map((tip) => (
                    <View key={tip.id} style={[styles.tipCard, styles.techniqueCard]}>
                        <Text style={styles.tipTitle}>
                            {tip.title}
                        </Text>

                        <Text style={styles.tipDescription}>
                            {tip.description}
                        </Text>
                    </View>
                ))}

                <View style={styles.sectionHeader}>
                    <Ionicons
                        name="warning-outline"
                        size={22}
                        color="#E8C76A"
                    />
                    <Text style={styles.sectionTitle}>
                        Common Mistakes
                    </Text>
                </View>

                {mistakes.map((tip) => (
                    <View key={tip.id} style={[styles.tipCard, styles.mistakeCard]}>
                        <Text style={styles.tipTitle}>
                            {tip.title}
                        </Text>

                        <Text style={styles.tipDescription}>
                            {tip.description}
                        </Text>
                    </View>
                ))}
                <View style={styles.sectionHeader}>
                    <Ionicons
                        name="git-branch-outline"
                        size={24}
                        color="#E8C76A"
                    />
                    <Text style={styles.sectionTitle}>
                        Your Progressions
                    </Text>
                </View>

                {progressions.map((progression) => (
                    <Pressable key={progression.id} style={styles.progressionCard} onPress={() => navigation.navigate('ProgressionDetails', { progression: progression, skill: skill })}>
                        <View style={styles.progressionNumber}>
                            <Text style={styles.numberText}>
                                {progression.sort_order}
                            </Text>
                        </View>

                        <View style={styles.progressionInfo}>
                            <Text style={styles.tipTitle}>
                                {progression.title}
                            </Text>

                            <Text style={styles.tipDescription}>
                                {progression.description}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>


    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 12,
    },
    skillImage: {
        height: 300,
        width: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 12,
        justifyContent: 'space-between'
    },
    backButton: {
        backgroundColor: '#252525',
        padding: 10,
        borderRadius: 14,
    },

    headerTitle: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 12,
    },
    skillTitle: {
        color: '#F5F5F5',
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 16
    },
    description: {
        color: '#A0A0A0',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 20,
    },
    descriptionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#333',

    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingTop: 12,
        marginBottom: 14,
    },
    sectionTitle: {
        color: '#FFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    tipCard: {
        backgroundColor: '#1F1F1F',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },
    tipTitle: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },

    tipDescription: {
        color: '#A0A0A0',
        fontSize: 14,
        lineHeight: 21,
    },
    techniqueCard: {
        backgroundColor: '#1C3027',
        borderColor: '#365D47',
        borderWidth: 1,
    },
    mistakeCard: {
        backgroundColor: '#352121',
        borderColor: '#674040',
        borderWidth: 1,
    },
    progressionCard: {
        backgroundColor: '#1F1F1F',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    progressionNumber: {
        width: 46,
        height: 46,
        backgroundColor: '#363124',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    numberText: {
        color: '#E8C76A',
        fontSize: 18,
        fontWeight: 'bold',
    },

    progressionInfo: {
        flex: 1,
    },
})