import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../services/auth/authSlice';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Navigation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?query=${searchTerm}`);
    }
  };

  return (
    <nav className="navigation max-w-screen-xl flex items-center justify-between p-4 bg-white shadow-md mx-auto">
      <div className="flex-shrink-0">
        <Link to="/">
          <h2 className="uppercase text-[#4CBB17] text-base lg:text-xl font-bold">AFUOM</h2>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center mx-4">
        <form className="search-box flex items-center space-x-2" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product Here"
            required
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
          />
          <button className="bg-[#4CBB17] text-white p-2 rounded-md" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      {/* Navigation buttons */}
      <div className="flex-shrink-0 flex items-center space-x-4 ml-4">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="text-gray-600 hover:text-[#4CBB17] flex items-center">
              <i className="fa-regular fa-user text-lg"></i>
            </Link>

            {/* Orders button */}
            <Link to="/orders" className="text-gray-600 hover:text-[#4CBB17] flex items-center">
              <i className="fa-solid fa-box text-lg"></i>
            </Link>

            <Link to="/cart" className="text-gray-600 hover:text-[#4CBB17] flex items-center">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
            </Link>

            <button
              className="text-gray-600 hover:text-[#4CBB17] flex items-center"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket text-lg"></i>
            </button>
          </>
        ) : (
          <>
            <button
              className="text-gray-600 hover:text-[#4CBB17]"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <i className="fa-regular fa-user text-lg"></i>
            </button>
          </>
        )}
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </nav>
  );
};

export default Navigation;
