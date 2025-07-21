import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../redux/productsSlice';

const ViewToggle = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.products.view);

  return (
    <div className="inline-flex rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-1">
      <button
        onClick={() => dispatch(setView('grid'))}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
          currentView === 'grid'
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Grid
      </button>
      
      <button
        onClick={() => dispatch(setView('list'))}
        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
          currentView === 'list'
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
            : 'text-white/70 hover:text-white hover:bg-white/10'
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