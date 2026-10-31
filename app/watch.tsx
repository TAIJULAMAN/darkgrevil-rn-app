import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import { ChevronLeft, Volume2, VolumeX, Heart, RotateCcw } from 'lucide-react-native';

import { CHARACTERS } from '../constants/MockData';
import { useVoteStatus } from '../utils/voteStorage';

export const metadata = {
    title: 'Watch & Vote | Dark Grevil',
    description: 'Watch personality clips and vote for your favorite character on Dark Grevil',
    author: 'Khaled Alghanim',
};

export default function WatchScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const character = CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
    const videoSource = character.video || CHARACTERS[0].video;

    const { hasVoted, remainingVotes, hasReachedLimit } = useVoteStatus(character.id);

    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasEnded, setHasEnded] = useState(false);

    // Video plays once (loop = false)
    const player = useVideoPlayer(videoSource, (p) => {
        p.loop = false;
        p.play();
        p.muted = false;
        p.volume = 1.0;
        p.audioMixingMode = 'doNotMix';
    });

    const { status } = useEvent(player, 'statusChange', { status: player.status });

    // Listen to video reaching the end
    useEventListener(player, 'playToEnd', () => {
        setHasEnded(true);
        setProgress(1);
    });

    const MAX_DURATION = 20;

    useEffect(() => {
        setHasEnded(false);
        setProgress(0);
    }, [character.id]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (player && !hasEnded) {
                const totalDuration = player.duration > 0 ? player.duration : MAX_DURATION;
                if (player.currentTime >= totalDuration) {
                    setHasEnded(true);
                    setProgress(1);
                } else {
                    setProgress(Math.min(player.currentTime / totalDuration, 1));
                }
            }
        }, 100);
        return () => clearInterval(interval);
    }, [player, hasEnded]);

    const handleReplay = () => {
        setHasEnded(false);
        setProgress(0);
        player.currentTime = 0;
        player.play();
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        player.muted = nextMuted;
        if (!nextMuted) {
            player.volume = 1.0;
        }
    };

    const handleVote = () => {
        router.push({
            pathname: '/vote',
            params: { id: character.id }
        });
    };

    const isLoading = status === 'loading' || status === 'idle';

    return (
        <View style={styles.container}>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="author" content={metadata.author} />
            </Head>
            {/* Native Video Player using expo-video */}
            <VideoView
                key={character.id}
                style={styles.video}
                player={player}
                nativeControls={false}
                contentFit="cover"
            />

            {/* Subtle loading spinner when buffering */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7C3AED" />
                </View>
            )}

            {/* Replay Overlay when video finishes playing once */}
            {hasEnded && (
                <TouchableOpacity
                    style={styles.endedContainer}
                    activeOpacity={0.9}
                    onPress={handleReplay}
                >
                    <View style={styles.replayButton}>
                        <RotateCcw color="#FFFFFF" size={32} />
                        <Text style={styles.replayText}>Replay</Text>
                    </View>
                </TouchableOpacity>
            )}

            {/* Top Controls Overlay */}
            <View style={styles.topControls}>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => router.back()}
                    activeOpacity={0.8}
                >
                    <ChevronLeft color="#FFF" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={toggleMute}
                    activeOpacity={0.8}
                >
                    {isMuted ? (
                        <VolumeX color="#FFF" size={24} />
                    ) : (
                        <Volume2 color="#FFF" size={24} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Bottom Info Overlay */}
            <View style={styles.bottomOverlay}>
                {/* Progress Bar */}
                <View style={styles.progressBarTrack}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>

                {/* Character Info & Vote Button */}
                <View style={styles.charInfoRow}>
                    <View style={styles.charInfo}>
                        <Image
                            source={character.image}
                            style={styles.avatar}
                        />
                        <Text style={styles.charName} numberOfLines={1}>{character.name}</Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.votePillButton,
                            (hasVoted || hasReachedLimit) && styles.votePillButtonGray,
                        ]}
                        onPress={handleVote}
                        disabled={hasVoted || hasReachedLimit}
                        activeOpacity={0.85}
                    >
                        <Heart
                            color={hasVoted || hasReachedLimit ? '#9CA3AF' : '#FFFFFF'}
                            fill={hasVoted || hasReachedLimit ? '#9CA3AF' : '#FFFFFF'}
                            size={18}
                        />
                        <Text
                            style={[
                                styles.votePillText,
                                (hasVoted || hasReachedLimit) && styles.votePillTextGray,
                            ]}
                        >
                            {hasVoted ? 'Voted' : hasReachedLimit ? 'Max 5 Votes' : 'Vote'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 10,
    },
    endedContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 15,
    },
    replayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(124, 58, 237, 0.9)',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 32,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    replayText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 6,
    },
    topControls: {
        position: 'absolute',
        top: 60,
        left: Spacing.lg,
        right: Spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 20,
        elevation: 20,
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomOverlay: {
        position: 'absolute',
        bottom: 50,
        left: Spacing.lg,
        right: Spacing.lg,
        zIndex: 20,
        elevation: 20,
    },
    progressBarTrack: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 1.5,
        marginBottom: Spacing.lg,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 1.5,
    },
    charInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    charInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: Spacing.md,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginRight: Spacing.md,
    },
    charName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    votePillButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7C3AED',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    votePillButtonGray: {
        backgroundColor: '#374151',
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    votePillText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    votePillTextGray: {
        color: '#9CA3AF',
    },
});
