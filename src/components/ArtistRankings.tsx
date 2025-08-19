'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { artists } from '@/lib/data';
import type { Artist } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Star, Users, PlayCircle, Trophy, ShieldCheck, History, User } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import FilterBar, { FilterState } from './FilterBar';
import SortableTableHeader from './SortableTableHeader';
import StatsSummary from './StatsSummary';

type SortKey = 'overallRank' | 'totalViews' | 'followers' | 'rating' | 'dancehallThrone' | 'veterans' | 'queens';

const ArtistRankings = () => {
    const [activeTab, setActiveTab] = useState<SortKey>('overallRank');
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        gender: '',
        veteranStatus: '',
        ratingRange: '',
        viewRange: '',
        followerRange: '',
    });
    const [sortKey, setSortKey] = useState<string>('overallRank');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const topQueen = artists.filter(a => a.gender === 'female').sort((a,b) => a.overallRank - b.overallRank)[0];

    // Apply filters to artists
    const filteredArtists = useMemo(() => {
        return artists.filter(artist => {
            // Search filter
            if (filters.search && !artist.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            
            // Gender filter
            if (filters.gender && artist.gender !== filters.gender) {
                return false;
            }
            
            // Veteran status filter
            if (filters.veteranStatus !== '') {
                const isVeteran = filters.veteranStatus === 'true';
                if (artist.isVeteran !== isVeteran) {
                    return false;
                }
            }
            
            // Rating range filter
            if (filters.ratingRange) {
                const [min, max] = filters.ratingRange.split('-').map(Number);
                if (artist.rating < min || artist.rating > max) {
                    return false;
                }
            }
            
            // View range filter
            if (filters.viewRange) {
                const threshold = filters.viewRange.replace(/[^\d]/g, '');
                const multiplier = filters.viewRange.includes('B') ? 1000000000 : 
                                 filters.viewRange.includes('M') ? 1000000 : 1000;
                if (artist.totalViews < parseInt(threshold) * multiplier) {
                    return false;
                }
            }
            
            // Follower range filter
            if (filters.followerRange) {
                const threshold = filters.followerRange.replace(/[^\d]/g, '');
                const multiplier = filters.followerRange.includes('M') ? 1000000 : 1000;
                if (artist.followers < parseInt(threshold) * multiplier) {
                    return false;
                }
            }
            
            return true;
        });
    }, [filters]);

    // Sort artists based on current sort key and direction
    const sortedArtists = useMemo(() => {
        const sorted = [...filteredArtists].sort((a, b) => {
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
                case 'dancehallThrone':
                    aValue = a.dancehallThrone;
                    bValue = b.dancehallThrone;
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
    }, [filteredArtists, sortKey, sortDirection]);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const getSortKeyForTab = (tab: SortKey): keyof Artist => {
        if (tab === 'veterans' || tab === 'queens') return 'overallRank';
        return tab;
    }

    const RankingTable = ({ data, category }: { data: Artist[], category: SortKey }) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead className="text-right">
                        <SortableTableHeader
                            label="Throne"
                            sortKey="dancehallThrone"
                            currentSort={sortKey}
                            currentDirection={sortDirection}
                            onSort={handleSort}
                        />
                    </TableHead>
                    <TableHead className="text-right">
                        {category === 'totalViews' && (
                            <SortableTableHeader
                                label="Total Views"
                                sortKey="totalViews"
                                currentSort={sortKey}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                        )}
                        {category === 'followers' && (
                            <SortableTableHeader
                                label="Followers"
                                sortKey="followers"
                                currentSort={sortKey}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                        )}
                        {category === 'rating' && (
                            <SortableTableHeader
                                label="Rating"
                                sortKey="rating"
                                currentSort={sortKey}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                        )}
                        {category === 'dancehallThrone' && (
                            <SortableTableHeader
                                label="Throne Points"
                                sortKey="dancehallThrone"
                                currentSort={sortKey}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                        )}
                        {(category === 'overallRank' || category === 'veterans' || category === 'queens') && (
                            <SortableTableHeader
                                label="Overall"
                                sortKey="overallRank"
                                currentSort={sortKey}
                                currentDirection={sortDirection}
                                onSort={handleSort}
                            />
                        )}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((artist, index) => (
                    <TableRow key={artist.id}>
                        <TableCell className="font-bold text-2xl text-accent">
                            <div className="flex items-center gap-2">
                                {index + 1}
                                {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
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
                                    data-ai-hint="artist avatar"
                                    crossOrigin="anonymous"
                                />
                                <span className="font-medium flex items-center gap-2">
                                    {artist.name}
                                    {artist.id === topQueen.id && category !== 'queens' && <Crown className="w-5 h-5 text-pink-400" />}
                                </span>
                            </div>
                        </TableCell>
                         <TableCell className="text-right font-semibold">
                            <span className="flex items-center justify-end gap-1">
                                {artist.dancehallThrone}
                                <ShieldCheck className="w-4 h-4 text-amber-500" />
                            </span>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                            {category === 'totalViews' && formatNumber(artist.totalViews)}
                            {category === 'followers' && formatNumber(artist.followers)}
                            {category === 'rating' && artist.rating.toFixed(1)}
                            {category === 'dancehallThrone' && formatNumber(artist.dancehallThrone)}
                            {(category === 'overallRank' || category === 'veterans' || category === 'queens') && <span className="flex items-center justify-end gap-1">{artist.rating.toFixed(1)} <Star className="w-4 h-4 text-yellow-400"/></span> }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    const renderTabContent = (tabKey: SortKey) => {
        const sortKey = getSortKeyForTab(tabKey);
        let data = sortedArtists;
        
        // Apply tab-specific filtering
        if (tabKey === 'veterans') {
            data = data.filter(artist => artist.isVeteran);
        } else if (tabKey === 'queens') {
            data = data.filter(artist => artist.gender === 'female');
        }
        
        return <RankingTable data={data} category={tabKey} />;
    }

    return (
        <Card className="bg-card/50">
            <CardContent className="p-6">
                {/* Filter Bar */}
                <FilterBar onFiltersChange={setFilters} filters={filters} />
                
                {/* Stats Summary */}
                <StatsSummary 
                    artists={sortedArtists} 
                    totalArtists={artists.length}
                    title="Division 1 Statistics"
                />

                <Tabs defaultValue="overallRank" onValueChange={(value) => setActiveTab(value as SortKey)}>
                    <TabsList className="grid w-full grid-cols-7 mb-4">
                        <TabsTrigger value="overallRank"><Trophy className="mr-2"/>Overall</TabsTrigger>
                        <TabsTrigger value="queens"><User className="mr-2"/>Queens</TabsTrigger>
                        <TabsTrigger value="totalViews"><PlayCircle className="mr-2"/>Views</TabsTrigger>
                        <TabsTrigger value="followers"><Users className="mr-2"/>Followers</TabsTrigger>
                        <TabsTrigger value="rating"><Star className="mr-2"/>Rating</TabsTrigger>
                        <TabsTrigger value="dancehallThrone"><ShieldCheck className="mr-2"/>Throne</TabsTrigger>
                        <TabsTrigger value="veterans"><History className="mr-2"/>Veterans</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overallRank">{renderTabContent('overallRank')}</TabsContent>
                    <TabsContent value="queens">{renderTabContent('queens')}</TabsContent>
                    <TabsContent value="totalViews">{renderTabContent('totalViews')}</TabsContent>
                    <TabsContent value="followers">{renderTabContent('followers')}</TabsContent>
                    <TabsContent value="rating">{renderTabContent('rating')}</TabsContent>
                    <TabsContent value="dancehallThrone">{renderTabContent('dancehallThrone')}</TabsContent>
                    <TabsContent value="veterans">{renderTabContent('veterans')}</TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ArtistRankings;