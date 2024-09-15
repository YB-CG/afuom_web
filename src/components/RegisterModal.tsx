import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../services/auth/authSlice';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError(null);

    try {
      await dispatch(register({ email, password, first_name: firstName, last_name: lastName, phone_number: phoneNumber }));
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md mx-auto w-full md:max-w-lg lg:max-w-xl">
        <h3 className="text-xl font-bold text-green-700 mb-4">Create an account</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-black block mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-black block mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-black block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              required
            />
            {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-sm font-medium text-black block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border sm:text-sm rounded-lg focus:ring-[#4CBB17] focus:border-[#4CBB17] block w-full p-2.5 border-gray-500 placeholder-gray-400 text-black"
              required
            />
          </div>
          <button type="submit" className="w-full text-white bg-[#4CBB17] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
        </form>
        <div className="text-sm font-medium text-black mt-4">
          Already registered? <button onClick={onSwitchToLogin} className="text-green-700 font-bold hover:underline">Log in</button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-black text-xl">&times;</button>
      </div>
    </div>
  );
};

export default RegisterModal;
