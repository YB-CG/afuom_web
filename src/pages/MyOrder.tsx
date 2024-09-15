import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchOrderHistory, Order } from '../services/order/orderSlice';
import Loader from '../components/Loader';

const MyOrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchOrderHistory() as any);
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-xl text-gray-600">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order: Order) => (
              <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-green-600">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Order #{order.id}</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-green-100 mt-1">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src={item.product.image || '/images/placeholder.webp'} alt={item.product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-lg font-medium text-gray-900">${Number(item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Total</h3>
                    <p className="text-xl font-bold text-gray-900">${Number(order.total_price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;