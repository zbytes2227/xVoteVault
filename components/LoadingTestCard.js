import React from 'react'

const LoadingTestCard = () => {
    return (
        <>
            <li className="p-3 my-3 shadow-md hover:bg-gray-50 rounded-lg sm:py-4 border">

                <div className="flex animate-pulse">
                    <div className="flex-shrink-0">
                        <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700" />
                    </div>
                    <div className="ms-4 mt-2 w-full">
                        <p
                            className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700"
                            style={{ width: "70%" }}
                        />
                        <ul className="mt-3 space-y-3">
                            <li className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-neutral-700" />
                            <li className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-neutral-700" />
                            <li className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-neutral-700" />
                            <li className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-neutral-700" />
                        </ul>
                    </div>
                </div>
            </li>






        </>
    )
}

export default LoadingTestCard