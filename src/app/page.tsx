import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import Testimonials from "../components/Testimonials";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../types/product";

async function getProducts(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <Slider />
      </section>
      <ProductGrid products={products} />
      <Testimonials />
    </div>
  );
}
