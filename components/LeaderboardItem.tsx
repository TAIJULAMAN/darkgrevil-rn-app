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
            <Text style={styles.rank}>{rank}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.details}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{name}</Text>
                    {isTop && <Crown color="#FBBF24" size={16} fill="#FBBF24" style={styles.crown} />}
                </View>
            </View>
            <Text style={styles.votes}>{votes} votes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 40,
        padding: Spacing.sm,
        paddingRight: Spacing.lg,
        marginBottom: Spacing.md,
    },
    rank: {
        color: Colors.textMuted,
        fontSize: 16,
        width: 30,
        textAlign: 'center',
        marginRight: Spacing.sm,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: Spacing.md,
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
        color: Colors.text,
        fontSize: 14,
        fontWeight: '500',
    },
    crown: {
        marginLeft: 6,
    },
    votes: {
        color: Colors.textMuted,
        fontSize: 12,
    },
});
