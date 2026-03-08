import { BubbleWorld } from "@/components/home/BubbleWorld";

export default function Home() {
  return (
    <main id="main" className="min-h-screen bg-black" role="main">
      <p className="sr-only">Benny Bellson — Artist world. Interactive bubble navigation.</p>
      <BubbleWorld />
    </main>
  );
}
