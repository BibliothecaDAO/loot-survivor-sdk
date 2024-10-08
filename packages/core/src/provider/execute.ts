//* This file is used to execute the contract functions.

//* TODO: Event parser for txs which then pipe back into the the store

// * FLOW ON TX EXECUTION:
// * 1. User interacts with the UI
// * 2. UI dispatches an action
// * 3. Action calls the execute function
// * 4. Execute function calls the account.execute function
// * 5. Format txs and pipe back into the store

import {
    Account,
    InvokeTransactionReceiptResponse,
    RpcProvider,
} from "starknet";
import { ItemPurchase, MulticallEntry, Stats } from "../type";
import { parseEvents } from "../state/format";
import { useSurvivorStore } from "../state";

export class ExecuteProvider {
    private lootSurvivorAddress!: string;

    private defaultAccount?: Account;

    private provider: RpcProvider;

    constructor(
        lootSurvivorAddress: string,
        provider: RpcProvider,
        defaultAccount?: Account
    ) {
        this.lootSurvivorAddress = lootSurvivorAddress;

        this.defaultAccount = defaultAccount;

        this.provider = provider;
    }

    private getAccount(account?: Account): Account {
        if (account) return account;
        if (this.defaultAccount) return this.defaultAccount;
        throw new Error("No account provided");
    }

    private async processAndUpdateState(
        receipt: InvokeTransactionReceiptResponse
    ) {
        const events = parseEvents(receipt as InvokeTransactionReceiptResponse);

        useSurvivorStore.getState().survivor?.updateFromEvents(events);
    }

    async newGame(
        clientRewardAddress: string,
        weapon: number,
        name: string,
        goldenTokenId: bigint,
        vrfFeeLimit: bigint,
        account?: Account
    ) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "new_game",
                    calldata: [
                        clientRewardAddress,
                        weapon,
                        name,
                        goldenTokenId,
                        vrfFeeLimit,
                    ],
                }
            );

            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async explore(adventurerId: string, tillBeast: boolean, account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "explore",
                    calldata: [adventurerId, tillBeast ? 1 : 0],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async attack(adventurerId: string, toTheDeath: boolean, account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "attack",
                    calldata: [adventurerId, toTheDeath ? 1 : 0],
                }
            );

            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async flee(adventurerId: string, toTheDeath: boolean, account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "flee",
                    calldata: [adventurerId, toTheDeath ? 1 : 0],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async equip(adventurerId: string, items: number[], account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "equip",
                    calldata: [adventurerId, ...items],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async drop(adventurerId: string, items: number[], account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "drop",
                    calldata: [adventurerId, ...items],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async upgrade(
        adventurerId: string,
        potions: number,
        statUpgrades: Stats,
        items: ItemPurchase[],
        account?: Account
    ) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "upgrade",
                    calldata: [
                        adventurerId,
                        potions,
                        ...Object.values(statUpgrades),
                        ...items.flatMap((item) => item),
                    ],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async updateCostToPlay(account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                {
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: "update_cost_to_play",
                    calldata: [],
                }
            );
            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error(e);
        }
    }

    async multiCall(calls: MulticallEntry[], account?: Account) {
        try {
            const { transaction_hash } = await this.getAccount(account).execute(
                calls.map((call) => ({
                    contractAddress: this.lootSurvivorAddress,
                    entrypoint: call.entrypoint,
                    calldata: call.calldata,
                }))
            );

            this.processAndUpdateState(
                (await this.provider.waitForTransaction(
                    transaction_hash
                )) as InvokeTransactionReceiptResponse
            );
        } catch (e) {
            console.error("Multicall error:", e);
            throw e;
        }
    }
}
