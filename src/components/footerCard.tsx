import Image from 'next/image'

type FooterCardProps = {
  img: string;
  heading: string;
  content: string;
};

function FooterCard({ img, heading, content }: FooterCardProps) {
  return (
    <div className="flex w-72 gap-5 border-b-white border-b-2 h-16 my-1">
      <div className="h-full w-7 grid place-items-center">
        <Image src={img} alt="footer image" width={28} height={28} className="w-auto h-full" />
      </div>
      <div className="flex flex-col h-full justify-center text-left">
        <span className="text-sm text-neutral-light">{heading}</span>
        <span className="text-sm">{content}</span>
      </div>
    </div>
  );
}

export default FooterCard;
