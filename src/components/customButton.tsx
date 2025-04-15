'use client';
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Cover } from "@/components/components/ui/cover";
import { cn } from "@/components/lib/utils";
import Image from 'next/image'
interface ButtonProp {
    text: string;
    className?: string;
    loading?: boolean;
}

export default function CustomButton({ text, className, loading }: ButtonProp) {
    const [hover, setHover] = useState(false);
    const [entryPoint, setEntryPoint] = useState({ x: 0, y: 0 });
    const controls = useAnimation();

    const handleMouseEnter = (event) => {
        setHover(true);

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setEntryPoint({ x, y });

        // Set initial position and scale
        controls.set({
            left: x,
            top: y,
            opacity: 1,
            scale: 0,
            pointerEvents: "none",
        });

        // Animate the circle to grow
        controls.start({
            scale: 5,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        });
    };

    const handleMouseLeave = () => {
        setHover(false);

        controls.start({
            opacity: 0,
            scale: 0,
            transition: { duration: 0.3 },
        });
    };

    return (
        <motion.button
            className={cn(
                "relative w-45 h-12 rounded-full overflow-hidden bg-card hover:cursor-pointer flex justify-center items-center", 
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 10 } }}
            whileTap={{ scale: 0.9 }}
            type={'submit'}
        >
            {/* Ripple Circle */}
            <motion.div
                animate={controls}
                initial={{ scale: 0, opacity: 0 }}
                className="absolute w-24 h-24 bg-primary rounded-full z-0"
                style={{
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    pointerEvents: "none",
                }}
            />

            {/* Button content */}
            {loading ? (
                <div className="relative z-10 w-8 h-8">
                    <Image src='/loadingAnimation.gif' alt='Loading animation' layout="fill" objectFit="contain" priority unoptimized />
                </div>
            ) : (
                <Cover className="relative z-10 text-white" hovered={hover}>
                    {text}
                </Cover>
            )}
        </motion.button>
    );
}
