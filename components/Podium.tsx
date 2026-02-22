import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { Crown } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface PodiumProps {
    topThree: Array<{
        id: string;
        name: string;
        image: any;
        votes: string;
    }>;
}

export default function Podium({ topThree }: PodiumProps) {
    if (topThree.length < 3) return null;

    const [rank1, rank2, rank3] = [topThree[0], topThree[1], topThree[2]];

    const PodiumItem = ({ data, rank, size }: { data: any, rank: number, size: number }) => {
        const isFirst = rank === 1;
        const color = isFirst ? '#FBBF24' : rank === 2 ? '#E5E7EB' : '#D97706';

        return (
            <View style={[styles.podiumItem, { marginTop: isFirst ? 0 : 40 }]}>
                <View style={[styles.imageContainer, { width: size, height: size, borderRadius: size / 2, borderColor: color }]}>
                    <Image source={data.image} style={styles.image} />
                    <View style={[styles.rankBadge, { backgroundColor: color }]}>
                        <Text style={styles.rankText}>{rank}</Text>
                    </View>
                    {isFirst && (
                        <View style={styles.crownContainer}>
                            <Crown color={color} size={28} fill={color} />
                        </View>
                    )}
                </View>
                <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
                <Text style={styles.votes}>{data.votes}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <PodiumItem data={rank2} rank={2} size={80} />
            <PodiumItem data={rank1} rank={1} size={110} />
            <PodiumItem data={rank3} rank={3} size={70} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: Spacing.sm,
    },
    imageContainer: {
        borderWidth: 3,
        padding: 4,
        position: 'relative',
        backgroundColor: Colors.surface,
        overflow: 'visible',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    rankBadge: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        color: Colors.background,
        fontSize: 12,
        fontWeight: 'bold',
    },
    crownContainer: {
        position: 'absolute',
        top: -25,
        alignSelf: 'center',
    },
    name: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginTop: Spacing.md,
        width: 80,
        textAlign: 'center',
    },
    votes: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
});
