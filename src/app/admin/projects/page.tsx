import HeaderActions from "./components/HeaderActions";

export default function BlogsPage() {
  return (
    <section className="flex flex-col items-start justify-start">
      <h2 className="text-3xl font-semibold mb-2">Manage Projects </h2>
      <p className="text-muted mb-4">
        Curate your portfolio's centerpiece! Add, edit, and showcase your standout projects that demonstrate your expertise.
      </p>
      <HeaderActions />
    </section>
  )
};