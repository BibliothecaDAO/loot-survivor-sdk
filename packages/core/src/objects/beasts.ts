import { S3_BUCKET } from "../constants";
import { ArmorType, AttackType, BeastType, Beasts } from "../type";

export class BeastManager {
  private static readonly BEAST_ATTACK_TYPES: Record<BeastType, AttackType> = {
    [BeastType.Magical]: AttackType.Magic,
    [BeastType.Hunter]: AttackType.Blade,
    [BeastType.Brute]: AttackType.Bludgeon,
  };

  private static readonly BEAST_ARMOR_TYPES: Record<BeastType, ArmorType> = {
    [BeastType.Magical]: ArmorType.Cloth,
    [BeastType.Hunter]: ArmorType.Hide,
    [BeastType.Brute]: ArmorType.Metal,
  };

  // pass in alternateImagePath to use a different image path
  private alternateImagePath: string = "";

  constructor(alternateImagePath?: string) {
    this.alternateImagePath = alternateImagePath || "";
  }

  getBeastName(beast: Beasts): string {
    return Beasts[beast];
  }

  getBeastNumber(beastName: string): Beasts | undefined {
    return Beasts[beastName as keyof typeof Beasts];
  }

  getBeastTier(beast: Beasts): { type: BeastType; tier: number } {
    return BEAST_TIERS[beast];
  }

  getAttackType(beastType: BeastType): AttackType {
    return BeastManager.BEAST_ATTACK_TYPES[beastType];
  }

  getArmorType(beastType: BeastType): ArmorType {
    return BeastManager.BEAST_ARMOR_TYPES[beastType];
  }

  getBeastType(beast: Beasts): BeastType {
    return BEAST_TIERS[beast].type;
  }

  maxBeastId(): number {
    return Math.max(
      ...Object.values(Beasts).filter(
        (value): value is number => typeof value === "number"
      )
    );
  }

  getBeastImage(beast: Beasts): string {
    if (this.alternateImagePath) {
      return this.alternateImagePath + BEAST_IMAGES[beast];
    }
    return S3_BUCKET + BEAST_IMAGES[beast];
  }

  elementalAdjustedDamage(
    base_attack: number,
    weapon_type: string,
    armor_type: string
  ): number {
    const ELEMENTAL_EFFECT = Math.floor(base_attack / 2);
    const EFFECTIVE_PAIRS: Record<string, string> = {
      Magic: "Metal",
      Blade: "Cloth",
      Bludgeon: "Hide",
    };
    const INEFFECTIVE_PAIRS: Record<string, string> = {
      Magic: "Hide",
      Blade: "Metal",
      Bludgeon: "Cloth",
    };

    if (EFFECTIVE_PAIRS[weapon_type] === armor_type) {
      return base_attack + ELEMENTAL_EFFECT;
    }

    if (INEFFECTIVE_PAIRS[weapon_type] === armor_type) {
      return base_attack - ELEMENTAL_EFFECT;
    }

    return base_attack;
  }
}

