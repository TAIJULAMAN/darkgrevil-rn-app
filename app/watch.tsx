import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, Play, Cast, Clock, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { useRouter } from 'expo-router';

export default function WatchEpisodeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <Home color={Colors.text} size={24} />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={Typography.h2}>Watch Episode</Text>
                        <Text style={Typography.caption}>Watch the full episode</Text>
                    </View>
                </View>

                {/* Video Player Placeholder */}
                <View style={styles.videoContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.thumbnail}
                    />
                    <View style={styles.overlay}>
                        <TouchableOpacity style={styles.castButton}>
                            <Cast color={Colors.text} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButton}>
                            <Play color={Colors.text} size={32} fill={Colors.text} />
                        </TouchableOpacity>
                        <View style={styles.progressBarContainer}>
                            <View style={styles.timeLabels}>
                                <Text style={styles.timeText}>12:34</Text>
                                <Text style={styles.timeText}>20:00</Text>
                            </View>
                            <View style={styles.progressBarTrack}>
                                <View style={[styles.progressBarFill, { width: '60%' }]} />
                                <View style={[styles.progressBarKnob, { left: '60%' }]} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={Typography.h1}>Great Episode of the Winners</Text>

                    <View style={styles.badgeRow}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>SEASON FINALE</Text>
                        </View>
                        <View style={styles.metaInfo}>
                            <Clock color={Colors.textMuted} size={16} />
                            <Text style={styles.metaText}>20 min</Text>
                            <Text style={styles.metaText}>• Episode 12</Text>
                        </View>
                    </View>

                    <Text style={[Typography.body, styles.description]}>
                        Witness the ultimate showdown as the final votes are cast. The winners face their biggest challenge yet in this thrilling conclusion. Alliances will be tested, and only one will rise to claim the ultimate victory.
                    </Text>

                    <TouchableOpacity onPress={() => router.push('/home')}>
                        <Text style={styles.showMore}>Show more</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingTop: Spacing.md,
    },
    headerIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    headerTextContainer: {
        flex: 1,
    },
    videoContainer: {
        marginHorizontal: Spacing.lg,
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: Colors.surface,
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4, // Visual centering for play icon
    },
    castButton: {
        position: 'absolute',
        top: Spacing.md,
        right: Spacing.md,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: Spacing.lg,
        left: Spacing.lg,
        right: Spacing.lg,
    },
    timeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xs,
    },
    timeText: {
        color: Colors.textMuted,
        fontSize: 10,
    },
    progressBarTrack: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'visible',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    progressBarKnob: {
        position: 'absolute',
        top: -4,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFF',
        marginLeft: -6,
    },
    infoSection: {
        padding: Spacing.lg,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
        marginBottom: Spacing.lg,
    },
    badge: {
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: Spacing.md,
    },
    badgeText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: Colors.textMuted,
        fontSize: 14,
        marginLeft: Spacing.xs,
    },
    description: {
        marginBottom: Spacing.md,
    },
    showMore: {
        color: Colors.primary,
        fontWeight: '600',
    }
});
