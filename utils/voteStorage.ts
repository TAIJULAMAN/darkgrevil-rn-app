import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const STORAGE_KEY = '@darkgrevil_voted_characters';
export const MAX_VOTES = 5;

type VoteListener = (votedIds: string[]) => void;
const listeners = new Set<VoteListener>();

function notifyListeners(votedIds: string[]) {
    listeners.forEach((listener) => {
        try {
            listener(votedIds);
        } catch (e) {
            console.error('Error in vote listener:', e);
        }
    });
}

export async function getVotedCharacters(): Promise<string[]> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
            const parsed = JSON.parse(json);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Failed to load voted characters from storage:', e);
    }
    return [];
}

export async function getRemainingVotes(): Promise<number> {
    const voted = await getVotedCharacters();
    return Math.max(0, MAX_VOTES - voted.length);
}

export async function hasVotedForCharacter(characterId: string): Promise<boolean> {
    const voted = await getVotedCharacters();
    return voted.includes(characterId);
}

export async function castVote(characterId: string): Promise<{ success: boolean; error?: string; remainingVotes: number }> {
    try {
        const voted = await getVotedCharacters();
        if (voted.includes(characterId)) {
            return {
                success: false,
                error: 'Already voted for this character',
                remainingVotes: Math.max(0, MAX_VOTES - voted.length),
            };
        }

        if (voted.length >= MAX_VOTES) {
            return {
                success: false,
                error: 'You have used all 5 votes',
                remainingVotes: 0,
            };
        }

        const updated = [...voted, characterId];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        notifyListeners(updated);

        return {
            success: true,
            remainingVotes: Math.max(0, MAX_VOTES - updated.length),
        };
    } catch (e) {
        console.error('Failed to cast vote:', e);
        return { success: false, error: 'Storage error', remainingVotes: 0 };
    }
}

export async function resetVotes(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        notifyListeners([]);
    } catch (e) {
        console.error('Failed to reset votes:', e);
    }
}

/**
 * React hook to access real-time voting status and remaining votes.
 */
export function useVoteStatus(characterId?: string) {
    const [votedIds, setVotedIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getVotedCharacters().then((ids) => {
            if (isMounted) {
                setVotedIds(ids);
                setIsLoading(false);
            }
        });

        const listener: VoteListener = (updatedIds) => {
            if (isMounted) {
                setVotedIds(updatedIds);
            }
        };

        listeners.add(listener);
        return () => {
            isMounted = false;
            listeners.delete(listener);
        };
    }, []);

    const hasVoted = characterId ? votedIds.includes(characterId) : false;
    const remainingVotes = Math.max(0, MAX_VOTES - votedIds.length);
    const hasReachedLimit = remainingVotes <= 0;

    return {
        votedIds,
        hasVoted,
        remainingVotes,
        hasReachedLimit,
        isLoading,
    };
}

