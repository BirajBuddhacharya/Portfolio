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
        className="flex flex-col items-start text-black bg-[#1A1A23] w-full h-96 absolute top-0 left-0 rounded-lg p-2"
        id={CardId}
      >
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          className="h-3/4 w-full bg-cover bg-no-repeat rounded-lg"
        />
        <h2 className="text-xl w-full text-center mb-2 text-white">{heading}</h2>
        <p className="text-sm text-left text-white">{discription}</p>
        <div className="flex justify-center w-full mt-2">
          <a
            target="_blank"
            className="text-base py-2 px-5 bg-primary rounded-md text-white hover:text-white"
            href={buttonLink}
          >
            Learn More
          </a>
        </div>
      </div>
    </>
  );
}
