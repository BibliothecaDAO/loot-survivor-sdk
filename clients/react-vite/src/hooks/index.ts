import { AdventurerComplete } from "@lootsurvivor/core";
import {
    useDeadAdventurersByXPPaginated,
    useScoresInList,
} from "@lootsurvivor/react";
import { useMemo } from "react";

interface AdventurerWithScore extends AdventurerComplete {
    score?: number;
    totalPayout?: number;
}

export const useAdventurersByXPWithScores = ({ page }: { page: number }) => {
    const adventurersQuery = useDeadAdventurersByXPPaginated({
        skip: (page - 1) * 10,
    });

    const adventurerIds =
        adventurersQuery.data?.adventurers.map((adv) => adv.id) || [];

    const scoresQuery = useScoresInList({ ids: adventurerIds });

    const mergedData: AdventurerWithScore[] = useMemo(() => {
        if (!adventurersQuery.data || !scoresQuery.data) return [];

        return adventurersQuery.data.adventurers.map((adventurer) => {
            const score = scoresQuery.data.scores.find(
                (s) => s.adventurerId === adventurer.id
            );
            return {
                ...adventurer,
                score: score ? score.score : undefined,
                totalPayout: score ? score.totalPayout : undefined,
            };
        });
    }, [adventurersQuery.data, scoresQuery.data]);

    return {
        adventurersWithScores: mergedData,
        isLoading: adventurersQuery.isLoading || scoresQuery.isLoading,
        isError: adventurersQuery.isError || scoresQuery.isError,
    };
};
