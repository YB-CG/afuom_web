// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
  </div>
);

export default Loader;
