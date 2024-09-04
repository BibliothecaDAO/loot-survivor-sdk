import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { request } from "graphql-request";
import {
    getLatestDiscoveries,
    getLastBeastDiscovery,
    getAdventurersByOwner,
    getAdventurersByOwnerCount,
    getAdventurerById,
    getAdventurersInList,
    getBeast,
    getKilledBeasts,
    getBattlesByBeast,
    getDiscoveriesAndBattlesByAdventurerPaginated,
    getLatestMarketItems,
    getItemsByAdventurer,
    getDeadAdventurersByXPPaginated,
    getAliveAdventurersByXPPaginated,
    getScoresInList,
    getGoldenTokensByOwner,
    getAdventurerCounts,
    getAliveAdventurersCount,
    getDiscoveryBattleCount,
    getAdventurerRank,
    getCollectionsTotals,
} from "@lootsurvivor/core";
import { AdventurerComplete } from "@lootsurvivor/core";

const DEFAULT_ENDPOINT = "https://ls-indexer-sepolia.provable.games/graphql";

function createQueryHook<TData, TVariables extends object>(
    queryKey: string[],
    query: string
) {
    return (variables?: TVariables, endpoint?: string): UseQueryResult<TData> =>
        useQuery({
            queryKey: [...queryKey, variables],
            queryFn: async () => {
                const data = await request<TData>(
                    endpoint || DEFAULT_ENDPOINT,
                    query,
                    variables || {}
                );
                return data;
            },
        });
}

export const useAdventurer = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { id: string }
>(["adventurerById"], getAdventurerById);

export const useDiscoveries = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["discoveries"], getLatestDiscoveries);

export const useLatestDiscoveries = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["latestDiscoveries"], getLatestDiscoveries);

export const useLastDiscovery = createQueryHook<
    { discoveries: Array<any> },
    { adventurerId: string }
>(["lastDiscovery"], getLastBeastDiscovery);

export const useLastBeastDiscovery = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["lastBeastDiscovery"], getLastBeastDiscovery);

export const useDiscoveryByTxHash = createQueryHook<
    { discoveries: Array<any> },
    { txHash: string }
>(["discoveryByTxHash"], getDiscoveriesAndBattlesByAdventurerPaginated);

export const useItems = createQueryHook<{ items: Array<any> }, {}>(
    ["items"],
    getItemsByAdventurer
);

export const useAdventurersByOwner = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { owner: string }
>(["adventurersByOwner"], getAdventurersByOwner);

export const useAdventurerById = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { id: string }
>(["adventurerById"], getAdventurerById);

export const useAdventurersInList = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { ids: string[] }
>(["adventurersInList"], getAdventurersInList);

export const useAdventurersInListByXp = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { ids: string[] }
>(["adventurersInListByXp"], getAdventurersInList);

export const useAdventurerByGold = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    {}
>(["adventurerByGold"], getAdventurerById);

export const useAdventurerByXP = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    {}
>(["adventurerByXP"], getAdventurerById);

export const useAdventurersByXPPaginated = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { skip: number }
>(["adventurersByXPPaginated"], getAliveAdventurersByXPPaginated);

export const useBeast = createQueryHook<
    { beasts: Array<any> },
    { beast: string; adventurerId: string; seed: string }
>(["beast"], getBeast);

export const useKilledBeasts = createQueryHook<{ beasts: Array<any> }, {}>(
    ["killedBeasts"],
    getKilledBeasts
);

export const useBeastsByAdventurer = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["beastsByAdventurer"], getBattlesByBeast);

export const useLatestBattlesByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["latestBattlesByAdventurer"], getBattlesByBeast);

export const useBattlesByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["battlesByAdventurer"], getBattlesByBeast);

export const useBattlesByBeast = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string; beast: string; seed: string }
>(["battlesByBeast"], getBattlesByBeast);

export const useLastBattleByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["lastBattleByAdventurer"], getBattlesByBeast);

export const useBattleByTxHash = createQueryHook<
    { battles: Array<any> },
    { txHash: string }
>(["battleByTxHash"], getBattlesByBeast);

export const useItemsByTokenId = createQueryHook<
    { items: Array<any> },
    { item: string }
>(["itemsByTokenId"], getItemsByAdventurer);

export const useLatestMarketItems = createQueryHook<
    { items: Array<any> },
    { id: string }
>(["latestMarketItems"], getLatestMarketItems);

export const useItemsByAdventurer = createQueryHook<
    { items: Array<any> },
    { id: string }
>(["itemsByAdventurer"], getItemsByAdventurer);

export const useItemsByOwner = createQueryHook<
    { items: Array<any> },
    { owner: string }
>(["itemsByOwner"], getItemsByAdventurer);

export const useTopScores = createQueryHook<{ scores: Array<any> }, {}>(
    ["topScores"],
    getScoresInList
);

export const useScoresInList = createQueryHook<
    { scores: Array<any> },
    { ids: number[] }
>(["scoresInList"], getScoresInList);

export const useGoldenTokensByOwner = createQueryHook<
    { getERC721Tokens: Array<any> },
    { contractAddress: string; owner: string }
>(["goldenTokensByOwner"], getGoldenTokensByOwner);

export const useScoresAndAdventurers = createQueryHook<
    { scores: Array<any>; adventurers: Array<AdventurerComplete> },
    {}
>(["scoresAndAdventurers"], getScoresInList);

export const useAdventurersByOwnerCount = createQueryHook<
    { countTotalAdventurers: number },
    { owner: string }
>(["adventurersByOwnerCount"], getAdventurersByOwnerCount);

export const useDeadAdventurersByXPPaginated = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { skip: number }
>(["deadAdventurersByXPPaginated"], getDeadAdventurersByXPPaginated);

export const useAdventurerCounts = createQueryHook<
    {
        countAliveAdventurers: number;
        countDeadAdventurers: number;
        countTotalAdventurers: number;
    },
    {}
>(["adventurerCounts"], getAdventurerCounts);

export const useAliveAdventurersCount = createQueryHook<
    { countAliveAdventurers: number },
    { owner: string }
>(["aliveAdventurersCount"], getAliveAdventurersCount);

export const useDiscoveryBattleCount = createQueryHook<
    { countDiscoveriesAndBattles: number },
    { adventurerId: number }
>(["discoveryBattleCount"], getDiscoveryBattleCount);

export const useAdventurerRank = createQueryHook<
    { adventurerRank: { rank: number } },
    { adventurerId: number; adventurerXp: number }
>(["adventurerRank"], getAdventurerRank);

export const useCollectionsTotals = createQueryHook<
    {
        collectionTotals: Array<{
            collection: string;
            gamesPlayed: number;
            xp: number;
        }>;
    },
    {}
>(["collectionsTotals"], getCollectionsTotals);
