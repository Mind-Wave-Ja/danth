'use client';
import { useRef, forwardRef } from 'react';
import type { Artist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Star, Download } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import html2canvas from 'html2canvas';

interface TraitProps {
  label: string;
  value: number;
}

const TraitBar = ({ label, value }: TraitProps) => (
  <div className="grid grid-cols-4 items-center gap-2 text-sm">
    <span className="font-medium col-span-1">{label}</span>
    <div className="col-span-2">
      <Progress value={value} className="h-4" />
    </div>
    <span className="font-bold text-right col-span-1">{value}/100</span>
  </div>
);

const ArtistCard = forwardRef<HTMLDivElement, { artist: Artist }>(({ artist }, ref) => (
  <Card 
    ref={ref}
    className="w-full max-w-sm rounded-2xl border-4 border-yellow-400 bg-gradient-to-br from-card via-card/80 to-background shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-accent/50 to-transparent" />
    <CardHeader className="text-center p-4 relative z-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-foreground">Dancehall</span>
        <div className="flex items-center gap-1">
           <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
           <span className="text-xl font-bold">{artist.rating.toFixed(1)}</span>
        </div>
      </div>
      <CardTitle className="text-3xl font-headline uppercase tracking-wider">{artist.name}</CardTitle>
    </CardHeader>
    <CardContent className="p-2">
      <div className="bg-yellow-400/10 border-2 border-yellow-400 rounded-lg p-2">
        <Image
          src={artist.avatar}
          alt={artist.name}
          width={400}
          height={400}
          className="w-full h-auto rounded-md"
          data-ai-hint="dancehall artist profile"
          crossOrigin="anonymous"
        />
      </div>
      <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 mt-2 border border-border">
        <CardDescription className="text-center text-xs mb-4 uppercase tracking-widest text-muted-foreground">
          Artist Traits
        </CardDescription>
        <div className="space-y-3">
          <TraitBar label="Style" value={artist.traits.style} />
          <TraitBar label="Delivery" value={artist.traits.delivery} />
          <TraitBar label="Lyrics" value={artist.traits.lyrics} />
          <TraitBar label="Flow" value={artist.traits.flow} />
          <TraitBar label="Adaptability" value={artist.traits.adaptability} />
          <TraitBar label="Originality" value={artist.traits.originality} />
          <TraitBar label="Versatility" value={artist.traits.versatility} />
          <TraitBar label="Impact" value={artist.traits.impact} />
          <TraitBar label="Stage Performance" value={artist.traits.stagePerformance} />
        </div>
        <Separator className="my-4 bg-border/50" />
        <div className="grid grid-cols-2 gap-4 text-center">
           <div>
              <p className="text-xs text-muted-foreground">Popularity</p>
              <p className="text-lg font-bold">{artist.traits.popularity}/100</p>
           </div>
           <div>
              <p className="text-xs text-muted-foreground">Fanbase</p>
              <p className="text-lg font-bold">{artist.traits.fanbase}/100</p>
           </div>
        </div>
      </div>
       <div className="text-center mt-4">
          <p className="text-xs font-mono text-muted-foreground">DANCEHALL THRONE ID: #{artist.id.padStart(4, '0')}</p>
      </div>
    </CardContent>
  </Card>
));
ArtistCard.displayName = 'ArtistCard';


export default function ArtistProfileCard({ artist }: { artist: Artist }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { 
        backgroundColor: null, 
        useCORS: true 
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `${artist.name.toLowerCase().replace(/ /g, '_')}_card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ArtistCard artist={artist} ref={cardRef} />
      <Button onClick={handleDownload} className="mt-6">
        <Download className="mr-2 h-4 w-4" />
        Download Card
      </Button>
    </div>
  );
}
