import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function ProgressScreen() {
    const [userProgress, setUserProgress] = useState([]);
    const [totalProgressions, setTotalProgressions] = useState(0);
    const [skills, setSkills] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function fetchUserProgress() {
                const { data: { user }, error: userError } =
                    await supabase.auth.getUser();

                if (userError || !user) {
                    console.log('User error:', userError?.message);
                    return;
                }

                const { data, error } = await supabase
                    .from('user_progress')
                    .select('progression_id, completed')
                    .eq('user_id', user.id);

                if (error) {
                    console.log('Progress error:', error.message);
                    return;
                }

                setUserProgress(data);

                const { count, error: countError } = await supabase
                    .from('progressions')
                    .select('*', { count: 'exact', head: true });

                if (countError) {
                    console.log('Count error:', countError.message);
                    return;
                }

                setTotalProgressions(count ?? 0);

                const { data: skillsData, error: skillsError } = await supabase
                    .from('skills')
                    .select('id, name, progressions(id)');

                if (skillsError) {
                    console.log('Skills error:', skillsError.message);
                    return;
                }

                setSkills(skillsData ?? []);

            }

            fetchUserProgress();
        }, [])
    );


    const completedCount = userProgress.filter(
        (item) => item.completed === true
    ).length;

    let totalSkillPercentage = 0;

    skills.forEach((skill) => {
        const progressions = skill.progressions ?? [];

        const completed = progressions.filter((progression) =>
            userProgress.some((item) =>
                item.progression_id === progression.id &&
                item.completed === true
            )
        ).length;

        const percentage = progressions.length > 0
            ? (completed / progressions.length) * 100
            : 0;

        totalSkillPercentage += percentage;
    });

    const progressPercentage = skills.length > 0
        ? Math.round(totalSkillPercentage / skills.length)
        : 0;

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.pageTitle}>
                Your Progress
            </Text>

            <View style={styles.overallCard}>
                <Text style={styles.cardTitle}>
                    Overall Progress
                </Text>

                <Text style={styles.percentage}>
                    {progressPercentage}%
                </Text>

                <Text style={styles.completedText}>
                    {completedCount} Completed Progressions
                </Text>

                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progressPercentage}%` }
                        ]}
                    />
                </View>
            </View>
            <Text style={[styles.cardTitle, { marginTop: 24 }]}>
                Skill Progress
            </Text>

            {skills.map((skill) => {
                const progressions = skill.progressions ?? [];

                const total = progressions.length;

                const completed = progressions.filter((progression) =>
                    userProgress.some(
                        (item) =>
                            item.progression_id === progression.id &&
                            item.completed === true
                    )
                ).length;

                const percentage = total > 0
                    ? Math.round((completed / total) * 100)
                    : 0;

                return (
                    <View key={skill.id} style={styles.skillCard}>
                        <View style={styles.skillHeader}>
                            <Text style={styles.skillName}>
                                {skill.name}
                            </Text>

                            <Text style={styles.skillPercentage}>
                                {percentage}%
                            </Text>
                        </View>

                        <Text style={styles.completedText}>
                            {completed} / {total} Completed
                        </Text>

                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${percentage}%` }
                                ]}
                            />
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',

    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F5F5F5',
        marginBottom: 24,
    },

    overallCard: {
        backgroundColor: '#1F1F1F',
        borderRadius: 16,
        padding: 20,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F5F5F5',
        marginBottom: 16,
    },

    percentage: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#E8C76A',
    },

    completedText: {
        fontSize: 14,
        color: '#A0A0A0',
        marginTop: 4,
    },

    progressBar: {
        height: 10,
        backgroundColor: '#333333',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 12,
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#E8C76A',
        borderRadius: 10,
    },

    skillCard: {
        backgroundColor: '#1F1F1F',
        borderRadius: 16,
        padding: 20,
        marginTop: 12,
    },

    skillHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    skillName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F5F5F5',
    },

    skillPercentage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E8C76A',
    },
})