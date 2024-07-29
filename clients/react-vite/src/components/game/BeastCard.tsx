import { Button } from "../ui/button";
import { RoundedContainer } from "./RoundedContainer";
import { motion } from "framer-motion";

export interface Beast {
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  image: string;
}

export const BeastCard = ({ beast }: { beast: Beast }) => {
  return (
    <RoundedContainer inner className="text-primary bg-beast-red/50 relative">
      <div className="text-5xl  p-10 text-center uppercase">{beast.name}</div>
      <RoundedContainer inner>
        <div className="flex justify-between gap-8 p-6 py-4">
          <div className="self-center">Tier 1</div>
          <div className="flex-grow mx-2 relative">
            <div className="w-full rounded-2xl h-6 border border-primary overflow-hidden">
              <motion.div
                className="bg-beast-red/50 h-full rounded-2xl border-r border-primary"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(beast.health / beast.maxHealth) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <div className="text-xs text-center mt-1 flex justify-center absolute top-0 px-3 w-full">
              <div>
                {beast.health}/{beast.maxHealth} HP
              </div>
            </div>
          </div>

          <div className="self-center">lvl. {beast.level}</div>
        </div>
        <RoundedContainer inner>
          <img
            src={beast.image}
            alt=""
            className="w-full object-cover border border-primary rounded-2xl"
          />
        </RoundedContainer>
      </RoundedContainer>
      <RoundedContainer className="absolute bottom-36 left-0 right-0 p-4 bg-black/90 mx-8">
        {/* Add your content here */}
        <div>
          Giant: argghhh, who do you think you are!!! I will crush your skull
          and eat your flesh! Time to die human.
        </div>
      </RoundedContainer>
      <RoundedContainer
        inner
        className="absolute bottom-0 left-0 right-0 p-4 bg-black/90 flex justify-between"
      >
        <div className="flex flex-col gap-4">
          <Button variant="destructive">Attack</Button>
          <Button variant="default">Attack Till Death</Button>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="default">Flee</Button>
          <Button variant="default">Flee Till Death</Button>
        </div>
      </RoundedContainer>
    </RoundedContainer>
  );
};
