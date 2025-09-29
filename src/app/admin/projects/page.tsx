import HeaderActions from "./components/HeaderActions";
import Masonry from '@/components/ui/massonry';

export default function BlogsPage() {
  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1025/600/700?grayscale",
      url: "https://example.com/four",
      height: 350,
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1035/600/850?grayscale",
      url: "https://example.com/five",
      height: 500,
    },
    {
      id: "6",
      img: "https://picsum.photos/id/1040/600/950?grayscale",
      url: "https://example.com/six",
      height: 450,
    },
    {
      id: "7",
      img: "https://picsum.photos/id/1050/600/800?grayscale",
      url: "https://example.com/seven",
      height: 300,
    },
    {
      id: "8",
      img: "https://picsum.photos/id/1060/600/900?grayscale",
      url: "https://example.com/eight",
      height: 550,
    },
    {
      id: "9",
      img: "https://picsum.photos/id/1070/600/750?grayscale",
      url: "https://example.com/nine",
      height: 400,
    },
    {
      id: "10",
      img: "https://picsum.photos/id/1080/600/850?grayscale",
      url: "https://example.com/ten",
      height: 350,
    },
  ];


  return (
    <section className="flex flex-col items-start justify-start min-h-screen">
      <h2 className="text-3xl font-semibold mb-2">Manage Projects </h2>
      <p className="text-muted mb-4">
        Curate your portfolio's centerpiece! Add, edit, and showcase your standout projects that demonstrate your expertise.
      </p>
      <HeaderActions />
      <div className="w-full">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  )
};