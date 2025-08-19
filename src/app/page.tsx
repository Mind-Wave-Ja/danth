import Header from '@/components/Header';
import ArtistRankings from '@/components/ArtistRankings';
import { Badge } from '@/components/ui/badge';
import UndergroundRankings from '@/components/UndergroundRankings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowUpCircle } from 'lucide-react';


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div id="home" className="relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
              <source src="https://firebasestorage.googleapis.com/v0/b/builder-3b9c7.appspot.com/o/projects%2Ftest-app-1725574169992%2Friddim_vault_bg.mp4?alt=media&token=c1117148-3c3b-4830-80a6-51d09e519e5d" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="z-10 text-white p-4">
              <h1 className="text-5xl md:text-8xl font-headline font-bold uppercase tracking-wider text-shadow-lg">
                Dancehall Throne
              </h1>
              <p className="mt-4 text-lg md:text-2xl font-body text-accent">Who's Dominating the Scene?</p>
              <Badge variant="secondary" className="mt-4">Rankings Updated Weekly</Badge>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <Tabs defaultValue="division1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="division1">
                <Shield className="mr-2 h-5 w-5" />
                Division 1 - The Main Stage
              </TabsTrigger>
              <TabsTrigger value="underground">
                <ArrowUpCircle className="mr-2 h-5 w-5" />
                Underground Division
              </TabsTrigger>
            </TabsList>
            <TabsContent value="division1">
              <ArtistRankings />
            </TabsContent>
            <TabsContent value="underground">
              <UndergroundRankings />
            </TabsContent>
          </Tabs>
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
