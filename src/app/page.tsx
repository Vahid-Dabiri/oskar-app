import Link from "next/link";

export default function Home() {
  return (
    <header className="px-10 py-5 fixed top-0 w-full bg-white">
      <Link href='/scraper' className="text-black font-bold text-lg p-10">Amazon Price Project</Link>
    </header>
  );
}
