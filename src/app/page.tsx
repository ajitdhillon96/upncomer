
"use client";

import { useState } from "react";

const categories = [
  { name: "Lawn Care", icon: "🌱" },
  { name: "Moving", icon: "📦" },
  { name: "Hair", icon: "✂️" },
  { name: "Car Detailing", icon: "🚗" },
  { name: "Personal Training", icon: "💪" },
];

const providers = [
  { name: "Marcus Green", service: "Lawn Care", description: "Lawn care & garden maintenance", price: "$35", rating: "4.9", emoji: "🌿", location: "Los Angeles, CA", color: "bg-green-100" },
  { name: "Sofia Martinez", service: "Hair", description: "Modern cuts & styling", price: "$45", rating: "5.0", emoji: "💇‍♀️", location: "Los Angeles, CA", color: "bg-pink-100" },
  { name: "Jordan Blake", service: "Personal Training", description: "Personal fitness coaching", price: "$30", rating: "4.9", emoji: "🏋️", location: "Los Angeles, CA", color: "bg-orange-100" },
  { name: "Alex Rivera", service: "Car Detailing", description: "Mobile auto detailing", price: "$50", rating: "4.8", emoji: "🚘", location: "Los Angeles, CA", color: "bg-blue-100" },
  { name: "Chris Taylor", service: "Moving", description: "Local moving & heavy lifting", price: "$40", rating: "4.9", emoji: "🚚", location: "Los Angeles, CA", color: "bg-yellow-100" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");

  const filtered = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.service.toLowerCase().includes(search.toLowerCase()) ||
      provider.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selected === "All" || provider.service === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#243c2d]">
      <nav className="flex items-center justify-between border-b border-[#e8e9df] bg-white px-6 py-5 md:px-16">
        <a href="#" className="text-2xl font-black tracking-tight text-[#245b3b]">
          Up&<span className="text-[#e5a64c]">comer</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#discover" className="hover:text-green-700">Discover</a>
          <a href="#categories" className="hover:text-green-700">Categories</a>
          <a href="#providers" className="hover:text-green-700">Find a Pro</a>
        </div>
        <button className="rounded-full border border-[#245b3b] px-5 py-2 text-sm font-semibold text-[#245b3b] hover:bg-[#245b3b] hover:text-white">
          Join Up&comer
        </button>
      </nav>

      <section id="discover" className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#b47b32]">
              Discover emerging local talent
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Discover your next
              <span className="block text-[#39764c]">favorite local pro.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#68776b]">
              Find talented up-and-comers offering quality services at prices
              that make sense. Support local talent while they're on the rise.
            </p>
          </div>

          <div className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg shadow-green-950/5 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What service are you looking for?"
              className="min-w-0 flex-1 rounded-xl bg-[#f5f6f1] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-green-700"
            />
            <a href="#providers" className="rounded-xl bg-[#245b3b] px-8 py-4 text-center font-bold text-white hover:bg-[#19452c]">
              Find a pro →
            </a>
          </div>

          <p className="mt-4 text-sm text-[#849087]">
            Great services. Fair prices. The next generation of local talent.
          </p>
        </div>
      </section>

      <section id="categories" className="border-y border-[#e8e9df] bg-white px-6 py-14 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#b47b32]">Explore</p>
              <h2 className="mt-2 text-3xl font-extrabold">What do you need done?</h2>
            </div>
            <button onClick={() => setSelected("All")} className="text-sm font-semibold text-[#39764c]">
              View all services →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelected(category.name);
                  document.getElementById("providers")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`rounded-2xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  selected === category.name
                    ? "border-[#39764c] bg-[#edf4ec]"
                    : "border-[#e8e9df] bg-[#faf9f5]"
                }`}
              >
                <span className="text-3xl">{category.icon}</span>
                <p className="mt-4 font-bold">{category.name}</p>
                <p className="mt-1 text-xs text-[#849087]">Explore pros →</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="providers" className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#b47b32]">Meet the talent</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold">Local pros on the rise.</h2>
            <button onClick={() => setSelected("All")} className="text-sm font-semibold text-[#39764c]">
              Clear filters
            </button>
          </div>

          <p className="mt-3 text-[#68776b]">
            Discover skilled providers building their businesses and reputation.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["All", ...categories.map((c) => c.name)].map((name) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  selected === name
                    ? "bg-[#245b3b] text-white"
                    : "border border-[#dfe4dc] bg-white text-[#536458] hover:bg-[#edf4ec]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((provider) => (
              <article key={provider.name} className="overflow-hidden rounded-2xl border border-[#e8e9df] bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className={`flex h-40 items-center justify-center ${provider.color}`}>
                  <span className="text-7xl">{provider.emoji}</span>
                  <span className="absolute" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#edf4ec] px-3 py-1 text-xs font-bold text-[#39764c]">
                      Emerging provider
                    </span>
                    <span className="text-sm font-bold">★ {provider.rating}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold">{provider.name}</h3>
                  <p className="mt-1 text-sm text-[#68776b]">{provider.description}</p>
                  <p className="mt-3 text-xs text-[#849087]">📍 {provider.location}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-4">
                    <p className="text-sm text-[#68776b]">
                      From <span className="text-lg font-extrabold text-[#245b3b]">{provider.price}</span>
                    </p>
                    <button className="rounded-full bg-[#245b3b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#19452c]">
                      View profile →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 rounded-xl bg-white p-8 text-center text-[#68776b]">
              No providers found. Try another search or category.
            </p>
          )}
        </div>
      </section>

      <section className="bg-[#245b3b] px-6 py-16 text-center text-white md:px-16">
        <h2 className="text-3xl font-extrabold">Good at what you do?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100">
          Build your reputation, find new customers, and grow your business
          with Up&comer.
        </p>
        <button className="mt-7 rounded-full bg-[#f0bd70] px-7 py-3 font-bold text-[#243c2d] hover:bg-[#f5cb8d]">
          Become a provider
        </button>
      </section>

      <footer className="bg-[#193f2a] px-6 py-8 text-center text-sm text-green-100">
        © 2026 Up&comer. Discover talent on the rise.
      </footer>
    </main>
  );
}
