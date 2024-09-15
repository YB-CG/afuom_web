import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchProducts, removeFromCart, updateCartItemQuantity, Product } from '../services/product/productSlice';
import Loader from '../components/Loader';
import { useNavigate, Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, cart, loading, error } = useSelector((state: RootState) => state.products);
  const [localCart, setLocalCart] = useState<{ [key: string]: number }>(() => {
    const initialCart = { ...cart };
    // Ensure all quantities start at 1
    Object.keys(initialCart).forEach(productId => {
      if (initialCart[productId] <= 0) {
        initialCart[productId] = 1;
      }
    });
    return initialCart;
  });
  
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const cartProducts = products.filter(product => product.id in localCart);

  const handleRemoveFromCart = (productId: string) => {
    const newLocalCart = { ...localCart };
    delete newLocalCart[productId];
    setLocalCart(newLocalCart);
    dispatch(removeFromCart(productId) as any);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setLocalCart(prevCart => ({
      ...prevCart,
      [productId]: quantity
    }));
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => total + parseFloat(product.price) * localCart[product.id], 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.13;
  const shipping = 0; 
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    // Dispatch API calls for each cart item when checking out
    Object.keys(localCart).forEach(productId => {
      dispatch(updateCartItemQuantity({ productId, quantity: localCart[productId] }) as any);
    });
    
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartProducts.length === 0 ? (
        <div className="container mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <br /><br />
          <Link to="/products" className="bg-[#4CBB17] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3da814] transition duration-300">
            Shop Now
          </Link>
        </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Subtotal</th>
                      <th className="text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product: Product) => (
                      <tr key={product.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img className="h-16 w-16 mr-4" src={product.image || '/images/placeholder.webp'} alt={product.name} />
                            <span className="font-semibold">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4">${product.price}</td>
                        <td className="py-4">
                          <input
                            type="number"
                            min="1"
                            value={localCart[product.id]}
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                            className="w-16 border rounded-md p-2"
                          />
                        </td>
                        <td className="py-4">${(parseFloat(product.price) * localCart[product.id]).toFixed(2)}</td>
                        <td className="py-4">
                          <button onClick={() => handleRemoveFromCart(product.id)} className="text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
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
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="bg-[#4CBB17] text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
