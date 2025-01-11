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
        className="flex flex-col items-start text-black bg-primary w-full h-full absolute top-0 left-0 rounded-lg p-2"
        id={CardId}
      >
        <div style={{backgroundImage: `url(${imgUrl})`}} className="h-3/4 w-full bg-cover bg-no-repeat bg-blue-400" />
        <h2 className="text-xl">{heading}</h2>
        <p className="text-sm text-left">{discription}</p>
        <a
          target="_blank"
          className="text-base py-2 px-5 bg-green-300 rounded-md text-white hover:text-white"
          href={buttonLink}
        >
          Learn More
        </a>
      </div>
    </>
  );
}
