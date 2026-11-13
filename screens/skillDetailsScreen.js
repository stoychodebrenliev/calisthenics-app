import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabse';
import { useState, useEffect } from 'react';

export default function SkillDetailsScreen({ route, navigation }) {

    const { skill } = route.params;

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
            <View>
                <Image
                    source={{ uri: skill.image_url }}
                    style={styles.skillImage}
                />
            </View>
            <Text style={styles.skillTitle}>
                {skill.name}
            </Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    {skill.description}
                </Text>
            </View>

            <View style={styles.techniqueContainer}>
                <Ionicons
                        name='bulb-outline'
                        size={24}
                        color='#E8C76A'
                    />
                <Text style={styles.header2}>Technique Tips</Text>
            </View>
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
    techniqueContainer: {
        flexDirection: 'row',
        gap: 6,
        paddingTop: 12
    },
    header2: {
        color: '#FFFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
})