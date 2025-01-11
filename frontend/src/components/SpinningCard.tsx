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
  return (
    <>
      <div
        className="flex flex-col justify-center items-center text-black bg-primary w-full h-full absolute top-0 left-0 rounded-lg"
        id={CardId}
      >
        <img src={imgUrl} className="h-20 w-20 bg-cover bg-no-repeat" />
        <h2 className="text-xl">{heading}</h2>
        <p className="text-sm">{discription}</p>
        <a
          target="_blank"
          className="text-base py-2 px-5 bg-primary rounded-md text-white hover:text-white"
          href={buttonLink}
        >
          Learn More
        </a>
      </div>
    </>
  );
}
