import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Ring from "@/components/icons/ring.svg";

export interface Item {
    id: number;
    name: string;
    greatness: number;
    type: "Weapon" | "Waist" | "Head" | "Feet" | "Hands" | "Chest";
}

export interface ItemBarProps {
    item: Item;
}

const ItemBar = ({ item }: ItemBarProps) => {
    // TODO: Inject actual greatness logic to next level
    const getBackgroundWidth = (greatness: number) => {
        return `${Math.min(100, Math.max(0, greatness))}%`;
    };

    return (
        <div className="w-full border p-3 rounded-2xl border-primary text-primary relative overflow-hidden uppercase group">
            <motion.div
                className="absolute inset-0 bg-primary opacity-20 rounded-r-2xl border-primary animate-pulse"
                initial={{ width: "0%" }}
                animate={{
                    width: getBackgroundWidth(item.greatness),
                }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
            <div className="relative z-10 flex justify-between">
                <div className="flex gap-4">
                    <Ring className="w-4" />
                    <div>{item.name}</div>
                </div>

                <div className="text-sm">Greatness: {item.greatness}</div>
            </div>

            <div className="bg-black/60 invisible group-hover:visible absolute top-0 left-0 z-20 w-full h-full"></div>

            <div className="absolute top-1 right-1 invisible group-hover:visible flex gap-2 z-30">
                <Button variant={"destructive"}>Drop</Button>
                <Button variant={"default"}>Bag</Button>
            </div>
        </div>
    );
};

export default ItemBar;
