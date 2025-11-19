import { Link } from 'react-router-dom'

export default function PhoneCard({ phone, onAdd }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-slate-50">
        <img src={phone.image} alt={`${phone.brand} ${phone.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">{phone.brand} {phone.model}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{phone.description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">${phone.price}</div>
            <div className={`text-xs ${phone.stock>0? 'text-emerald-600':'text-rose-600'}`}>{phone.stock>0? 'In stock' : 'Out of stock'}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/product/${phone.id}`} className="flex-1 text-center py-2 rounded-md border border-slate-300 hover:bg-slate-50">View</Link>
          <button disabled={phone.stock===0} onClick={() => onAdd?.(phone)} className="flex-1 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Add</button>
        </div>
      </div>
    </div>
  )
}
