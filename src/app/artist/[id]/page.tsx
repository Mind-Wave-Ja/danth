import Link from 'next/link';
import { artists } from '@/lib/data';
import ArtistProfileCard from '@/components/ArtistProfileCard';
import Header from '@/components/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

export default function ArtistPage({ params }: { params: { id: string } }) {
  const artist = artists.find((a) => a.id === params.id);

  if (!artist) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl font-bold">Artist not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex-1 grid md:grid-cols-[256px_1fr] h-[calc(100vh-80px)]">
        <aside className="hidden md:flex flex-col border-r border-border p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">All Artists</h2>
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-1 pr-2">
              {artists.map((item) => (
                <Link key={item.id} href={`/artist/${item.id}`}>
                   <span
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      params.id === item.id && 'bg-muted text-primary'
                    )}
                  >
                    <Flame className="h-4 w-4" />
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <ArtistProfileCard artist={artist} />
        </main>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return artists.map((artist) => ({
    id: artist.id,
  }));
}
