import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-[#4CBB17] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3da814] transition duration-300">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
