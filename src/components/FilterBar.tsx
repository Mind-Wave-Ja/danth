'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  onFiltersChange: (filters: FilterState) => void;
  filters: FilterState;
}

export interface FilterState {
  search: string;
  gender: string;
  veteranStatus: string;
  ratingRange: string;
  viewRange: string;
  followerRange: string;
}

const FilterBar = ({ onFiltersChange, filters }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      gender: '',
      veteranStatus: '',
      ratingRange: '',
      viewRange: '',
      followerRange: '',
    };
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="mb-6 bg-card/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {Object.values(filters).filter(v => v !== '').length} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'} Advanced
            </Button>
          </div>
        </div>

        {/* Basic Filters - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="search">Search Artists</Label>
            <Input
              id="search"
              placeholder="Artist name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="veteran">Veteran Status</Label>
            <Select value={filters.veteranStatus} onValueChange={(value) => handleFilterChange('veteranStatus', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All artists" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All artists</SelectItem>
                <SelectItem value="true">Veterans only</SelectItem>
                <SelectItem value="false">New artists only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters - Collapsible */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <Label htmlFor="rating">Rating Range</Label>
              <Select value={filters.ratingRange} onValueChange={(value) => handleFilterChange('ratingRange', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All ratings</SelectItem>
                  <SelectItem value="9-10">9.0 - 10.0 (Elite)</SelectItem>
                  <SelectItem value="8-9">8.0 - 8.9 (Excellent)</SelectItem>
                  <SelectItem value="7-8">7.0 - 7.9 (Good)</SelectItem>
                  <SelectItem value="6-7">6.0 - 6.9 (Average)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="views">View Range</Label>
              <Select value={filters.viewRange} onValueChange={(value) => handleFilterChange('viewRange', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All views" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All views</SelectItem>
                  <SelectItem value="1B+">1B+ views</SelectItem>
                  <SelectItem value="500M+">500M+ views</SelectItem>
                  <SelectItem value="100M+">100M+ views</SelectItem>
                  <SelectItem value="50M+">50M+ views</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="followers">Follower Range</Label>
              <Select value={filters.followerRange} onValueChange={(value) => handleFilterChange('followerRange', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="All followers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All followers</SelectItem>
                  <SelectItem value="5M+">5M+ followers</SelectItem>
                  <SelectItem value="2M+">2M+ followers</SelectItem>
                  <SelectItem value="1M+">1M+ followers</SelectItem>
                  <SelectItem value="500K+">500K+ followers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterBar;
