import Header from '@/components/Header';
import { artists } from '@/lib/data';
import ArtistProfileCard from '@/components/ArtistProfileCard';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

export default function QueenOfTheDancehallPage() {
  const allQueens = artists.filter(artist => artist.gender === 'female').sort((a,b) => a.overallRank - b.overallRank);
  const currentQueen = allQueens[0];
  const runnerUps = allQueens.slice(1);

  if (!currentQueen) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl font-bold">Queen not found</h1>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
       <div className="text-center my-8">
        <h1 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-wider text-shadow-lg">
          Queen of the Dancehall
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-body text-accent">Current Reigning Queen & Runner Ups</p>
      </div>
      <div className="flex-1 grid md:grid-cols-[256px_1fr] h-[calc(100vh-200px)]">
        <aside className="hidden md:flex flex-col border-r border-border p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Runner Ups</h2>
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-1 pr-2">
              {runnerUps.map((item) => (
                <Link key={item.id} href={`/artist/${item.id}`}>
                   <span
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
                    )}
                  >
                    <Crown className="h-4 w-4" />
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <ArtistProfileCard artist={currentQueen} />
        </main>
      </div>
    </div>
  );
}