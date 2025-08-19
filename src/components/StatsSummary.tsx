'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, PlayCircle, Star, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { Artist } from '@/lib/types';

interface StatsSummaryProps {
  artists: Artist[];
  totalArtists: number;
  title?: string;
}

const StatsSummary = ({ artists, totalArtists, title = "Statistics" }: StatsSummaryProps) => {
  if (artists.length === 0) {
    return (
      <Card className="mb-6 bg-card/50">
        <CardContent className="p-4 text-center text-muted-foreground">
          No artists found matching the current filters.
        </CardContent>
      </Card>
    );
  }

  const totalViews = artists.reduce((sum, artist) => sum + artist.totalViews, 0);
  const totalFollowers = artists.reduce((sum, artist) => sum + artist.followers, 0);
  const averageRating = artists.reduce((sum, artist) => sum + artist.rating, 0) / artists.length;
  const topArtist = artists.reduce((top, current) => 
    current.dancehallThrone > top.dancehallThrone ? current : top
  );

  return (
    <Card className="mb-6 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{artists.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {artists.length === totalArtists ? 'All Artists' : `of ${totalArtists}`}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <PlayCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{formatNumber(totalViews)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{formatNumber(totalFollowers)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Followers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>
        
        {artists.length > 0 && (
          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-center">
              <span className="font-semibold text-accent">{topArtist.name}</span> leads with{' '}
              <span className="font-bold">{topArtist.dancehallThrone}</span> throne points
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsSummary;
