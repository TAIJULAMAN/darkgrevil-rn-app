import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing } from '../constants/Theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react-native';

import { CHARACTERS } from '../constants/MockData';

const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function WatchScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const character = CHARACTERS.find(c => c.id === id) || CHARACTERS[0];

    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
        player.muted = isMuted;
    });

    const MAX_DURATION = 30;

    useEffect(() => {
        player.play();
    }, [player]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (player.currentTime >= MAX_DURATION) {
                player.currentTime = 0;
            }
            setProgress(Math.min(player.currentTime / MAX_DURATION, 1));
        }, 100);
        return () => clearInterval(interval);
    }, [player]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        player.muted = !isMuted;
    };

    return (
        <View style={styles.container}>
            <VideoView
                style={styles.video}
                player={player}
                nativeControls={false}
                contentFit="cover"
            />

            {/* Top Controls */}
            <View style={styles.topControls}>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => router.back()}
                >
                    <ChevronLeft color="#FFF" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={toggleMute}
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

                {/* Character Info */}
                <View style={styles.charInfo}>
                    <Image
                        source={character.image}
                        style={styles.avatar}
                    />
                    <Text style={styles.charName}>{character.name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    topControls: {
        position: 'absolute',
        top: 60,
        left: Spacing.lg,
        right: Spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    charInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: Spacing.md,
    },
    charName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
