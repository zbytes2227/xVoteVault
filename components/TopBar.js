import React, { useState } from 'react'

const TopBar = () => {
    const [UiState, setUiState] = useState(0)
    const [Notification, setNotification] = useState('MADE BY UJJWAL KUSHWAHA')

    return (
        <>
            <nav className="bg-white border-gray-200 drk:bg-gray-900 border">
                <div className="max-w-lg flex flex-wrap items-center justify-between mx-auto px-4 py-3">
                    <div
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="/logo.png"
                            className="h-8"
                            alt="Loading Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap drk:text-white">
                            X Vote Vault
                        </span>
                    </div>
                    {/* <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 drk:text-gray-400 drk:hover:bg-gray-700 drk:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg> <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -end-0 drk:border-gray-900">8</div>
                </button> */}


                    <button onClick={(() => { setUiState(1)})} type="button" className="relative inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </button>


                </div>
            </nav>




            <div
                tabIndex={-1}
                className={`${UiState == 1 ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 backdrop-blur-sm left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow shadow-xl border border border-gray-300">
                        <button onClick={() => setUiState(0)}
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center drk:hover:bg-gray-600 drk:hover:text-white"
                            data-modal-hide="popup-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-left">

                            <h3 className="mb-3 text-xl font-semibold text-gray-700 drk:text-gray-400">
                                Notifications
                            </h3>

                            <div className="space-y-4 rounded-lg text-center bg-white p-4 shadow-sm  sm:p-6">
                                <div className="space-y-4">
                                    <div className='space-y-1 flex flex-col items-center'>

                                        <p
                                            htmlFor="helper-text"
                                            className="block animate-pulse mb-2 text-lg font-medium text-gray-900 drk:text-white"
                                        >
                                            {Notification}
                                        </p>

                                        <button
                                            onClick={(() => setUiState(0))}
                                            type="button"
                                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-bold rounded-lg text-sm px-2 w-1/2 py-1.5 text-center me-2 mb-2"
                                        >
                                            OKAY !
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TopBar