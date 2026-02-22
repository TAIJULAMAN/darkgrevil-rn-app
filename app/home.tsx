import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart2 } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { CHARACTERS } from '../constants/MockData';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const router = useRouter();

    const handleVote = () => {
        if (selectedId) {
            router.push('/vote');
        }
    };

    const renderCharacter = ({ item }: { item: typeof CHARACTERS[0] }) => {
        const isSelected = selectedId === item.id;
        return (
            <TouchableOpacity
                style={[styles.charCard, isSelected && styles.selectedCharCard]}
                onPress={() => {
                    if (isSelected) {
                        router.push({
                            pathname: '/watch',
                            params: { id: item.id }
                        });
                    } else {
                        setSelectedId(item.id);
                    }
                }}
                activeOpacity={0.8}
            >
                <View style={styles.charImageContainer}>
                    <Image source={item.image} style={styles.charImage} />
                </View>
                <Text style={[styles.charName, isSelected && styles.selectedCharName]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>Hey, Abdul 👋</Text>
                        <Text style={styles.subGreeting}>Ready to choose your favorite?</Text>
                    </View>
                </View>

                {/* Character Grid */}
                <View style={styles.gridContainer}>
                    {CHARACTERS.map((char) => (
                        <View key={char.id} style={styles.gridItem}>
                            {renderCharacter({ item: char })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Footer Actions */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.voteButton, !selectedId && styles.disabledVoteButton]}
                    onPress={handleVote}
                    disabled={!selectedId}
                >
                    <Text style={styles.voteButtonText}>Vote Now</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resultsLink}
                    onPress={() => router.push('/results')}
                >
                    <BarChart2 color={Colors.primary} size={20} />
                    <Text style={styles.resultsLinkText}>View Live Results</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        marginTop: Spacing.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerText: {
        marginLeft: Spacing.md,
    },
    greeting: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subGreeting: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: Spacing.md,
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: Spacing.md,
    },
    charCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 80,
        padding: Spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    selectedCharCard: {
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
    },
    charImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: Spacing.sm,
    },
    charImage: {
        width: '100%',
        height: '100%',
    },
    charName: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    selectedCharName: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.lg,
        paddingBottom: 40,
        backgroundColor: '#000000',
        alignItems: 'center',
    },
    voteButton: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    disabledVoteButton: {
        backgroundColor: '#333',
        shadowOpacity: 0,
    },
    voteButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
    },
    resultsLinkText: {
        color: Colors.primary,
        marginLeft: Spacing.sm,
        fontSize: 16,
        fontWeight: '500',
    }
});
