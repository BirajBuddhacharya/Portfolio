import HeaderActions from "./components/HeaderActions";
import BlogCard from "./components/card/BlogCard";

interface BlogPost {
  title: string;
  status: string;
  description: string;
  createdAt: string;
  coverImage: string;
  tags: string[];
}

const dummyBlogs: BlogPost[] = [
  {
    title: "Getting Started with TypeScript",
    status: "Published",
    description: "Learn the basics of TypeScript and how it can improve your development workflow.",
    createdAt: "Dec 15, 2023",
    coverImage: "https://picsum.photos/1200/600?random=1",
    tags: ["TypeScript", "Programming", "Web Dev"]
  },
  {
    title: "React Best Practices 2024",
    status: "Draft",
    description: "Explore the latest best practices and patterns in React development.",
    createdAt: "Dec 14, 2023",
    coverImage: "https://picsum.photos/1200/600?random=2",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    title: "The Future of AI in Web Development",
    status: "Published",
    description: "Discover how AI is transforming the landscape of web development.",
    createdAt: "Dec 13, 2023",
    coverImage: "https://picsum.photos/1200/600?random=3",
    tags: ["AI", "Technology", "Web Dev"]
  },
  {
    title: "Understanding CSS Grid",
    status: "Published",
    description: "Master CSS Grid layout with practical examples and tips.",
    createdAt: "Dec 12, 2023",
    coverImage: "https://picsum.photos/1200/600?random=4",
    tags: ["CSS", "Web Design", "Frontend"]
  },
  {
    title: "Node.js Performance Tips",
    status: "Published",
    description: "Optimize your Node.js applications with these performance tips.",
    createdAt: "Dec 11, 2023",
    coverImage: "https://picsum.photos/1200/600?random=5",
    tags: ["Node.js", "Backend", "Performance"]
  },
  {
    title: "Introduction to Web Security",
    status: "Draft",
    description: "Learn the fundamentals of web security and common vulnerabilities.",
    createdAt: "Dec 10, 2023",
    coverImage: "https://picsum.photos/1200/600?random=6",
    tags: ["Security", "Web Dev", "Programming"]
  },
  {
    title: "Modern State Management",
    status: "Published",
    description: "Compare different state management solutions in modern web development.",
    createdAt: "Dec 09, 2023",
    coverImage: "https://picsum.photos/1200/600?random=7",
    tags: ["React", "State Management", "Frontend"]
  },
  {
    title: "Building REST APIs",
    status: "Published",
    description: "A comprehensive guide to building RESTful APIs with best practices.",
    createdAt: "Dec 08, 2023",
    coverImage: "https://picsum.photos/1200/600?random=8",
    tags: ["API", "Backend", "Web Dev"]
  },
  {
    title: "Docker for Developers",
    status: "Draft",
    description: "Get started with Docker containerization for web applications.",
    createdAt: "Dec 07, 2023",
    coverImage: "https://picsum.photos/1200/600?random=9",
    tags: ["Docker", "DevOps", "Technology"]
  },
  {
    title: "Mastering Git Workflow",
    status: "Published",
    description: "Advanced Git techniques and workflow strategies for teams.",
    createdAt: "Dec 06, 2023",
    coverImage: "https://picsum.photos/1200/600?random=10",
    tags: ["Git", "Version Control", "Development"]
  }
];

export default function BlogsPage() {
  return (
  <section className="flex flex-col items-start justify-start">
    <h2 className="text-3xl font-semibold mb-2">Manage Blogs </h2>
    <p className="text-muted">
    Create, edit, and manage your blog posts with ease. Let's get writing!
    </p>
    <HeaderActions />
    <div className="space-y-8 mt-4 w-full">
    {dummyBlogs.map((blog, index) => (
      <BlogCard key={index} blog={blog} />
    ))}
    </div>
  </section>
  );
}