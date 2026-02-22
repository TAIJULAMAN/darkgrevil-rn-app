import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { CHARACTERS, ADVENTURES } from '../constants/MockData';
import LeaderboardItem from '../components/LeaderboardItem';
import { useRouter } from 'expo-router';

export default function ResultsScreen() {
    const [selectedAdventure, setSelectedAdventure] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (showPopup) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showPopup]);

    const closePopup = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setShowPopup(false));
    };

    const handleAdventureSelect = (id: string) => {
        setSelectedAdventure(id);
        setShowPopup(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                        <ChevronLeft color="rgba(255,255,255,0.4)" size={24} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>View Results</Text>
                        <Text style={styles.headerSubtitle}>Top winner among the characters</Text>
                    </View>
                </View>

                <View style={styles.leaderboardSection}>
                    {CHARACTERS.slice(0, 5).map((item, index) => (
                        <LeaderboardItem
                            key={item.id}
                            rank={index + 1}
                            name={item.name}
                            image={item.image}
                            votes={item.votes}
                        />
                    ))}
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>NEXT ADVENTURE</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.adventureSection}>
                    <Text style={styles.adventureTitle}>Vote their adventure</Text>
                    <Text style={styles.adventureSubtitle}>Choose the adventure you want them to be in</Text>

                    <View style={styles.adventureList}>
                        {ADVENTURES.map((item) => {
                            const isSelected = selectedAdventure === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.adventureItem}
                                    onPress={() => handleAdventureSelect(item.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                                        {isSelected && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.adventureText}>{item.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            {/* Success Popup */}
            {showPopup && (
                <Animated.View style={[styles.popupOverlay, { opacity: fadeAnim }]}>
                    <Pressable style={styles.popupPressable} onPress={closePopup}>
                        <View style={styles.popupContainer}>
                            <Image
                                source={require('../assets/check.png')}
                                style={styles.checkIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.popupTitle}>Thanks for voting!</Text>
                            <Text style={styles.popupDescription}>
                                You can now enjoy our games and pop quiz challenges to discover fun facts and clues.
                            </Text>
                            <TouchableOpacity onPress={() => { setShowPopup(false); router.push('/watchEpisode'); }}>
                                <Text style={styles.popupFooter}>— Enjoy!</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        marginTop: 10,
    },
    backButton: {
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
        fontSize: 28,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
    },
    leaderboardSection: {
        paddingHorizontal: Spacing.md,
        marginTop: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        marginVertical: 40,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    dividerText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 16,
        letterSpacing: 1,
    },
    adventureSection: {
        paddingHorizontal: Spacing.lg,
    },
    adventureTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    adventureSubtitle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginTop: 4,
    },
    adventureList: {
        marginTop: 24,
    },
    adventureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderRadius: 40,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    radioOuterSelected: {
        borderColor: Colors.primary,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
    },
    adventureText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '500',
    },
    popupOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popupPressable: {
        width: '85%',
    },
    popupContainer: {
        backgroundColor: '#241B35',
        borderRadius: 48,
        padding: 40,
        alignItems: 'center',
    },
    successIconOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successIconInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1A1126',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        width: 100,
        height: 100,
    },
    popupTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    popupDescription: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 12,
    },
    popupFooter: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
});