export const BEAST_TIERS: Record<Beasts, { type: BeastType; tier: number }> = {
  [Beasts.Warlock]: { type: BeastType.Magical, tier: 1 },
  [Beasts.Typhon]: { type: BeastType.Magical, tier: 1 },
  [Beasts.Jiangshi]: { type: BeastType.Magical, tier: 1 },
  [Beasts.Anansi]: { type: BeastType.Magical, tier: 1 },
  [Beasts.Basilisk]: { type: BeastType.Magical, tier: 1 },
  [Beasts.Gorgon]: { type: BeastType.Magical, tier: 2 },
  [Beasts.Kitsune]: { type: BeastType.Magical, tier: 2 },
  [Beasts.Lich]: { type: BeastType.Magical, tier: 2 },
  [Beasts.Chimera]: { type: BeastType.Magical, tier: 2 },
  [Beasts.Wendigo]: { type: BeastType.Magical, tier: 2 },
  [Beasts.Rakshasa]: { type: BeastType.Magical, tier: 3 },
  [Beasts.Werewolf]: { type: BeastType.Magical, tier: 3 },
  [Beasts.Banshee]: { type: BeastType.Magical, tier: 3 },
  [Beasts.Draugr]: { type: BeastType.Magical, tier: 3 },
  [Beasts.Vampire]: { type: BeastType.Magical, tier: 3 },
  [Beasts.Goblin]: { type: BeastType.Magical, tier: 4 },
  [Beasts.Ghoul]: { type: BeastType.Magical, tier: 4 },
  [Beasts.Wraith]: { type: BeastType.Magical, tier: 4 },
  [Beasts.Sprite]: { type: BeastType.Magical, tier: 4 },
  [Beasts.Kappa]: { type: BeastType.Magical, tier: 4 },
  [Beasts.Fairy]: { type: BeastType.Magical, tier: 5 },
  [Beasts.Leprechaun]: { type: BeastType.Magical, tier: 5 },
  [Beasts.Kelpie]: { type: BeastType.Magical, tier: 5 },
  [Beasts.Pixie]: { type: BeastType.Magical, tier: 5 },
  [Beasts.Gnome]: { type: BeastType.Magical, tier: 5 },
  [Beasts.Griffin]: { type: BeastType.Hunter, tier: 1 },
  [Beasts.Manticore]: { type: BeastType.Hunter, tier: 1 },
  [Beasts.Phoenix]: { type: BeastType.Hunter, tier: 1 },
  [Beasts.Dragon]: { type: BeastType.Hunter, tier: 1 },
  [Beasts.Minotaur]: { type: BeastType.Hunter, tier: 1 },
  [Beasts.Qilin]: { type: BeastType.Hunter, tier: 2 },
  [Beasts.Ammit]: { type: BeastType.Hunter, tier: 2 },
  [Beasts.Nue]: { type: BeastType.Hunter, tier: 2 },
  [Beasts.Skinwalker]: { type: BeastType.Hunter, tier: 2 },
  [Beasts.Chupacabra]: { type: BeastType.Hunter, tier: 2 },
  [Beasts.Weretiger]: { type: BeastType.Hunter, tier: 3 },
  [Beasts.Wyvern]: { type: BeastType.Hunter, tier: 3 },
  [Beasts.Roc]: { type: BeastType.Hunter, tier: 3 },
  [Beasts.Harpy]: { type: BeastType.Hunter, tier: 3 },
  [Beasts.Pegasus]: { type: BeastType.Hunter, tier: 3 },
  [Beasts.Hippogriff]: { type: BeastType.Hunter, tier: 4 },
  [Beasts.Fenrir]: { type: BeastType.Hunter, tier: 4 },
  [Beasts.Jaguar]: { type: BeastType.Hunter, tier: 4 },
  [Beasts.Satori]: { type: BeastType.Hunter, tier: 4 },
  [Beasts.DireWolf]: { type: BeastType.Hunter, tier: 4 },
  [Beasts.Bear]: { type: BeastType.Hunter, tier: 5 },
  [Beasts.Wolf]: { type: BeastType.Hunter, tier: 5 },
  [Beasts.Mantis]: { type: BeastType.Hunter, tier: 5 },
  [Beasts.Spider]: { type: BeastType.Hunter, tier: 5 },
  [Beasts.Rat]: { type: BeastType.Hunter, tier: 5 },
  [Beasts.Kraken]: { type: BeastType.Brute, tier: 1 },
  [Beasts.Colossus]: { type: BeastType.Brute, tier: 1 },
  [Beasts.Balrog]: { type: BeastType.Brute, tier: 1 },
  [Beasts.Leviathan]: { type: BeastType.Brute, tier: 1 },
  [Beasts.Tarrasque]: { type: BeastType.Brute, tier: 1 },
  [Beasts.Titan]: { type: BeastType.Brute, tier: 2 },
  [Beasts.Nephilim]: { type: BeastType.Brute, tier: 2 },
  [Beasts.Behemoth]: { type: BeastType.Brute, tier: 2 },
  [Beasts.Hydra]: { type: BeastType.Brute, tier: 2 },
  [Beasts.Juggernaut]: { type: BeastType.Brute, tier: 2 },
  [Beasts.Oni]: { type: BeastType.Brute, tier: 3 },
  [Beasts.Jotunn]: { type: BeastType.Brute, tier: 3 },
  [Beasts.Ettin]: { type: BeastType.Brute, tier: 3 },
  [Beasts.Cyclops]: { type: BeastType.Brute, tier: 3 },
  [Beasts.Giant]: { type: BeastType.Brute, tier: 3 },
  [Beasts.NemeanLion]: { type: BeastType.Brute, tier: 4 },
  [Beasts.Berserker]: { type: BeastType.Brute, tier: 4 },
  [Beasts.Yeti]: { type: BeastType.Brute, tier: 4 },
  [Beasts.Golem]: { type: BeastType.Brute, tier: 4 },
  [Beasts.Ent]: { type: BeastType.Brute, tier: 4 },
  [Beasts.Troll]: { type: BeastType.Brute, tier: 5 },
  [Beasts.Bigfoot]: { type: BeastType.Brute, tier: 5 },
  [Beasts.Ogre]: { type: BeastType.Brute, tier: 5 },
  [Beasts.Orc]: { type: BeastType.Brute, tier: 5 },
  [Beasts.Skeleton]: { type: BeastType.Brute, tier: 5 },
};

