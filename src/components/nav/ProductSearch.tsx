import { useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";

type Product = {
  name: string;
  slug: string;
  brand:{
    name:string;
  }
};

type SearchBarProps = {
  products: Product[];
};

export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  const filteredProducts =
    query.length > 1
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) 
      || product.brand.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <div onSubmit={handleSubmit} className="flex items-center">
        <div className="flex items-center w-full rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258]">
          <Search size={17} className="ml-4 text-gray-500" />
          <input
            id="search"
            type="text"
            placeholder="Search anything.."
            required
            autoComplete="off"
            minLength={2}
            maxLength={24}
            value={query}
            onChange={handleInputChange}
            className="px-4 py-1.5 rounded-[20px] w-full bg-[#F7F7F7] dark:bg-[#1f1f23] focus:outline-none"
          />
          {query && (
            <button 
              type="button" 
              onClick={handleClear} 
              className="mr-4 text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <X size={17} />
            </button>
          )}
        </div>
      </div>

      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute w-full mt-2 rounded-[20px] shadow-lg overflow-hidden bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258] z-50">
        <ul className="max-h-60 overflow-auto">
          {filteredProducts.map((product) => (
            <a
              href={`/product/${product.slug}`}
              key={product.slug}
              className="group px-4 py-2 flex items-center justify-between hover:bg-[#EAEAEA] dark:hover:bg-[#2a2a2e] cursor-pointer border-b last:border-b-0"
            >
              <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
              <ArrowUpRight
                size={16}
                className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
              />
            </a>
          ))}
        </ul>
      </div>      
      )}

      {isOpen && query.length > 1 && filteredProducts.length === 0 && (
        <div className="absolute w-full mt-1 rounded-[20px] shadow-lg bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258] z-50">
          <p className="px-4 py-3 text-sm text-gray-500">No results found.</p>
        </div>
      )}
    </div>
  );
}