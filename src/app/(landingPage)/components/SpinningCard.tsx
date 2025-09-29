'use client'
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image'

export default function SpinningCard({
  imgUrl,
  heading,
  discription,
  buttonLink,
  CardId,
}: {
  imgUrl: string;
  heading: string;
  discription: string;
  buttonLink: string;
  CardId: string;
}) {
  const controls = useAnimation();
  return (
    <>
      <motion.div
        onHoverStart={() => controls.start({ scale: 1.2 })}
        onHoverEnd={() => controls.start({ scale: 1 })}
        className="flex flex-col items-start text-black bg-[#1A1A23] w-full h-96 absolute top-0 left-0 rounded-lg p-2 "
        id={CardId}
      >
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            animate={controls}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={imgUrl}
              alt={`${heading} project image`}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
        <h2 className="text-xl w-full text-center mb-2 text-white">{heading}</h2>
        <p className="text-sm text-left text-white">{discription}</p>
        <div className="flex justify-center w-full mt-2">
          <motion.a
            target="_blank"
            className="text-base py-2 px-5 bg-primary rounded-md text-white hover:text-white"
            href={buttonLink}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
