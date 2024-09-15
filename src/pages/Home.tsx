import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, Product, Category, addToFavorites, removeFromFavorites, addToCart, removeFromCart, fetchFavorites, fetchCart } from '../services/product/productSlice';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, favorites, cart, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
    dispatch(fetchCategories() as any);
    dispatch(fetchFavorites() as any);
    dispatch(fetchCart() as any);
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

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
    <div key={product.id} className="rounded overflow-hidden shadow-lg flex flex-col">
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

  const renderProductSection = (category: Category) => {
    const categoryProducts = products.filter(product => product.category === category.id).slice(0, 3);
    
    return (
      <div key={category.id}>
        <div className="border-b px-4 mb-5 flex justify-between text-sm">
          <div className="text-[#4CBB17] flex items-center pb-2 pr-2 border-b-2 border-[#4CBB17] uppercase">
            <h2 className="font-semibold inline-block">{category.name}</h2>
          </div>
          <Link to="/products" className="hover:text-[#4CBB17]">See All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {categoryProducts.map(renderProductCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      {/* Hero or header section */}
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
              <h2 className="mb-4 text-2xl md:text-2xl lg:text-5xl font-semibold uppercase">
                Latest fresh vegetable
              </h2>
              <h4 className="mb-6 text-base md:text-base lg:text-xl">
                Elevating Agricultural Excellence
              </h4>
              <button className="inline-block md:rounded tracking-wider bg-white px-6 py-2 lg:px-8 lg:py-3 text-sm uppercase text-black transition duration-150 ease-in-out hover:bg-[#4CBB17] hover:text-white">
                <a href="/products">Shop now</a>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured products section */}
      <section className="bg-white mt-16">
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <h2 className="font-bold uppercase text-center text-lg lg:text-2xl mb-10">
            Discover our features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
              <a
                href="#"
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
              >
                <img
                  src="images/avocado.webp"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  alt="Avocado"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-lg font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Avocado
                </h3>
              </a>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
              <a
                href="#"
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
              >
                <img
                  src="images/spinach.webp"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  alt="Spinach"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-lg font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Spinach
                </h3>
              </a>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                >
                  <img
                    src="images/feature.webp"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    alt="Green Pepper"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-lg font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Green Pepper
                  </h3>
                </a>
                <a
                  href="#"
                  className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                >
                  <img
                    src="images/cucumber.webp"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    alt="Cucumber"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-lg font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Cucumber
                  </h3>
                </a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
              <a
                href="#"
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
              >
                <img
                  src="images/beetroot.webp"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  alt="Beetroot"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-lg font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Beetroot
                </h3>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="flex flex-wrap justify-center mt-16 bg-gray-50 py-10">
        <div className="p-4 max-w-[420px]">
          <div className="flex rounded-lg h-full bg-[#FFE5EC] p-8 flex-col">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center flex-shrink-0">
                <i className="fa fa-shipping-fast text-[#7C0A02] text-xl"></i>
              </div>
              <h2 className="text-black text-lg font-bold uppercase">Free shipping</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow justify-center">
              <p className="leading-relaxed text-sm text-gray-700">
                Lorem ipsum dolor sit amet. In quos laboriosam non neque eveniet 33 nihil molestias. Rem perspiciatis iure ut laborum inventore et maxime amet.
              </p>
              <a href="#" className="mt-3 text-black hover:opacity-25 inline-flex items-center">
                Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 max-w-[420px]">
          <div className="flex rounded-lg h-full bg-[#D8F3DC] p-8 flex-col">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 mr-3 inline-flex items-center flex-shrink-0">
                <i className="fa fa-shipping-fast text-[#7C0A02] text-xl"></i>
              </div>
              <h2 className="text-black text-lg font-bold uppercase">Free shipping</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow justify-center">
              <p className="leading-relaxed text-sm text-gray-700">
                Lorem ipsum dolor sit amet. In quos laboriosam non neque eveniet 33 nihil molestias. Rem perspiciatis iure ut laborum inventore et maxime amet.
              </p>
              <a href="#" className="mt-3 text-black hover:opacity-25 inline-flex items-center">
                Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Add more service cards as needed */}
      </section>

      {/* Featured products section */}
      <section className="bg-white mt-16">
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <h2 className="font-bold uppercase text-center text-lg lg:text-2xl mb-10">
            Discover our features
          </h2>
          {categories.map(renderProductSection)}
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-60 md:h-96 my-10"
        style={{ backgroundImage: `url('/images/feature1.webp')` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: 'rgba(49, 43, 43, 0.6)' }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white">
              <h2 className="mb-8 text-2xl md:text-2xl lg:text-5xl font-semibold uppercase">
                Get update
              </h2>
              <h4 className="mb-6 text-base md:text-base lg:text-xl">
                Subscribe to our newsletter and get <br /> discount 30% off
              </h4>
              <form className="email">
                <input type="text" placeholder="Your email" required />
                <button type="submit">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
