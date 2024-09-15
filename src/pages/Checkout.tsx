import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { placeOrder, Address } from '../services/order/orderSlice';
import { fetchCart, Product } from '../services/product/productSlice';
import Loader from '../components/Loader';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, products, loading: productLoading } = useSelector((state: RootState) => state.products);
  const { loading: orderLoading, error } = useSelector((state: RootState) => state.order);
  const [address, setAddress] = useState<Address>({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
  });

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);

  const cartProducts = products.filter(product => product.id in cart);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(placeOrder(address) as any); // Wait for the order to be placed

    // If the order is successfully placed, clear the cart and reload the page
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(fetchCart() as any); // Ensure cart is updated in the store
      navigate('/'); // Redirect to home page
      window.location.reload(); // Reload the window to clear local state
    }
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => total + parseFloat(product.price) * cart[product.id], 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.13;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  if (productLoading || orderLoading) return <Loader />;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input type="text" id="address_line1" name="address_line1" required
                      value={address.address_line1} onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                    <input type="text" id="address_line2" name="address_line2"
                      value={address.address_line2} onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                      <input type="text" id="city" name="city" required
                        value={address.city} onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <input type="text" id="state" name="state" required
                        value={address.state} onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input type="text" id="country" name="country" required
                        value={address.country} onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input type="text" id="postal_code" name="postal_code" required
                        value={address.postal_code} onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="bg-[#4CBB17] text-white py-2 px-4 rounded-lg mt-4 w-full">
                      Place Order
                    </button>
                  </div>
                </form>
                {error && <p className="mt-4 text-red-600">{error}</p>}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  {cartProducts.map((product: Product) => (
                    <div key={product.id} className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <img src={product.image || '/images/placeholder.webp'} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">Quantity: {cart[product.id]}</p>
                        </div>
                      </div>
                      <p className="text-lg font-medium text-gray-900">${(parseFloat(product.price) * cart[product.id]).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Tax (13%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span><i>free</i></span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                      <p className="text-lg font-medium text-gray-900">Total</p>
                      <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
