"use client";

import { useMemo, useState } from "react";

type Provider = {
  name: string; service: string; description: string; price: string;
  rating: string; emoji: string; location: string; color: string;
  bio: string; distance: string; days: string[];
};

const categories = [
  { name: "Lawn Care", icon: "🌱" },
  { name: "Moving", icon: "📦" },
  { name: "Hair", icon: "✂️" },
  { name: "Car Detailing", icon: "🚗" },
  { name: "Personal Training", icon: "💪" },
];

const providers: Provider[] = [
  { name: "Marcus Green", service: "Lawn Care", description: "Lawn care & garden maintenance", price: "$35", rating: "4.9", emoji: "🌿", location: "Arlington, VA", color: "bg-green-100", bio: "Detail-oriented lawn care and garden maintenance. Building a local business one great yard at a time.", distance: "2.4 miles away", days: ["Mon", "Tue", "Wed", "Fri", "Sat"] },
  { name: "Sofia Martinez", service: "Hair", description: "Modern cuts & styling", price: "$45", rating: "5.0", emoji: "💇‍♀️", location: "Alexandria, VA", color: "bg-pink-100", bio: "Specializing in modern cuts, styling, and helping clients feel their best.", distance: "4.1 miles away", days: ["Tue", "Wed", "Thu", "Fri", "Sat"] },
  { name: "Jordan Blake", service: "Personal Training", description: "Personal fitness coaching", price: "$30", rating: "4.9", emoji: "🏋️", location: "Falls Church, VA", color: "bg-orange-100", bio: "Supportive one-on-one fitness coaching for all experience levels.", distance: "6.8 miles away", days: ["Mon", "Wed", "Thu", "Sat", "Sun"] },
  { name: "Alex Rivera", service: "Car Detailing", description: "Mobile auto detailing", price: "$50", rating: "4.8", emoji: "🚘", location: "Fairfax, VA", color: "bg-blue-100", bio: "Mobile detailing that brings a clean, polished finish right to your driveway.", distance: "8.2 miles away", days: ["Mon", "Tue", "Thu", "Fri", "Sat"] },
  { name: "Chris Taylor", service: "Moving", description: "Local moving & heavy lifting", price: "$40", rating: "4.9", emoji: "🚚", location: "McLean, VA", color: "bg-yellow-100", bio: "Reliable help with local moves, loading, unloading, and heavy lifting.", distance: "9.5 miles away", days: ["Tue", "Wed", "Fri", "Sat", "Sun"] },
];

const slots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

