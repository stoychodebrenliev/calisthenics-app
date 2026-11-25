import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function ProgressScreen() {
    const [userProgress, setUserProgress] = useState([]);
    const [totalProgressions, setTotalProgressions] = useState(0);
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

            }

            fetchUserProgress();
        }, [])
    );


    const completedCount = userProgress.filter(
        (item) => item.completed === true
    ).length;

    const progressPercentage = totalProgressions > 0 ? Math.round((completedCount / totalProgressions) * 100) : 0;

    return (
        <View style={styles.container}>
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
                    {completedCount} of {totalProgressions} completed
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
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
})