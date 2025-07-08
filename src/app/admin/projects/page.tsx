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
  ];


  return (
    <section className="flex flex-col items-start justify-start">
      <h2 className="text-3xl font-semibold mb-2">Manage Projects </h2>
      <p className="text-muted mb-4">
        Curate your portfolio's centerpiece! Add, edit, and showcase your standout projects that demonstrate your expertise.
      </p>
      <HeaderActions />
      <div>
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