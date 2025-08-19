'use client';

import Link from 'next/link';
import { Flame, History, User, Crown, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { artists } from '@/lib/data';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof artists>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = artists.filter(artist =>
        artist.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleArtistClick = (artistId: string) => {
    setSearchQuery('');
    setShowSearchResults(false);
    // Navigate to artist page
    window.location.href = `/artist/${artistId}`;
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-card/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="h-8 w-8 text-accent" />
          <span className="text-2xl font-headline font-bold uppercase">Dancehall Throne</span>
        </Link>
        
        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 bg-card/50 border-border/50 focus:bg-card"
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50">
              {searchResults.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => handleArtistClick(artist.id)}
                  className="w-full p-3 text-left hover:bg-muted/50 flex items-center gap-3 border-b border-border/50 last:border-b-0"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-8 h-8 rounded-full"
                    crossOrigin="anonymous"
                  />
                  <div>
                    <div className="font-medium">{artist.name}</div>
                    <div className="text-sm text-muted-foreground">
                      #{artist.overallRank} • {artist.rating.toFixed(1)}⭐
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-2">
           <Link href="/queens-of-the-dancehall">
            <Button variant="ghost">
              <Crown className="mr-2 h-5 w-5" />
              Queen of Dancehall
            </Button>
          </Link>
          <Link href="/kings-on-the-run">
            <Button variant="ghost">
              <History className="mr-2 h-5 w-5" />
              Kings on the Run
            </Button>
          </Link>
          <Link href="/artist/1">
            <Button variant="ghost">
              <User className="mr-2 h-5 w-5" />
              Artist Profile
            </Button>
          </Link>
        </nav>
      </div>
      
      {/* Click outside to close search results */}
      {showSearchResults && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSearchResults(false)}
        />
      )}
    </header>
  );
};

export default Header;