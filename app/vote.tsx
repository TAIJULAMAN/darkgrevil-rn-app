import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { CHARACTERS } from '../constants/MockData';
import CharacterCard from '../components/CharacterCard';
import { useRouter } from 'expo-router';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

export default function VoteScreen() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const router = useRouter();

    // Bottom Sheet Ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        bottomSheetRef.current?.expand();
    };

    const selectedCharacter = CHARACTERS.find(c => c.id === selectedId);

    // Render backdrop
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsAt={-1}
                appearsAt={0}
                opacity={0.5}
            />
        ),
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ChevronLeft color={Colors.textSecondary} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={Typography.h2}>Choose your favorite</Text>
                    <Text style={Typography.caption}>You can vote once. Choose wisely</Text>
                </View>
            </View>

            <FlatList
                data={CHARACTERS}
                renderItem={({ item }) => (
                    <CharacterCard
                        name={item.name}
                        image={item.image}
                        isSelected={selectedId === item.id}
                        onPress={() => handleSelect(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={{ backgroundColor: Colors.textMuted }}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {selectedCharacter && (
                        <>
                            <View style={styles.sheetHeader}>
                                <Image source={{ uri: selectedCharacter.image }} style={styles.sheetImage} />
                            </View>
                            <Text style={styles.sheetTitle}>Vote for {selectedCharacter.name}</Text>
                            <Text style={styles.sheetSubtitle}>This action cannot be undone.</Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.cancelButton]}
                                    onPress={() => bottomSheetRef.current?.close()}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.confirmButton]}
                                    onPress={() => router.push('/results')}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm Vote</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </BottomSheetView>
            </BottomSheet>
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
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    headerTextContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    bottomSheetBackground: {
        backgroundColor: '#1C1C1E',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: Spacing.lg,
    },
    sheetHeader: {
        marginBottom: Spacing.md,
    },
    sheetImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    sheetTitle: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: Spacing.xs,
    },
    sheetSubtitle: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginBottom: Spacing.xl,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    sheetButton: {
        flex: 0.48,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.surface,
    },
    confirmButton: {
        backgroundColor: Colors.primary,
    },
    cancelButtonText: {
        color: Colors.text,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: Colors.text,
        fontWeight: '600',
    },
});
