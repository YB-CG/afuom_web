import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, Product, searchProducts, addToFavorites, removeFromFavorites, addToCart, removeFromCart } from '../services/product/productSlice';
import { RootState } from '../app/store';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { products, categories, favorites, cart, loading, error } = useSelector((state: RootState) => state.products);
  const [filter, setFilter] = useState('all');
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query) as any);
    } else {
      dispatch(fetchProducts() as any);
    }
    dispatch(fetchCategories() as any);
  }, [dispatch, query]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => categories.find(cat => cat.id === product.category)?.name.toLowerCase() === filter);

  const handleFavoriteToggle = (productId: string) => {
    if (favorites.includes(productId)) {
      dispatch(removeFromFavorites(productId) as any);
    } else {
      dispatch(addToFavorites(productId) as any);
    }
  };

  const handleCartToggle = (productId: string) => {
    if (productId in cart) {
      dispatch(removeFromCart(productId) as any);
    } else {
      dispatch(addToCart({ productId, quantity: 1 }) as any);
    }
  };

  const renderProductCard = (product: Product) => (
    <div key={product.id} className="menu-card rounded overflow-hidden shadow-lg flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img className="w-full" src={product.image || '/images/placeholder.webp'} alt={product.name} />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-300 opacity-25"></div>
        </Link>
        <div className="text-xs absolute top-0 right-0 bg-[#4CBB17] px-4 py-2 text-white mt-3 mr-3">
          {categories.find(cat => cat.id === product.category)?.name}
        </div>
      </div>
      <div className="px-6 py-4 mb-auto">
        <Link to={`/product/${product.id}`} className="font-medium text-lg inline-block hover:text-[#4CBB17] transition duration-500 ease-in-out mb-2">
          {product.name}
        </Link>
        <p className="text-gray-500 text-sm">{product.description.substring(0, 100)}...</p>
        <p className="text-[#4CBB17] text-sm">${product.price}</p>
      </div>
      <div className="px-4 py-3 flex flex-row bg-gray-100 items-center justify-end">
        <button onClick={() => handleFavoriteToggle(product.id)}>
          <i className={`fa fa-heart px-1.5 sm:px-3 text-sm lg:text-lg ${favorites.includes(product.id) ? 'text-[#4CBB17]' : 'text-black hover:text-[#4CBB17]'}`}></i>
        </button>
        <button onClick={() => handleCartToggle(product.id)} className="px-1.5 sm:px-3 text-sm lg:text-lg">
          <i className={`fa-solid fa-cart-shopping ${product.id in cart ? 'text-[#4CBB17]' : 'text-black hover:text-[#4CBB17]'}`}></i>
        </button>
      </div>
    </div>
  );

  return (
    <section>
      <header
        className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-80 md:h-96"
        style={{ backgroundImage: "url('images/s7.webp')" }}
      >
      <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h2 className="mb-4 text-2xl md:text-2xl lg:text-5xl font-semibold uppercase hover:-[#4CBB17]">Products</h2>
              <a href="/" className="mt-3 inline-flex items-center">Home
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </a>
            </div>
          </div>
        </div>
        </header>

      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6 my-20">
        <div className="filter-list m-auto mb-10">
          <ul className="flex flex-wrap list-none items-center justify-center">
            <li 
              className={`filter-list py-2 px-8 rounded my-[15px] font-bold cursor-pointer text-sm md:text-lg ${filter === 'all' ? 'bg-[#4CBB17] text-white' : 'text-black'}`} 
              onClick={() => setFilter('all')}
            >
              All
            </li>
            {categories.map(category => (
              <li 
                key={category.id}
                className={`filter-list py-2 px-8 rounded my-[15px] font-bold cursor-pointer text-sm md:text-lg ${filter === category.name.toLowerCase() ? 'bg-[#4CBB17] text-white' : 'text-black'}`} 
                onClick={() => setFilter(category.name.toLowerCase())}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">
          {filteredProducts.map(renderProductCard)}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;