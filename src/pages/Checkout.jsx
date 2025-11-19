import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [items, setItems] = useState(location.state?.items || [])

  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    address: '',
    city: '',
    country: ''
  })

  const total = useMemo(()=> items.reduce((s, it) => s + it.price * it.qty, 0), [items])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async () => {
    if (items.length === 0) return
    const payload = {
      ...form,
      items: items.map((i) => ({ product_id: i.id, qty: i.qty }))
    }
    const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      const data = await res.json()
      navigate('/thank-you', { state: { order: data } })
    } else {
      const err = await res.json().catch(()=>({detail:'Error'}))
      alert(err.detail || 'Checkout failed')
    }
  }

  return (
    <div>
      <Navbar cartCount={items.reduce((s,i)=>s+i.qty,0)} />
      <main className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Shipping details</h2>
          {['customer_name','email','address','city','country'].map((f)=>(
            <div key={f}>
              <label className="block text-sm text-slate-600 mb-1 capitalize">{f.replace('_',' ')}</label>
              <input value={form[f]} onChange={(e)=>setForm({...form,[f]:e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-3">
            {items.map((it)=> (
              <div key={it.id} className="flex items-center gap-3">
                <img src={it.image} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <div className="text-sm">{it.brand} {it.model} x {it.qty}</div>
                </div>
                <div className="text-sm font-medium">${(it.price*it.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex items-center justify-between">
            <span>Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <button onClick={submit} className="mt-6 w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Place order</button>
        </div>
      </main>
    </div>
  )
}
