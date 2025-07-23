import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../redux/productsSlice';

const ViewToggle = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.products.view);

  return (
    <div className="inline-flex rounded-full bg-gray-100/50 backdrop-blur-lg border border-gray-200/50 p-1">
      <button
        onClick={() => dispatch(setView('grid'))}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
          currentView === 'grid'
            ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Grid
      </button>
      
      <button
        onClick={() => dispatch(setView('list'))}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
          currentView === 'list'
            ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        List
      </button>
    </div>
  );
};

export default ViewToggle; 