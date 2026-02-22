import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Circle, CheckCircle2 } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { CHARACTERS, ADVENTURES } from '../constants/MockData';
import LeaderboardItem from '../components/LeaderboardItem';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';


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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                        <ChevronLeft color={Colors.textSecondary} size={24} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={Typography.h2}>View Results</Text>
                        <Text style={Typography.caption}>Top winner among the characters</Text>
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
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>NEXT ADVENTURE</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.adventureSection}>
                    <Text style={Typography.h2}>Vote their adventure</Text>
                    <Text style={Typography.caption}>Choose the adventure you want them to be in</Text>

                    <View style={styles.adventureList}>
                        {ADVENTURES.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.adventureItem, selectedAdventure === item.id && styles.selectedAdventure]}
                                onPress={() => handleAdventureSelect(item.id)}
                            >
                                {selectedAdventure === item.id ? (
                                    <CheckCircle2 color={Colors.primary} size={24} />
                                ) : (
                                    <Circle color={Colors.textMuted} size={24} />
                                )}
                                <Text style={[styles.adventureText, selectedAdventure === item.id && styles.selectedAdventureText]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Success Popup */}
            {showPopup && (
                <Animated.View style={[styles.popupOverlay, { opacity: fadeAnim }]}>
                    <Pressable style={styles.popupPressable} onPress={closePopup}>
                        <BlurView intensity={20} tint="dark" style={styles.popupBlur}>
                            <View style={styles.popupContent}>
                                <View style={styles.successIconOuter}>
                                    <View style={styles.successIconInner}>
                                        <CheckCircle2 color={Colors.text} size={40} />
                                    </View>
                                </View>
                                <Text style={styles.popupTitle}>Thanks for voting!</Text>
                                <Text style={styles.popupDescription}>
                                    You can now enjoy our games and pop quiz challenges to discover fun facts and clues.
                                </Text>
                                <Text style={styles.popupFooter}>— Enjoy!</Text>
                            </View>
                        </BlurView>
                    </Pressable>
                </Animated.View>
            )}
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
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    headerTextContainer: {
        flex: 1,
    },
    leaderboardSection: {
        paddingHorizontal: Spacing.md,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        marginVertical: Spacing.xl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.surfaceLight,
    },
    dividerText: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        marginHorizontal: Spacing.md,
        letterSpacing: 1,
    },
    adventureSection: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    adventureList: {
        marginTop: Spacing.lg,
    },
    adventureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 30,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    selectedAdventure: {
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderColor: Colors.primary,
    },
    adventureText: {
        color: Colors.textSecondary,
        fontSize: 16,
        marginLeft: Spacing.md,
    },
    selectedAdventureText: {
        color: Colors.text,
        fontWeight: '600',
    },
    checkedCircle: {
        marginLeft: 'auto',
    },
    popupOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    popupPressable: {
        width: '85%',
        borderRadius: 32,
        overflow: 'hidden',
    },
    popupBlur: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    popupContent: {
        alignItems: 'center',
    },
    successIconOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        padding: 4,
        marginBottom: Spacing.lg,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
    },
    successIconInner: {
        flex: 1,
        borderRadius: 36,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    popupTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: Spacing.md,
    },
    popupDescription: {
        color: Colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: Spacing.md,
    },
    popupFooter: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
    }
});
