import "./App.css";
import cardImg from "/src/assets/cardImg.jpg";

function Card({ image, heading, description, buttonLink }) {
  return (
    <>
      <div className="bg-red-400 rounded-lg flex flex-col justify-center p-4">
        <img src={image} alt="image" className="h-60 w-full" />
        <div className="lg:text-3xl sm:text-2xl font-bold">{heading}</div>
        <p>{description}</p>
        <a href={buttonLink}>Click me</a>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <header className="lg:px-40 sm:px-2 mb-12">
        <nav className="flex gap-12 justify-center text-white bg-gray-800 p-4">
          <a href="#home">Home</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
        </nav>
      </header>
      <div className="flex flex-wrap justify-center gap-4">
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />{" "}
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />{" "}
        <Card
          image={cardImg}
          heading="Sample Heading"
          description="This is a sample description."
          buttonLink="https://example.com"
        />
      </div>
      <form action="" className="border-white gap-4 p-4 border-2 my-10 rounded-lg flex flex-col w-full justify-center items-center">
        <div className="flex gap-2">
          <label htmlFor="name">name:</label>
          <input type="text" placeholder="Enter your name" className="border p-2 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" placeholder="Enter your phone number" className="border p-2 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <label htmlFor="email">email:</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" className="border p-2 rounded-lg" />
        </div>
        <input type="button" value="submit" className="bg-white rounded-full text-black py-2 px-10"/>
      </form>
    </>
  );
}

export default App;
