import HeaderActions from "./components/HeaderActions";
import BlogCard from "./components/card/BlogCard";

export default function BlogsPage() {
  return (
    <section className="flex flex-col items-start justify-start">
      <h2 className="text-3xl font-semibold mb-2">Manage Blogs </h2>
      <p className="text-muted">
        Create, edit, and manage your blog posts with ease. Let's get writing!
      </p>
      <HeaderActions />
      <div className="space-y-8 mt-4 w-full">
        {
          Array.from({ length: 4 }, (_, index) => (
            <BlogCard key={index} />
          ))
        }
      </div>
    </section>
  );
}