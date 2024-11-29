'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { IEvent } from '@/types';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  query?: string;
  evenimente: IEvent[];
}

const SearchForm = ({ query, evenimente }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter events based on search query
  const filteredEvents = evenimente.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(value.length > 0);
  };

  const handleEventClick = (eventId: string) => {
    setIsDropdownOpen(false);
    // You can implement navigation to event details page here
    // router.push(`/events/${eventId}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center bg-[#f5f5f5] p-4 mt-4 rounded-xl">
        <Search className="size-6 text-[#9b9b9b]" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Cauta un eveniment"
          className="w-full bg-[#f5f5f5] ml-4 placeholder:text-[#9b9b9b] focus:outline-none caret-[#9b9b9b]"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && filteredEvents.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="max-h-[400px] overflow-y-auto">
            {filteredEvents.map((event) => (
              <button
                key={event._id}
                onClick={() => handleEventClick(event._id)}
                className="w-full px-4 py-3 hover:bg-gray-50 flex flex-col gap-1 transition-colors border-b border-gray-100 last:border-0"
              >
                <h3 className="text-left font-medium text-gray-900">{event.title}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {event.day} {event.month}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {isDropdownOpen && searchQuery && filteredEvents.length === 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <p className="text-gray-500 text-center">Nu au fost găsite evenimente</p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
