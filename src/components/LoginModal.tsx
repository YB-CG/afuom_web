import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../services/auth/authSlice';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md mx-auto w-full md:max-w-lg lg:max-w-xl">
        <h3 className="text-xl font-bold text-green-700 mb-4">Log in to your account</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-black block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-black block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              required
            />
          </div>
          <button type="submit" className="w-full text-white bg-[#4CBB17] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
        </form>
        <div className="text-sm font-medium text-black mt-4">
          Not registered? <button onClick={onSwitchToRegister} className="text-green-700 font-bold hover:underline">Create account</button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-black text-xl">&times;</button>
      </div>
    </div>
  );
};

export default LoginModal;
