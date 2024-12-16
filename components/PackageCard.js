import React, { useEffect, useState } from 'react'

const PackageCard = ({ name, price, preTest, parameters, code }) => {
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        // Check if the item is already in the cart on component mount
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('cart');
            let cart = storedData ? JSON.parse(storedData) : [];
            setIsAdded(cart.includes(code));
        }
    }, [code]);


    const addToCart = (code) => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('cart');
            let cart = storedData ? JSON.parse(storedData) : [];

            // Add the code only if it is not already in the cart
            if (!cart.includes(code)) {
                cart.push(code);
                localStorage.setItem('cart', JSON.stringify(cart));
                setIsAdded(true); // Update the state to reflect the item is added
            }
        }
    };

    return (
        <>
            <li className="p-3 my-3 shadow-md hover:bg-gray-50 rounded-lg sm:py-4 border">

                <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-1">
                        <p className="text-md uppercase text-rose-500 font-semibold text-gray-900">
                            {name}
                        </p>
                    </div>
                </div>



                <section className='my-3'>

                    <div className='flex'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="blue"
                            className="bi bi-clipboard2-pulse-fill h-5 w-5"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
                        </svg><p className='text-sm ms-1'>{preTest.join(', ')}</p>
                    </div>

                    <div className='flex mt-2'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="blue"
                            className="bi bi-clipboard2-pulse-fill h-5 w-5"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z" />
                        </svg><p className='text-sm ms-1'>{parameters}</p>
                    </div>

                </section>




                <div className="inline-flex justify-center w-full rounded-md" role="group">
                    <a href={`/dashboard/packages/view?code=${code}`} className="inline-flex items-center text-xs px-4 py-2 font-medium text-blue-900 bg-transparent border border-blue-900 rounded-s-lg hover:bg-blue-900 hover:text-white   ">
                        Show Details
                    </a>
                    <button type="button" className="inline-flex items-center text-xs px-4 py-2 font-bold text-blue-900 bg-transparent border-t border-b border-blue-900 hover:bg-blue-900 hover:text-white   ">
                        ₹{price}
                    </button>
                    <button onClick={() => addToCart(code)} className={`inline-flex items-center text-xs px-4 py-2 text-blue-900  border border-blue-900 bg-transparent rounded-e-lg hover:text-white ${isAdded ? 'text-green-500 font-bold hover:bg-green-600' : 'font-medium hover:bg-blue-900'}`}>
                        {isAdded ? 'Selected' : 'Add to Cart'}
                    </button>
                </div>
            </li>






        </>
    )
}

export default PackageCard