import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/product/productSlice';
import { RootState } from '../app/store';
import Loader from '../components/Loader';
import NotFound from './NotFound';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id) as any).unwrap();
    }
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!selectedProduct) return <NotFound />;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <img 
            className="w-full rounded-lg shadow-lg" 
            src={selectedProduct.image || '/images/placeholder.webp'} 
            alt={selectedProduct.name} 
          />
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <p className="text-xl text-[#4CBB17] font-semibold mb-4">${selectedProduct.price}</p>
          <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
          <div className="mb-6">
            <span className="font-semibold">Availability:</span> 
            {selectedProduct.stock > 0 ? (
              <span className="text-green-600 ml-2">In Stock</span>
            ) : (
              <span className="text-red-600 ml-2">Out of Stock</span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              min="1" 
              max={selectedProduct.stock} 
              value={quantity} 
              onChange={handleQuantityChange}
              className="w-20 px-3 py-2 border rounded"
            />
          </div>
          <button 
            className="bg-[#4CBB17] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3da814] transition duration-300"
            disabled={selectedProduct.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
