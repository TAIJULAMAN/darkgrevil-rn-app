import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Colors, Spacing, Typography } from '../constants/Theme';

const { width } = Dimensions.get('window');
const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function WatchPage() {
    const router = useRouter();
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
                        <Home color="#FFF" size={20} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Watch Episode</Text>
                        <Text style={styles.headerSubtitle}>Watch the full episode</Text>
                    </View>
                </View>

                {/* Video Player Area */}
                <View style={styles.videoContainer}>
                    <VideoView
                        player={player}
                        style={styles.video}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.episodeTitle}>Great Episode of the Winners</Text>

                    <View style={styles.badgeRow}>
                        <View style={styles.seasonBadge}>
                            <Text style={styles.seasonBadgeText}>SEASON FINALE</Text>
                        </View>
                        <View style={styles.metaInfo}>
                            <Clock color="rgba(255,255,255,0.6)" size={16} />
                            <Text style={styles.metaText}>20 min</Text>
                            <Text style={styles.metaDot}>•</Text>
                            <Text style={styles.metaText}>Episode 12</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>
                        Witness the ultimate showdown as the final votes are cast. The winners face their biggest challenge yet in this thrilling conclusion. Alliances will be tested, and only one will rise to claim the ultimate victory.
                    </Text>

                    <TouchableOpacity>
                        <Text style={styles.showMoreText}>Show more</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    homeButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
    },
    videoContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    video: {
        width: '100%',
        height: width * 0.6,
        borderRadius: 24,
        overflow: 'hidden',
    },
    contentSection: {
        paddingHorizontal: 24,
        marginTop: 32,
    },
    episodeTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    seasonBadge: {
        backgroundColor: '#2E1B3D',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 16,
    },
    seasonBadgeText: {
        color: '#A855F7',
        fontSize: 12,
        fontWeight: 'bold',
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginLeft: 6,
    },
    metaDot: {
        color: 'rgba(255, 255, 255, 0.4)',
        marginHorizontal: 8,
    },
    description: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    showMoreText: {
        color: '#A855F7',
        fontSize: 16,
        fontWeight: '500',
    },
});
