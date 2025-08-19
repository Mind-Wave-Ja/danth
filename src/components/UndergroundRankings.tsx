'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { undergroundArtists } from '@/lib/data';
import type { Artist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown, Star, Users, PlayCircle, ShieldCheck, ArrowUpCircle, Search } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SortableTableHeader from './SortableTableHeader';
import StatsSummary from './StatsSummary';

const UndergroundRankings = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [sortKey, setSortKey] = useState<string>('overallRank');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Apply filters and sorting
    const filteredAndSortedArtists = useMemo(() => {
        let filtered = undergroundArtists.filter(artist => {
            // Search filter
            if (searchTerm && !artist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            // Rating filter
            if (ratingFilter) {
                const [min, max] = ratingFilter.split('-').map(Number);
                if (artist.rating < min || artist.rating > max) {
                    return false;
                }
            }
            
            return true;
        });

        // Sort artists
        const sorted = [...filtered].sort((a, b) => {
            let aValue: any, bValue: any;
            
            switch (sortKey) {
                case 'totalViews':
                    aValue = a.totalViews;
                    bValue = b.totalViews;
                    break;
                case 'followers':
                    aValue = a.followers;
                    bValue = b.followers;
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'overallRank':
                default:
                    aValue = a.overallRank;
                    bValue = b.overallRank;
                    break;
            }
            
            if (sortDirection === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
        
        return sorted;
    }, [searchTerm, ratingFilter, sortKey, sortDirection]);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setRatingFilter('');
    };

    const hasActiveFilters = searchTerm || ratingFilter;
    
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl font-headline uppercase">
                    <ArrowUpCircle className="w-8 h-8 text-accent"/>
                    Underground Division
                </CardTitle>
                <CardDescription>
                    The rising stars of dancehall. Top artists get promoted to Division 1 each year.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Filter Bar */}
                <div className="mb-6 p-4 bg-card/30 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Search className="w-5 h-5 text-accent" />
                            Filters
                        </h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="search">Search Artists</Label>
                            <Input
                                id="search"
                                placeholder="Artist name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="rating">Rating Range</Label>
                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="All ratings" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All ratings</SelectItem>
                                    <SelectItem value="8-9">8.0 - 8.9 (Excellent)</SelectItem>
                                    <SelectItem value="7-8">7.0 - 7.9 (Good)</SelectItem>
                                    <SelectItem value="6-7">6.0 - 6.9 (Average)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <StatsSummary 
                    artists={filteredAndSortedArtists} 
                    totalArtists={undergroundArtists.length}
                    title="Underground Division Statistics"
                />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Rank</TableHead>
                            <TableHead>Artist</TableHead>
                            <TableHead className="text-right">
                                <SortableTableHeader
                                    label="Views"
                                    sortKey="totalViews"
                                    currentSort={sortKey}
                                    currentDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="text-right">
                                <SortableTableHeader
                                    label="Followers"
                                    sortKey="followers"
                                    currentSort={sortKey}
                                    currentDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            </TableHead>
                            <TableHead className="text-right">
                                <SortableTableHeader
                                    label="Rating"
                                    sortKey="rating"
                                    currentSort={sortKey}
                                    currentDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedArtists.map((artist, index) => (
                            <TableRow key={artist.id}>
                                <TableCell className="font-bold text-2xl text-accent">
                                    <div className="flex items-center gap-2">
                                        {index + 1}
                                        {index < 3 && <ArrowUpCircle className="w-5 h-5 text-green-400" />}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={artist.avatar}
                                            alt={artist.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                            data-ai-hint="underground artist avatar"
                                            crossOrigin="anonymous"
                                        />
                                        <span className="font-medium">{artist.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatNumber(artist.totalViews)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatNumber(artist.followers)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                     <span className="flex items-center justify-end gap-1">{artist.rating.toFixed(1)} <Star className="w-4 h-4 text-yellow-400"/></span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default UndergroundRankings;
