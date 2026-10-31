import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart2, Check } from 'lucide-react-native';
import { Colors, Spacing } from '../constants/Theme';
import { CHARACTERS } from '../constants/MockData';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useVoteStatus, MAX_VOTES } from '../utils/voteStorage';

export const metadata = {
    title: 'Home',
    description: 'Explore personalities and choose your favorite on Dark Grevil',
    author: 'Khaled Alghanim',
};

export default function HomeScreen() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const router = useRouter();
    const { votedIds, remainingVotes, hasReachedLimit } = useVoteStatus();

    const handleVote = () => {
        if (selectedId) {
            router.push({
                pathname: '/vote',
                params: { id: selectedId }
            });
        }
    };

    const renderCharacter = ({ item }: { item: typeof CHARACTERS[0] }) => {
        const isSelected = selectedId === item.id;
        const isVoted = votedIds.includes(item.id);
        return (
            <TouchableOpacity
                style={[
                    styles.charCard,
                    isSelected && styles.selectedCharCard,
                    isVoted && styles.votedCharCard,
                ]}
                onPress={() => {
                    setSelectedId(item.id);
                    router.push({
                        pathname: '/watch',
                        params: { id: item.id }
                    });
                }}
                activeOpacity={0.8}
            >
                {/* Checkmark in card top-right */}
                {isVoted && (
                    <View style={styles.cardVotedBadge}>
                        <Check color="#9CA3AF" size={12} />
                    </View>
                )}
                <View style={styles.charImageContainer}>
                    <Image source={item.image} style={styles.charImage} />
                </View>
                <Text style={[styles.charName, isSelected && styles.selectedCharName, isVoted && styles.votedCharName]}>
                    {item.name}
                </Text>
                {isVoted && <Text style={styles.votedTag}>Voted</Text>}
            </TouchableOpacity>
        );
    };

    const isSelectedVoted = selectedId ? votedIds.includes(selectedId) : false;
    const isVoteDisabled = !selectedId || isSelectedVoted || hasReachedLimit;

    return (
        <SafeAreaView style={styles.container}>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="author" content={metadata.author} />
            </Head>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/avatar.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>Hello, Khaled 👋</Text>
                        <Text style={styles.subGreeting}>
                            {hasReachedLimit
                                ? `You've used all ${MAX_VOTES} votes`
                                : `${remainingVotes} of ${MAX_VOTES} votes remaining`}
                        </Text>
                    </View>
                </View>

                {/* Characters */}
                <View style={styles.gridContainer}>
                    {CHARACTERS.map((char) => (
                        <View key={char.id} style={styles.gridItem}>
                            {renderCharacter({ item: char })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.voteButton, isVoteDisabled && styles.disabledVoteButton]}
                    onPress={handleVote}
                    disabled={isVoteDisabled}
                >
                    <Text style={[styles.voteButtonText, isVoteDisabled && styles.disabledVoteButtonText]}>
                        {isSelectedVoted
                            ? 'Already Voted'
                            : hasReachedLimit
                            ? 'All Votes Cast'
                            : 'Vote Now'}
                    </Text>
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
        borderRadius: 40,
        padding: Spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        position: 'relative',
    },
    selectedCharCard: {
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
    },
    votedCharCard: {
        opacity: 0.65,
    },
    cardVotedBadge: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#374151',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        zIndex: 2,
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
    votedCharName: {
        color: '#9CA3AF',
    },
    votedTag: {
        color: '#9CA3AF',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
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
        backgroundColor: '#374151',
        shadowOpacity: 0,
        elevation: 0,
    },
    voteButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledVoteButtonText: {
        color: '#9CA3AF',
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
