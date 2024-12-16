
import { useRouter } from 'next/navigation';
import React from 'react'

const CartProduct = ({ name, code, price }) => {
  const router = useRouter();

  const removeFromCart = (code) => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('cart');
      let cart = storedData ? JSON.parse(storedData) : [];
  
      // Filter out the item with the matching code
      cart = cart.filter(item => item !== code);
  
      // Update the cart in localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      // Optionally update component state or re-render logic
      window.location.reload()
    }
  };

  
  return (
    <div className="p-3 my-3 shadow-md hover:bg-gray-50 rounded-lg sm:py-4 border">


      <div className="flex items-center">


        <div className="flex-1 min-w-0 ms-1">
          <p className="text-md uppercase text-blue-500 font-semibold text-gray-900 truncate">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {code}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold me-3 text-gray-900 dark:text-white">
          ₹{price}
        </div>



        <svg onClick={()=>removeFromCart(code)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </div>


    </div>
  )
}

export default CartProduct