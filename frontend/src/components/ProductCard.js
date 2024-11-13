import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const ProductCard = ({ product }) => {
  const { auth } = useAuth(); // Get the auth state from context

  const handleAddToCart = async () => {
    if (!auth) {
      alert('Please log in to add items to the cart');
      return;
    }

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        alert('No token found, please log in again.');
        return;
      }

      // Send request to the backend to add the product to the cart
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Send the token in the headers
        },
        body: JSON.stringify({ productId: product._id }), // Include product ID in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to add the item to the cart');
      }

      const data = await response.json();
      alert('Product added to cart successfully!');

      // Optionally, you can update the UI or state here based on the cart update
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the product to your cart.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      {/* <img src="http://localhost:5000/images/coffee.jpg" alt={product.name} /> */}
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button> {/* Call the new handler */}
    </div>
  );
};

export default ProductCard;
