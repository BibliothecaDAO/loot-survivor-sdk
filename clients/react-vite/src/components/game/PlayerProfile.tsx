import { motion } from "framer-motion";

export interface PlayerProfileProps {
  name: string;
  id: number;
  avatar: string;
  gold: number;
  health: number;
  maxHealth: number;
  level: number;
}

export const PlayerProfile = ({ player }: { player: PlayerProfileProps }) => {
  return (
    <div className="flex gap-4">
      <img
        className="rounded-3xl border border-primary"
        src={player.avatar}
        alt=""
      />
      <div className="w-full p-3 text-primary">
        <h6>#{player.id}</h6>
        <div className="text-4xl">{player.name}</div>
        <div className="flex gap-4 flex-wrap mt-4">
          <HealthBar health={player.health} maxHealth={player.maxHealth} />
          <GoldBar gold={player.gold} />

          <XpBar level={player.level} xp={50} maxXp={100} />
        </div>
      </div>
    </div>
  );
};

export const GoldBar = ({ gold }: { gold: number }) => {
  return (
    <div className="flex gap-4 justify-center rounded-2xl h-12 border border-primary px-4 w-1/2 bg-yellow-900/40">
      <div className="text-center self-center">Gold: {gold}</div>
    </div>
  );
};

export const XpBar = ({
  level,
  xp,
  maxXp,
}: {
  level: number;
  xp: number;
  maxXp: number;
}) => {
  return (
    <div className="flex-grow relative w-full">
      <div className="w-full rounded-2xl h-6 border border-primary overflow-hidden">
        <motion.div
          className="bg-beast-purple/50 h-full rounded-2xl border-r border-primary"
          initial={{ width: "0%" }}
          animate={{
            width: `${(xp / maxXp) * 100}%`,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>
      <div className="text-xs text-center mt-1 flex justify-center absolute top-0 px-3 w-full">
        <div className="text-primary">
          Level: {level} - XP: {xp}/{maxXp}
        </div>
      </div>
    </div>
  );
};

export const HealthBar = ({
  health,
  maxHealth,
}: {
  health: number;
  maxHealth: number;
}) => {
  return (
    <div className="flex-grow relative">
      <div className="w-full rounded-2xl border border-primary overflow-hidden h-12 flex items-center justify-center">
        <motion.div
          className="bg-primary/50 h-full rounded-2xl border-r border-primary absolute left-0"
          initial={{ width: "0%" }}
          animate={{
            width: `${(health / maxHealth) * 100}%`,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
        <div className=" z-10">
          {health}/{maxHealth} HP
        </div>
      </div>
    </div>
  );
};
