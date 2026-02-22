import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface CharacterCardProps {
    name: string;
    image: any;
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
                <Image
                    source={image}
                    style={styles.image}
                />
                {isSelected && (
                    <View style={styles.checkIcon}>
                        <Check color="#FFF" size={14} />
                    </View>
                )}
            </View>
            <Text style={[styles.name, isSelected && styles.selectedName]}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 40,
        padding: Spacing.lg,
        alignItems: 'center',
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    selectedContainer: {
        backgroundColor: 'rgba(57, 45, 75, 0.8)',
        borderColor: '#A855F7',
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: Spacing.sm,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    checkIcon: {
        position: 'absolute',
        top: 0,
        right: -5,
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1A1A1A',
        zIndex: 10,
    },
    name: {
        color: Colors.textSecondary,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: Spacing.xs,
    },
    selectedName: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
