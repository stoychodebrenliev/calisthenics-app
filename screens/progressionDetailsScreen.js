import { View, Text, Image, StyleSheet, Alert, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressionDetailsScreen({ route }) {
    const { progression, skill } = route.params;
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchProgress() {
            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError || !user) {
                Alert.alert('Error', 'Please log in again.')
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_progress')
                .select('completed')
                .eq('user_id', user.id)
                .eq('progression_id', progression.id)
                .maybeSingle();

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                setCompleted(data?.completed ?? false);
            }

            setLoading(false);
        }

        fetchProgress();
    }, [progression.id]);

    async function handleToggleCompleted() {
        setSaving(true);

        const { data: { user }, error: userError } =
            await supabase.auth.getUser();

        if (userError || !user) {
            Alert.alert('Error', 'Please log in again.');
            setSaving(false);
            return;
        }

        const nextCompleted = !completed;

        const { error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: user.id,
                progression_id: progression.id,
                completed: nextCompleted
            }, {
                onConflict: 'user_id,progression_id'
            });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            setCompleted(nextCompleted);
        }

        setSaving(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {progression.title}
            </Text>

            <Image
                source={{ uri: skill.image_url }}
                style={styles.progressionImage}
            />

            <Pressable
                style={[
                    styles.completeButton,
                    completed && styles.completedButton
                ]}
                onPress={handleToggleCompleted}
                disabled={loading || saving}
            >
                <Text style={[
                    styles.buttonText,
                    completed && styles.completedText
                ]}>
                    {loading ? 'Loading...' :
                        saving ? 'Saving...' :
                            completed ? 'Undo Completion' :
                                'Mark as Completed'}
                </Text>
            </Pressable>
        </SafeAreaView>
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
    completeButton: {
        backgroundColor: '#E8C76A',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },

    completedButton: {
        backgroundColor: '#1C3027',
        borderWidth: 1,
        borderColor: '#365D47',
    },

    buttonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
    },

    completedText: {
        color: '#8BD3A4',
    },

    progressionImage: {
        width: '100%',
        height: 260,
        borderRadius: 12,
        marginTop: 16,
        resizeMode: 'cover',
    }
});