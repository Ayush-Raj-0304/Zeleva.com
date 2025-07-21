import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../redux/productsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.products.search);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg 
          className="h-5 w-5 text-white/40 group-focus-within:text-violet-400 transition-colors duration-300"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="block w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
      />
      
      {search && (
        <button
          onClick={() => dispatch(setSearch(''))}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-violet-400 transition-colors duration-300"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar; 