export const BEAST_IMAGES: Record<Beasts, string> = {
  [Beasts.Warlock]: "/monsters/warlock.png",
  [Beasts.Typhon]: "/monsters/typhon.png",
  [Beasts.Jiangshi]: "/monsters/jiangshi.png",
  [Beasts.Anansi]: "/monsters/anansi.png",
  [Beasts.Basilisk]: "/monsters/basilisk.png",
  [Beasts.Gorgon]: "/monsters/gorgon.png",
  [Beasts.Kitsune]: "/monsters/kitsune.png",
  [Beasts.Lich]: "/monsters/lich.png",
  [Beasts.Chimera]: "/monsters/chimera.png",
  [Beasts.Wendigo]: "/monsters/wendigo.png",
  [Beasts.Rakshasa]: "/monsters/rakshasa.png",
  [Beasts.Werewolf]: "/monsters/werewolf.png",
  [Beasts.Banshee]: "/monsters/banshee.png",
  [Beasts.Draugr]: "/monsters/draugr.png",
  [Beasts.Vampire]: "/monsters/vampire.png",
  [Beasts.Goblin]: "/monsters/goblin.png",
  [Beasts.Ghoul]: "/monsters/ghoul.png",
  [Beasts.Wraith]: "/monsters/wraith.png",
  [Beasts.Sprite]: "/monsters/sprite.png",
  [Beasts.Kappa]: "/monsters/kappa.png",
  [Beasts.Fairy]: "/monsters/fairy.png",
  [Beasts.Leprechaun]: "/monsters/leprechaun.png",
  [Beasts.Kelpie]: "/monsters/kelpie.png",
  [Beasts.Pixie]: "/monsters/pixie.png",
  [Beasts.Gnome]: "/monsters/gnome.png",
  [Beasts.Griffin]: "/monsters/griffin.png",
  [Beasts.Manticore]: "/monsters/manticore.png",
  [Beasts.Phoenix]: "/monsters/phoenix.png",
  [Beasts.Dragon]: "/monsters/dragon.png",
  [Beasts.Minotaur]: "/monsters/minotaur.png",
  [Beasts.Qilin]: "/monsters/qilin.png",
  [Beasts.Ammit]: "/monsters/ammit.png",
  [Beasts.Nue]: "/monsters/nue.png",
  [Beasts.Skinwalker]: "/monsters/skinwalker.png",
  [Beasts.Chupacabra]: "/monsters/chupacabra.png",
  [Beasts.Weretiger]: "/monsters/weretiger.png",
  [Beasts.Wyvern]: "/monsters/wyvern.png",
  [Beasts.Roc]: "/monsters/roc.png",
  [Beasts.Harpy]: "/monsters/harpy.png",
  [Beasts.Pegasus]: "/monsters/pegasus.png",
  [Beasts.Hippogriff]: "/monsters/hippogriff.png",
  [Beasts.Fenrir]: "/monsters/fenrir.png",
  [Beasts.Jaguar]: "/monsters/jaguar.png",
  [Beasts.Satori]: "/monsters/satori.png",
  [Beasts.DireWolf]: "/monsters/direwolf.png",
  [Beasts.Bear]: "/monsters/bear.png",
  [Beasts.Wolf]: "/monsters/wolf.png",
  [Beasts.Mantis]: "/monsters/mantis.png",
  [Beasts.Spider]: "/monsters/spider.png",
  [Beasts.Rat]: "/monsters/rat.png",
  [Beasts.Kraken]: "/monsters/kraken.png",
  [Beasts.Colossus]: "/monsters/colossus.png",
  [Beasts.Balrog]: "/monsters/balrog.png",
  [Beasts.Leviathan]: "/monsters/leviathan.png",
  [Beasts.Tarrasque]: "/monsters/tarrasque.png",
  [Beasts.Titan]: "/monsters/titan.png",
  [Beasts.Nephilim]: "/monsters/nephilim.png",
  [Beasts.Behemoth]: "/monsters/behemoth.png",
  [Beasts.Hydra]: "/monsters/hydra.png",
  [Beasts.Juggernaut]: "/monsters/juggernaut.png",
  [Beasts.Oni]: "/monsters/oni.png",
  [Beasts.Jotunn]: "/monsters/jotunn.png",
  [Beasts.Ettin]: "/monsters/ettin.png",
  [Beasts.Cyclops]: "/monsters/cyclops.png",
  [Beasts.Giant]: "/monsters/giant.png",
  [Beasts.NemeanLion]: "/monsters/nemeanlion.png",
  [Beasts.Berserker]: "/monsters/berserker.png",
  [Beasts.Yeti]: "/monsters/yeti.png",
  [Beasts.Golem]: "/monsters/golem.png",
  [Beasts.Ent]: "/monsters/ent.png",
  [Beasts.Troll]: "/monsters/troll.png",
  [Beasts.Bigfoot]: "/monsters/bigfoot.png",
  [Beasts.Ogre]: "/monsters/ogre.png",
  [Beasts.Orc]: "/monsters/orc.png",
  [Beasts.Skeleton]: "/monsters/skeleton.png",
};
