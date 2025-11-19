import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PhoneCard from '../components/PhoneCard'
import CartDrawer from '../components/CartDrawer'

export default function Home() {
  const [phones, setPhones] = useState([])
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadPhones = async (q='') => {
    const res = await fetch(`${baseUrl}/api/phones${q? `?q=${encodeURIComponent(q)}`:''}`)
    const data = await res.json()
    setPhones(data)
  }

  useEffect(() => {
    loadPhones()
  }, [])

  const onAdd = (p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id)
      const next = found ? prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]
      setOpen(true)
      return next
    })
  }

  const onQty = (id, qty) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  const onRemove = (id) => setCart((prev) => prev.filter((i) => i.id !== id))

  return (
    <div>
      <Navbar cartCount={cart.reduce((s,i)=>s+i.qty,0)} onSearch={(v)=>{setSearch(v); loadPhones(v)}} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((p) => (
            <PhoneCard key={p.id} phone={p} onAdd={onAdd} />
          ))}
        </div>
      </main>
      <CartDrawer open={open} onClose={()=>setOpen(false)} items={cart} onQty={onQty} onRemove={onRemove} />
    </div>
  )
}
