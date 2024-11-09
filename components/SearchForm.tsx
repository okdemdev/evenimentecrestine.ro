import { Search } from 'lucide-react';
import Form from 'next/form';

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="flex items-center bg-[#f5f5f5] p-4 mt-4 rounded-xl">
      <Search className="size-6 text-[#9b9b9b]" />
      <input
        name="query"
        defaultValue={query}
        placeholder="Cauta Evenimente"
        className="w-full bg-[#f5f5f5] ml-4 placeholder:text-[#9b9b9b] focus:outline-none caret-[#9b9b9b]"
      />
    </Form>
  );
};

export default SearchForm;
