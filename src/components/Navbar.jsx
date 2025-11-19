import { ShoppingCart, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar({ cartCount, onSearch }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200"> 
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold text-xl tracking-tight text-slate-900">PhoneMart</Link>
        <div className="relative ml-auto w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search phones..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 transition">
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  )
}
