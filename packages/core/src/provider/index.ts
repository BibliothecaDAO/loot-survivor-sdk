import { BeastManager, LootManager, PredictionManager } from "../objects";
import { RpcProvider, Account } from "starknet";
import { ExecuteProvider } from "./execute";

export class LootSurvivor {
  // modules that can be read
  beasts!: BeastManager;
  loot!: LootManager;
  prediction!: PredictionManager;

  // modules that can be executed
  executeProvider!: ExecuteProvider;

  // addresses
  private lootSurvivorAddress!: string;
  private beastsAddress!: string;
  private goldenTokenAddress!: string;

  // accounts and provider
  private provider!: RpcProvider;
  private account!: Account | undefined;

  constructor(
    nodeUrl: string,
    lootSurvivorAddress: string,
    beastsAddress: string,
    goldenTokenAddress: string,
    account?: Account | undefined
  ) {
    this.lootSurvivorAddress = lootSurvivorAddress;
    this.beastsAddress = beastsAddress;
    this.goldenTokenAddress = goldenTokenAddress;

    this.provider = new RpcProvider({ nodeUrl });
    this.account = account;

    this.beasts = new BeastManager();
    this.loot = new LootManager();
    this.prediction = new PredictionManager();
    this.executeProvider = new ExecuteProvider(
      this.lootSurvivorAddress,
      this.account
    );
  }

  getBeastsAddress(): string {
    return this.beastsAddress;
  }

  getLootSurvivorAddress(): string {
    return this.lootSurvivorAddress;
  }

  getGoldenTokenAddress(): string {
    return this.goldenTokenAddress;
  }

  getProvider(): RpcProvider {
    return this.provider;
  }
}
