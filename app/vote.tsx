import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import CharacterCard from '../components/CharacterCard';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { CHARACTERS } from '../constants/MockData';
import { useVoteStatus, castVote, MAX_VOTES } from '../utils/voteStorage';

export const metadata = {
    title: 'Vote | Dark Grevil',
    description: 'Cast your vote for your favorite candidate on Dark Grevil',
    author: 'Khaled Alghanim',
};

export default function VoteScreen() {
    const { id: paramId } = useLocalSearchParams<{ id?: string }>();
    const { votedIds, remainingVotes, hasReachedLimit } = useVoteStatus();

    const [selectedId, setSelectedId] = useState<string | null>(paramId || '1');
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (paramId) {
            setSelectedId(paramId);
            if (!votedIds.includes(paramId) && remainingVotes > 0) {
                setIsSheetVisible(true);
            }
        }
    }, [paramId, votedIds, remainingVotes]);

    const handleSelect = (id: string) => {
        if (votedIds.includes(id)) {
            Alert.alert('Already Voted', 'You have already voted for this personality.');
            return;
        }
        if (hasReachedLimit) {
            Alert.alert('Vote Limit Reached', `You have already used all ${MAX_VOTES} votes.`);
            return;
        }
        setSelectedId(id);
        setIsSheetVisible(true);
    };

    const selectedCharacter = CHARACTERS.find(c => c.id === selectedId);

    const closeSheet = () => setIsSheetVisible(false);

    const handleConfirmVote = async () => {
        if (selectedCharacter) {
            await castVote(selectedCharacter.id);
        }
        closeSheet();
        router.push('/results');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="author" content={metadata.author} />
            </Head>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ChevronLeft color={Colors.textSecondary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={Typography.h2}>Choose your favorite</Text>
                    <Text style={Typography.caption}>
                        {hasReachedLimit
                            ? `You have used all ${MAX_VOTES} votes`
                            : `You have ${remainingVotes} of ${MAX_VOTES} votes remaining`}
                    </Text>
                </View>
            </View>

            <FlatList
                data={CHARACTERS}
                renderItem={({ item }) => (
                    <CharacterCard
                        name={item.name}
                        image={item.image}
                        isSelected={selectedId === item.id}
                        isVoted={votedIds.includes(item.id)}
                        onPress={() => handleSelect(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Voting Confirmation */}
            <Modal
                visible={isSheetVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeSheet}
            >
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPress={closeSheet}
                >
                    <View style={styles.modalOverlay} />
                </TouchableOpacity>

                <View style={styles.sheetContainer}>
                    {selectedCharacter && (
                        <View style={styles.contentContainer}>
                            <View style={styles.sheetHeader}>
                                <Image
                                    source={selectedCharacter.image}
                                    style={styles.sheetImage}
                                />
                            </View>
                            <Text style={styles.sheetTitle}>Vote for {selectedCharacter.name}</Text>
                            <Text style={styles.sheetSubtitle}>
                                This will use 1 of your {remainingVotes} remaining votes.
                            </Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.cancelButton]}
                                    onPress={closeSheet}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.confirmButton]}
                                    onPress={handleConfirmVote}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm Vote</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    headerTextContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.xl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalOverlay: {
        flex: 1,
    },
    sheetContainer: {
        backgroundColor: '#18181b',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
        paddingBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    contentContainer: {
        alignItems: 'center',
    },
    sheetHeader: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sheetImage: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    sheetTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    sheetSubtitle: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        width: '100%',
    },
    sheetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    confirmButton: {
        backgroundColor: Colors.primary,
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
