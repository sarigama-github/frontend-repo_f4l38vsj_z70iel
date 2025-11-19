import { useLocation, Link } from 'react-router-dom'

export default function ThankYou(){
  const { state } = useLocation()
  const order = state?.order
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="bg-white rounded-xl border p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold">Thank you!</h1>
        {order ? (
          <>
            <p className="mt-2 text-slate-600">Your order has been placed successfully.</p>
            <div className="mt-4 text-left bg-slate-50 border rounded p-4">
              <div className="text-sm">Order ID:</div>
              <div className="font-mono text-sm break-all">{order.order_id}</div>
              <div className="mt-2 text-sm">Total: <span className="font-semibold">${order.total?.toFixed?.(2) || order.total}</span></div>
            </div>
          </>
        ) : (
          <p className="mt-2 text-slate-600">No order data found.</p>
        )}
        <Link to="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md">Back to store</Link>
      </div>
    </div>
  )
}
