import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Product() {
  const { id } = useParams()
  const [phone, setPhone] = useState(null)
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/phones/${id}`)
      const data = await res.json()
      setPhone(data)
    }
    load()
  }, [id])

  if (!phone) return <div className="p-8">Loading...</div>

  return (
    <div>
      <Navbar cartCount={0} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border overflow-hidden">
            <img src={phone.image} alt={phone.model} className="w-full h-auto" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{phone.brand} {phone.model}</h1>
            <p className="text-slate-600 mt-2">{phone.description}</p>
            <div className="text-3xl font-bold mt-4">${phone.price}</div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-3 py-1 rounded border" onClick={()=>setQty(Math.max(1, qty-1))}>-</button>
              <span>{qty}</span>
              <button className="px-3 py-1 rounded border" onClick={()=>setQty(qty+1)}>+</button>
            </div>
            <button onClick={()=>navigate('/checkout', { state: { items: [{...phone, qty}] } })} className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Buy now</button>
          </div>
        </div>
      </main>
    </div>
  )
}
