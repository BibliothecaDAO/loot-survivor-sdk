import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
export const AnimatedNumber = ({ value }: { value: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => latest.toFixed(2));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1 });
        return controls.stop;
    }, [count, value]);

    return <motion.span>{rounded}</motion.span>;
};
