import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CartDrawer({ open, onClose, items, onQty, onRemove }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)
  return (
    <div className={`${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 z-50 transition` }>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open? 'translate-x-0':'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Your Cart</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-md"><X size={18} /></button>
        </div>
        {items.length === 0 ? (
          <div className="p-6 text-center text-slate-500">Your cart is empty</div>
        ) : (
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
            {items.map((it) => (
              <div key={it.id} className="flex gap-3">
                <img src={it.image} alt={it.model} className="w-20 h-20 rounded object-cover bg-slate-100" />
                <div className="flex-1">
                  <div className="font-medium">{it.brand} {it.model}</div>
                  <div className="text-sm text-slate-500">${it.price} • {it.storage || ''}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="px-2 py-1 rounded border" onClick={() => onQty(it.id, Math.max(1, it.qty-1))}>-</button>
                    <span className="px-2">{it.qty}</span>
                    <button className="px-2 py-1 rounded border" onClick={() => onQty(it.id, it.qty+1)}>+</button>
                    <button className="ml-auto text-rose-600 text-sm" onClick={() => onRemove(it.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" onClick={onClose} className="block w-full text-center py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Checkout</Link>
        </div>
      </aside>
    </div>
  )
}