function todayString() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");
  const [location, setLocation] = useState("Arlington, VA");
  const [zip, setZip] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [bookingDate, setBookingDate] = useState(todayString());
  const [bookingTime, setBookingTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [signupType, setSignupType] = useState<"customer" | "business" | null>(null);
  const [signupDone, setSignupDone] = useState(false);

  const filtered = useMemo(() => providers.filter((provider) => {
    const matchesSearch = [provider.name, provider.service, provider.description].some((v) => v.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch && (selected === "All" || provider.service === selected);
  }), [search, selected]);

  async function useMyLocation() {
    setLocationMessage("");
    if (!navigator.geolocation) {
      setLocationMessage("Location isn't available in this browser. Enter a ZIP code instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation(`Your location (${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)})`),
      () => setLocationMessage("Location permission wasn't granted. You can enter your ZIP code instead."),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }

  function applyZip() {
    if (!/^\d{5}$/.test(zip.trim())) {
      setLocationMessage("Enter a valid 5-digit ZIP code.");
      return;
    }
    setLocation(`ZIP ${zip.trim()}`);
    setLocationMessage("Location updated for this demo.");
  }

  function openProvider(provider: Provider) {
    setActiveProvider(provider);
    setBookingDate(todayString());
    setBookingTime("");
    setBookingConfirmed(false);
  }

  function closeProvider() {
    setActiveProvider(null);
    setBookingConfirmed(false);
  }

  function openSignup(type: "customer" | "business") {
    setSignupType(type);
    setSignupDone(false);
    setJoinOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#243c2d]">
      <nav className="flex items-center justify-between border-b border-[#e8e9df] bg-white px-6 py-5 md:px-16">
        <a href="#" className="text-2xl font-black tracking-tight text-[#245b3b]">Up&<span className="text-[#e5a64c]">comer</span></a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#discover" className="hover:text-green-700">Discover</a>
          <a href="#categories" className="hover:text-green-700">Categories</a>
          <a href="#providers" className="hover:text-green-700">Find a Pro</a>
        </div>
        <button onClick={() => setJoinOpen(true)} className="rounded-full border border-[#245b3b] px-5 py-2 text-sm font-semibold text-[#245b3b] hover:bg-[#245b3b] hover:text-white">Sign up / Log in</button>
      </nav>

      <section id="discover" className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#b47b32]">Discover emerging local talent</p>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">Discover your next<span className="block text-[#39764c]">favorite local pro.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#68776b]">Find talented up-and-comers offering quality services at prices that make sense. Support local talent while they're on the rise.</p>
          </div>

          <div className="mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg shadow-green-950/5 sm:flex-row">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="What service are you looking for?" className="min-w-0 flex-1 rounded-xl bg-[#f5f6f1] px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-green-700" />
            <a href="#providers" className="rounded-xl bg-[#245b3b] px-8 py-4 text-center font-bold text-white hover:bg-[#19452c]">Find a pro →</a>
          </div>

          <div className="mt-5 max-w-3xl rounded-2xl border border-[#e8e9df] bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-wider text-[#b47b32]">Your search area</p><p className="mt-1 font-semibold">📍 {location}</p></div>
              <button onClick={useMyLocation} className="rounded-full border border-[#245b3b] px-4 py-2 text-sm font-semibold text-[#245b3b] hover:bg-[#edf4ec]">Use my location</button>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" maxLength={5} placeholder="Enter ZIP code" className="w-full rounded-xl bg-[#f5f6f1] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-700 sm:max-w-xs" />
              <button onClick={applyZip} className="rounded-xl bg-[#245b3b] px-5 py-3 text-sm font-bold text-white">Update location</button>
            </div>
            {locationMessage && <p className="mt-2 text-xs text-[#8a6330]">{locationMessage}</p>}
            <p className="mt-2 text-xs text-[#849087]">Demo note: location is used only in this page session. Provider distances are sample data.</p>
          </div>
          <p className="mt-4 text-sm text-[#849087]">Great services. Fair prices. The next generation of local talent.</p>
        </div>
      </section>

      <section id="categories" className="border-y border-[#e8e9df] bg-white px-6 py-14 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-sm font-bold uppercase tracking-widest text-[#b47b32]">Explore</p><h2 className="mt-2 text-3xl font-extrabold">What do you need done?</h2></div>
            <button onClick={() => setSelected("All")} className="text-sm font-semibold text-[#39764c]">View all services →</button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((category) => <button key={category.name} onClick={() => { setSelected(category.name); document.getElementById("providers")?.scrollIntoView({ behavior: "smooth" }); }} className={`rounded-2xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-md ${selected === category.name ? "border-[#39764c] bg-[#edf4ec]" : "border-[#e8e9df] bg-[#faf9f5]"}`}><span className="text-3xl">{category.icon}</span><p className="mt-4 font-bold">{category.name}</p><p className="mt-1 text-xs text-[#849087]">Explore pros →</p></button>)}
          </div>
        </div>
      </section>

      <section id="providers" className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#b47b32]">Meet the talent</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl font-extrabold">Local pros on the rise.</h2><button onClick={() => setSelected("All")} className="text-sm font-semibold text-[#39764c]">Clear filters</button></div>
          <p className="mt-3 text-[#68776b]">Discover skilled providers building their businesses and reputation.</p>
          <div className="mt-8 flex flex-wrap gap-2">{["All", ...categories.map((c) => c.name)].map((name) => <button key={name} onClick={() => setSelected(name)} className={`rounded-full px-4 py-2 text-sm font-semibold ${selected === name ? "bg-[#245b3b] text-white" : "border border-[#dfe4dc] bg-white text-[#536458] hover:bg-[#edf4ec]"}`}>{name}</button>)}</div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((provider) => <article key={provider.name} className="overflow-hidden rounded-2xl border border-[#e8e9df] bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`flex h-40 items-center justify-center ${provider.color}`}><span className="text-7xl">{provider.emoji}</span></div>
              <div className="p-6">
                <div className="flex items-center justify-between"><span className="rounded-full bg-[#edf4ec] px-3 py-1 text-xs font-bold text-[#39764c]">Emerging provider</span><span className="text-sm font-bold">★ {provider.rating}</span></div>
                <h3 className="mt-4 text-xl font-extrabold">{provider.name}</h3><p className="mt-1 text-sm text-[#68776b]">{provider.description}</p>
                <p className="mt-3 text-xs text-[#849087]">📍 {provider.location} · {provider.distance}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-4"><p className="text-sm text-[#68776b]">From <span className="text-lg font-extrabold text-[#245b3b]">{provider.price}</span></p><button onClick={() => openProvider(provider)} className="rounded-full bg-[#245b3b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#19452c]">View profile →</button></div>
              </div>
            </article>)}
          </div>
          {filtered.length === 0 && <p className="mt-10 rounded-xl bg-white p-8 text-center text-[#68776b]">No providers found. Try another search or category.</p>}
        </div>
      </section>

      <section className="bg-[#245b3b] px-6 py-16 text-center text-white md:px-16">
        <h2 className="text-3xl font-extrabold">Good at what you do?</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-green-100">Build your reputation, find new customers, and grow your business with Up&comer.</p>
        <button onClick={() => openSignup("business")} className="mt-7 rounded-full bg-[#f0bd70] px-7 py-3 font-bold text-[#243c2d] hover:bg-[#f5cb8d]">Become a provider</button>
      </section>
      <footer className="bg-[#193f2a] px-6 py-8 text-center text-sm text-green-100">© 2026 Up&comer. Discover talent on the rise.</footer>

      {joinOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setJoinOpen(false)}><div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b47b32]">Join the community</p><h2 className="mt-2 text-2xl font-extrabold">How will you use Up&comer?</h2></div><button onClick={() => setJoinOpen(false)} className="text-2xl text-gray-400">×</button></div>
        <div className="mt-6 grid gap-3"><button onClick={() => openSignup("customer")} className="rounded-2xl border border-[#dfe4dc] p-5 text-left hover:border-[#39764c] hover:bg-[#f3f7f1]"><span className="text-2xl">🛍️</span><p className="mt-2 font-bold">I'm a customer</p><p className="text-sm text-[#68776b]">Discover and book local services.</p></button><button onClick={() => openSignup("business")} className="rounded-2xl border border-[#dfe4dc] p-5 text-left hover:border-[#39764c] hover:bg-[#f3f7f1]"><span className="text-2xl">🚀</span><p className="mt-2 font-bold">I'm a service provider</p><p className="text-sm text-[#68776b]">List my business and find customers.</p></button></div>
      </div></div>}

      {signupType && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4" onClick={() => setSignupType(null)}><div className="my-8 w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b47b32]">{signupType === "customer" ? "Customer registration" : "Provider registration"}</p><h2 className="mt-2 text-2xl font-extrabold">{signupDone ? "You're on the list!" : signupType === "customer" ? "Create your customer profile" : "Create your business profile"}</h2></div><button onClick={() => setSignupType(null)} className="text-2xl text-gray-400">×</button></div>
        {signupDone ? <div className="py-8"><div className="text-5xl">🎉</div><p className="mt-4 text-[#536458]">Your demo profile has been submitted. No account was created and no information was sent to a server.</p><button onClick={() => setSignupType(null)} className="mt-6 rounded-full bg-[#245b3b] px-6 py-3 font-bold text-white">Back to Up&comer</button></div> :
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSignupDone(true); }}>
          <label className="text-sm font-semibold">First name<input required placeholder="First name" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">Last name<input required placeholder="Last name" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">Email<input required type="email" placeholder="you@example.com" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">Phone<input required type="tel" placeholder="(555) 555-5555" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          {signupType === "business" && <><label className="text-sm font-semibold sm:col-span-2">Business name<input required placeholder="Your business name" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label><label className="text-sm font-semibold">Business category<select required defaultValue="" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700"><option value="" disabled>Select a category</option>{categories.map(c => <option key={c.name}>{c.name}</option>}<option>Other</option></select></label><label className="text-sm font-semibold">Years in business<select defaultValue="Just starting" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700"><option>Just starting</option><option>Less than 1 year</option><option>1–3 years</option><option>3+ years</option></select></label></>}
          <label className="text-sm font-semibold sm:col-span-2">Street address<input required placeholder="Street address" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">City<input required placeholder="City" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">State<input required placeholder="State" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          <label className="text-sm font-semibold">ZIP code<input required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} placeholder="ZIP code" className="mt-1 w-full rounded-xl bg-[#f5f6f1] p-3 font-normal outline-none focus:ring-2 focus:ring-green-700" /></label>
          {signupType === "business" && <label className="flex items-start gap-3 rounded-xl bg-[#f5f6f1] p-4 text-sm sm:col-span-2"><input required type="checkbox" className="mt-1 accent-[#245b3b]" /><span>I consent to Up&comer conducting a background check, subject to applicable disclosures and authorization. <span className="block text-xs text-[#849087]">Demo only: this checkbox does not initiate a background check.</span></span></label>}
          <p className="text-xs text-[#849087] sm:col-span-2">Demo form only. Do not enter sensitive personal information. Details are not saved or transmitted.</p>
          <button type="submit" className="rounded-full bg-[#245b3b] px-6 py-3 font-bold text-white sm:col-span-2">Submit demo registration</button>
        </form>}
      </div></div>}

      {activeProvider && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4" onClick={closeProvider}><div className="my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b47b32]">Emerging local provider</p><h2 className="mt-2 text-2xl font-extrabold">{activeProvider.name}</h2><p className="mt-1 text-sm text-[#68776b]">{activeProvider.service} · ★ {activeProvider.rating} · {activeProvider.location}</p></div><button onClick={closeProvider} className="text-2xl text-gray-400">×</button></div>
        <div className={`mt-5 flex h-28 items-center justify-center rounded-2xl ${activeProvider.color}`}><span className="text-6xl">{activeProvider.emoji}</span></div>
        <p className="mt-4 leading-7 text-[#536458]">{activeProvider.bio}</p>
        <div className="mt-5 rounded-2xl border border-[#e8e9df] p-5">
          {bookingConfirmed ? <div className="py-5 text-center"><div className="text-4xl">✅</div><h3 className="mt-3 text-xl font-extrabold">Booking request confirmed!</h3><p className="mt-2 text-sm text-[#68776b]">Demo booking with {activeProvider.name} for {bookingDate} at {bookingTime}. No real appointment was created.</p><button onClick={closeProvider} className="mt-5 rounded-full bg-[#245b3b] px-6 py-3 font-bold text-white">Done</button></div> : <>
            <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-extrabold">Book an appointment</h3><p className="font-bold text-[#245b3b]">From {activeProvider.price}</p></div>
            <label className="mt-4 block text-sm font-semibold">Choose a date<input type="date" min={todayString()} value={bookingDate} onChange={(e) => { setBookingDate(e.target.value); setBookingTime(""); }} className="mt-2 w-full rounded-xl border border-[#dfe4dc] bg-[#faf9f5] p-3 outline-none focus:ring-2 focus:ring-green-700" /></label>
            <p className="mt-4 text-sm font-semibold">Available times</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{slots.map((slot, i) => <button key={slot} onClick={() => setBookingTime(slot)} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${bookingTime === slot ? "border-[#245b3b] bg-[#245b3b] text-white" : "border-[#dfe4dc] hover:border-[#39764c] hover:bg-[#edf4ec]"}`}>{slot}{i === 2 ? " · Popular" : ""}</button>)}</div>
            <p className="mt-3 text-xs text-[#849087]">Sample availability for demonstration. Provider schedules are not connected to a live calendar.</p>
            <button disabled={!bookingDate || !bookingTime} onClick={() => setBookingConfirmed(true)} className="mt-5 w-full rounded-full bg-[#245b3b] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Request booking</button>
          </>}
        </div>
      </div></div>}
    </main>
  );
}
