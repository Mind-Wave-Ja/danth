import Header from '@/components/Header';
import PastKings from '@/components/PastKings';

export default function KingsOnTheRunPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-wider text-shadow-lg">
              Kings on the Run
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-body text-accent">A Look at Past Dancehall Royalty</p>
          </div>
          <PastKings />
        </div>
      </main>
      <footer className="bg-card py-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dancehall Throne. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
