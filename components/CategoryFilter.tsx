'use client';
import { LucideIcon, Star, Mic, Book, Music } from 'lucide-react';

type Category = {
  id: string;
  title: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  { id: 'all', title: 'all', icon: Star },
  { id: 'conferinte', title: 'Conferinte', icon: Mic },
  { id: 'seminarii', title: 'Seminarii', icon: Book },
  { id: 'concerte', title: 'Concerte', icon: Music },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto gap-2 scrollbar-hidden mt-4">
      {categories.map((item) => (
        <button
          key={item.id}
          onClick={() => onCategoryChange(item.id)}
          className={`flex items-center space-x-2 rounded-full border px-4 py-2 ${
            activeCategory === item.id
              ? 'bg-indigo-500 border-indigo-500 text-white'
              : 'bg-gray-100 border-gray-300 text-indigo-600'
          }`}
        >
          <item.icon
            className={`h-5 w-5 ${activeCategory === item.id ? 'text-white' : 'text-indigo-600'}`}
          />
          <span className="text-sm font-semibold">{item.title}</span>
        </button>
      ))}
    </div>
  );
}
