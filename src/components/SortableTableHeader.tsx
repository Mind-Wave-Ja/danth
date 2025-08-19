'use client';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableTableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string;
  currentDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
  className?: string;
}

const SortableTableHeader = ({ 
  label, 
  sortKey, 
  currentSort, 
  currentDirection, 
  onSort, 
  className = "" 
}: SortableTableHeaderProps) => {
  const isActive = currentSort === sortKey;
  
  const getSortIcon = () => {
    if (!isActive) return <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />;
    return currentDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-accent" />
      : <ChevronDown className="w-4 h-4 text-accent" />;
  };

  return (
    <Button
      variant="ghost"
      onClick={() => onSort(sortKey)}
      className={`h-auto p-0 font-semibold hover:bg-transparent ${className}`}
    >
      <div className="flex items-center gap-2">
        {label}
        {getSortIcon()}
      </div>
    </Button>
  );
};

export default SortableTableHeader;
