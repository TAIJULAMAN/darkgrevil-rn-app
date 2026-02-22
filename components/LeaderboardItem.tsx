import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Crown } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface LeaderboardItemProps {
    rank: number;
    name: string;
    image: string;
    votes: string;
}

export default function LeaderboardItem({ rank, name, image, votes }: LeaderboardItemProps) {
    const isTop = rank === 1;

    return (
        <View style={styles.container}>
            <View style={styles.rankContainer}>
                <Text style={styles.rank}>{rank}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={typeof image === 'number' ? image : { uri: image }}
                    style={styles.image}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{name}</Text>
                    {isTop && <Crown color="#FBBF24" size={24} fill="#FBBF24" style={styles.crown} />}
                </View>
            </View>
            <View style={styles.votesContainer}>
                <Text style={styles.votes}>{votes} votes</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 25, 45, 0.9)', // Deep purple/navy background
        borderRadius: 60,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    rankContainer: {
        width: 30,
        marginRight: Spacing.md,
    },
    rank: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 22,
        fontWeight: '500',
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        marginRight: Spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    crown: {
        marginLeft: Spacing.sm,
    },
    votesContainer: {
        alignItems: 'flex-end',
    },
    votes: {
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 14,
        fontWeight: '500',
    },
});
