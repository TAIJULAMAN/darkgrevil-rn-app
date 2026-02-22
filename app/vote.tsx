import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';
import CharacterCard from '../components/CharacterCard';
import { useRouter } from 'expo-router';

const CHARACTERS = [
    { id: '1', name: 'Ertugrul Bey', image: require('../assets/ertugrul.png'), votes: '24.5k' },
    { id: '2', name: 'Halime Hatun', image: require('../assets/halima.png'), votes: '18.5k' },
    { id: '3', name: 'Hayme Ana', image: require('../assets/hyma.png'), votes: '15.5k' },
    { id: '4', name: 'Turgut Alp', image: require('../assets/turgut.png'), votes: '12.5k' },
    { id: '5', name: 'Bamsi Beyrek', image: require('../assets/bamsi.png'), votes: '9.5k' },
    { id: '6', name: 'Abdurrahman Alp', image: require('../assets/abdur.png'), votes: '8.5k' },
    { id: '7', name: 'Ertugrul Bey', image: require('../assets/ertugrul.png'), votes: '24.5k' },
    { id: '8', name: 'Halime Hatun', image: require('../assets/halima.png'), votes: '18.5k' },
    { id: '9', name: 'Hayme Ana', image: require('../assets/hyma.png'), votes: '15.5k' },
    { id: '10', name: 'Turgut Alp', image: require('../assets/turgut.png'), votes: '12.5k' },
];

export default function VoteScreen() {
    const [selectedId, setSelectedId] = useState<string | null>('1');
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const router = useRouter();

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setIsSheetVisible(true);
    };

    const selectedCharacter = CHARACTERS.find(c => c.id === selectedId);

    const closeSheet = () => setIsSheetVisible(false);

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

            {/* Voting Confirmation */}
            <Modal
                visible={isSheetVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeSheet}
            >
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPress={closeSheet}
                >
                    <View style={styles.modalOverlay} />
                </TouchableOpacity>

                <View style={styles.sheetContainer}>
                    {selectedCharacter && (
                        <View style={styles.contentContainer}>
                            <View style={styles.sheetHeader}>
                                <Image
                                    source={selectedCharacter.image}
                                    style={styles.sheetImage}
                                />
                            </View>
                            <Text style={styles.sheetTitle}>Vote for {selectedCharacter.name}</Text>
                            <Text style={styles.sheetSubtitle}>This action cannot be undone.</Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.cancelButton]}
                                    onPress={closeSheet}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.sheetButton, styles.confirmButton]}
                                    onPress={() => {
                                        closeSheet();
                                        router.push('/results');
                                    }}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm Vote</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>
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
    modalBackdrop: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1C1C1E',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        minHeight: '35%',
    },
    contentContainer: {
        alignItems: 'center',
        padding: Spacing.lg,
        paddingBottom: Platform.OS === 'ios' ? 40 : Spacing.lg,
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
