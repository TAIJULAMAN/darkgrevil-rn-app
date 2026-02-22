import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Crown } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface LeaderboardItemProps {
    rank: number;
    name: string;
    image: any;
    votes: string;
}

export default function LeaderboardItem({ rank, name, image, votes }: LeaderboardItemProps) {
    const isTop = rank === 1;
    const imageSource = typeof image === 'string' ? { uri: image } : image;

    return (
        <View style={styles.container}>
            <View style={styles.rankContainer}>
                <Text style={styles.rank}>{rank}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.details}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{name}</Text>
                    {isTop && <Crown color="#FBBF24" size={20} fill="#FBBF24" style={styles.crown} />}
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
        backgroundColor: '#241B35',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    rankContainer: {
        width: 30,
        marginRight: 10,
    },
    rank: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 18,
        fontWeight: '500',
    },
    imageContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginRight: 16,
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
        fontSize: 16,
        fontWeight: '600',
    },
    crown: {
        marginLeft: 8,
    },
    votesContainer: {
        alignItems: 'flex-end',
    },
    votes: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
    },
});
