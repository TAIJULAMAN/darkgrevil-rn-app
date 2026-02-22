import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface CharacterCardProps {
    name: string;
    image: string;
    isSelected: boolean;
    onPress: () => void;
}

export default function CharacterCard({ name, image, isSelected, onPress }: CharacterCardProps) {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                {isSelected && (
                    <View style={styles.checkIcon}>
                        <Check color={Colors.text} size={14} />
                    </View>
                )}
            </View>
            <Text style={[styles.name, isSelected && styles.selectedName]}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '45%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 80, // Circular feel for the card too if needed, but the image is circular
        padding: Spacing.md,
        alignItems: 'center',
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedContainer: {
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        borderColor: Colors.primary,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: Spacing.sm,
        position: 'relative',
        borderWidth: 2,
        borderColor: Colors.surfaceLight,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    checkIcon: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.background,
    },
    name: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    selectedName: {
        color: Colors.text,
        fontWeight: '600',
    },
});
