//* This file is used to execute the contract functions.

//* TODO: Event parser for txs which then pipe back into the the store

// * FLOW ON TX EXECUTION:
// * 1. User interacts with the UI
// * 2. UI dispatches an action
// * 3. Action calls the execute function
// * 4. Execute function calls the account.execute function
// * 5. Format txs and pipe back into the store

import { Account } from "starknet";
import {
  ItemPurchase,
  MulticallEntry,
  SELECTOR_KEYS,
  SelectorKey,
  Stats,
} from "../type";

export class ExecuteProvider {
  private lootSurvivorAddress!: string;

  private defaultAccount?: Account;

  constructor(lootSurvivorAddress: string, defaultAccount?: Account) {
    this.lootSurvivorAddress = lootSurvivorAddress;

    this.defaultAccount = defaultAccount;
  }

  private getAccount(account?: Account): Account {
    if (account) return account;
    if (this.defaultAccount) return this.defaultAccount;
    throw new Error("No account provided");
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
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "new_game",
        calldata: [
          clientRewardAddress,
          weapon,
          name,
          goldenTokenId,
          vrfFeeLimit,
        ],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async explore(adventurerId: string, tillBeast: boolean, account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "explore",
        calldata: [adventurerId, tillBeast ? 1 : 0],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async attack(adventurerId: string, toTheDeath: boolean, account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "attack",
        calldata: [adventurerId, toTheDeath ? 1 : 0],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async flee(adventurerId: string, toTheDeath: boolean, account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "flee",
        calldata: [adventurerId, toTheDeath ? 1 : 0],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async equip(adventurerId: string, items: number[], account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "equip",
        calldata: [adventurerId, ...items],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async drop(adventurerId: string, items: number[], account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "drop",
        calldata: [adventurerId, ...items],
      });
      console.log(tx);
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
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "upgrade",
        calldata: [
          adventurerId,
          potions,
          ...Object.values(statUpgrades),
          ...items.flatMap((item) => item),
        ],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async updateCostToPlay(account?: Account) {
    try {
      const tx = await this.getAccount(account).execute({
        contractAddress: this.lootSurvivorAddress,
        entrypoint: "update_cost_to_play",
        calldata: [],
      });
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  }

  async multiCall(calls: MulticallEntry[], account?: Account) {
    try {
      const tx = await this.getAccount(account).execute(
        calls.map((call) => ({
          contractAddress: this.lootSurvivorAddress,
          entrypoint: call.entrypoint,
          calldata: call.calldata,
        }))
      );
      console.log(tx);
      return tx;
    } catch (e) {
      console.error("Multicall error:", e);
      throw e;
    }
  }

  getSelectorKey(key: SelectorKey): string {
    return SELECTOR_KEYS[key];
  }
}
