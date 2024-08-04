import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { request } from "graphql-request";
import {
    getAdventurer,
    getDiscoveries,
    getLatestDiscoveries,
    getLastDiscovery,
    getLastBeastDiscovery,
    getDiscoveryByTxHash,
    getAdventurersByOwner,
    getAdventurerById,
    getAdventurersInList,
    getAdventurersInListByXp,
    getAdventurerByGold,
    getBeastsByAdventurer,
    getBeast,
    getKilledBeasts,
    getLatestBattlesByAdventurer,
    getBattlesByBeast,
    getLastBattleByAdventurer,
    getBattlesByAdventurer,
    getBattleByTxHash,
    getItems,
    getItemsByTokenId,
    getLatestMarketItems,
    getItemsByOwner,
    getItemsByAdventurer,
    getAdventurerByXP,
    getAdventurersByXPPaginated,
    getTopScores,
    getScoresInList,
    getGoldenTokensByOwner,
    getScoresAndAdventurers,
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
    { owner: string }
>(["adventurer"], getAdventurer);

export const useDiscoveries = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["discoveries"], getDiscoveries);

export const useLatestDiscoveries = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["latestDiscoveries"], getLatestDiscoveries);

export const useLastDiscovery = createQueryHook<
    { discoveries: Array<any> },
    { adventurerId: string }
>(["lastDiscovery"], getLastDiscovery);

export const useLastBeastDiscovery = createQueryHook<
    { discoveries: Array<any> },
    { id: string }
>(["lastBeastDiscovery"], getLastBeastDiscovery);

export const useDiscoveryByTxHash = createQueryHook<
    { discoveries: Array<any> },
    { txHash: string }
>(["discoveryByTxHash"], getDiscoveryByTxHash);

export const useItems = createQueryHook<{ items: Array<any> }, {}>(
    ["items"],
    getItems
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
>(["adventurersInListByXp"], getAdventurersInListByXp);

export const useAdventurerByGold = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    {}
>(["adventurerByGold"], getAdventurerByGold);

export const useAdventurerByXP = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    {}
>(["adventurerByXP"], getAdventurerByXP);

export const useAdventurersByXPPaginated = createQueryHook<
    { adventurers: Array<AdventurerComplete> },
    { skip: number }
>(["adventurersByXPPaginated"], getAdventurersByXPPaginated);

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
>(["beastsByAdventurer"], getBeastsByAdventurer);

export const useLatestBattlesByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["latestBattlesByAdventurer"], getLatestBattlesByAdventurer);

export const useBattlesByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["battlesByAdventurer"], getBattlesByAdventurer);

export const useBattlesByBeast = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string; beast: string; seed: string }
>(["battlesByBeast"], getBattlesByBeast);

export const useLastBattleByAdventurer = createQueryHook<
    { battles: Array<any> },
    { adventurerId: string }
>(["lastBattleByAdventurer"], getLastBattleByAdventurer);

export const useBattleByTxHash = createQueryHook<
    { battles: Array<any> },
    { txHash: string }
>(["battleByTxHash"], getBattleByTxHash);

export const useItemsByTokenId = createQueryHook<
    { items: Array<any> },
    { item: string }
>(["itemsByTokenId"], getItemsByTokenId);

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
>(["itemsByOwner"], getItemsByOwner);

export const useTopScores = createQueryHook<{ scores: Array<any> }, {}>(
    ["topScores"],
    getTopScores
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
>(["scoresAndAdventurers"], getScoresAndAdventurers);
