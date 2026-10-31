import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";
import { Colors, Spacing } from "../constants/Theme";

interface CharacterCardProps {
  name: string;
  image: any;
  isSelected: boolean;
  isVoted?: boolean;
  onPress: () => void;
}

export default function CharacterCard({
  name,
  image,
  isSelected,
  isVoted = false,
  onPress,
}: CharacterCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        isVoted && styles.votedContainer,
      ]}
      onPress={onPress}
      activeOpacity={isVoted ? 0.9 : 0.8}
    >
      {/* Checkmark in card top-right */}
      {isVoted ? (
        <View style={[styles.cardCheckIcon, styles.votedCheckIcon]}>
          <Check color="#9CA3AF" size={14} />
        </View>
      ) : isSelected ? (
        <View style={styles.cardCheckIcon}>
          <Check color="#FFF" size={14} />
        </View>
      ) : null}

      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={[styles.name, isSelected && styles.selectedName, isVoted && styles.votedName]}>
        {name}
      </Text>
      {isVoted && <Text style={styles.votedLabel}>Voted</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 40,
    padding: Spacing.lg,
    alignItems: "center",
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    position: "relative",
  },
  selectedContainer: {
    backgroundColor: "rgba(124, 58, 237, 0.15)",
    borderColor: Colors.primary,
  },
  votedContainer: {
    opacity: 0.65,
    borderColor: "rgba(255,255,255,0.1)",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  name: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedName: {
    color: "#FFF",
  },
  votedName: {
    color: "#9CA3AF",
  },
  votedLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  cardCheckIcon: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: Colors.primary,
    borderRadius: 13,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.background,
    zIndex: 2,
  },
  votedCheckIcon: {
    backgroundColor: "#374151",
    borderColor: "#1F2937",
  },
});
