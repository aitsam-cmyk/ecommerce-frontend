import type { Metadata } from "next";
import Image from "next/image";

async function getProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProduct(params.id);
  return {
    title: p ? `${p.title} • E‑Shop` : "Product • E‑Shop",
    description: p?.description,
    openGraph: {
      images: p?.imageUrl ? [{ url: p.imageUrl }] : undefined
    }
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const p = await getProduct(params.id);
  if (!p) {
    return <div className="mx-auto max-w-3xl px-4 py-10">Product not found</div>;
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100">
        <Image src={p.imageUrl} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="font-serif text-2xl">{p.title}</h1>
        <p className="text-zinc-600">{p.description}</p>
        <div className="text-2xl font-semibold">${Number(p.price).toFixed(2)}</div>
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-white transition hover:scale-[1.02]">Add to cart</button>
      </div>
    </div>
  );
}
