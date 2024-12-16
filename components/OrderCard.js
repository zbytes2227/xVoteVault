import Image from 'next/image'
import React from 'react'

const OrderCard = ({ orderid, Status, Test, Address,total,booking_date,title }) => {
  return (

    <a
      href={`/dashboard/cart/checkout/order_status?orderid=${orderid}`}
      className="flex my-2 items-center bg-white border bord  er-gray-200 rounded-lg shadow flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        height={75}
        width={75}
        className="object-cover"
        src={`/images/order/${Math.floor(Math.random() * 5) + 1}.png`}
        alt="pdflogo"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb- text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title.length > 15 ? title.slice(0, 15) + '...' : title}
        </h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          <span className='font-bold'>Status: </span>   <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full" />
            {Status}
          </span>
        </p>
        <p className="mb-1 text-xs">  <span className='font-medium '> Address: </span>  {Address}</p>
        <p className="mb-1 text-xs">  <span className='font-medium '> Booked on: </span>  {booking_date}</p>
        <p className="mb-1 text-sm">  <span className='font-medium '> Total: </span>  ₹{total}</p>
        <p className="mb-1 text-sm text-blue-700"> Click for more</p>
      </div>
    </a>

  )
}

export default OrderCard