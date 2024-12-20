"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [UserContact, setUserContact] = useState("")
  const [UserPassword, setUserPassword] = useState("")
  const [AgentMode, setAgentMode] = useState(false)

 

  const [PasswordView, setPasswordView] = useState(true);
  const TogglePasswordView = () => {
    setPasswordView(!PasswordView)
  }



  async function LogIn() {
    setLoading(true)


    const fetch_api = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: UserContact,
        password: UserPassword,
      })
    });

    const resp = await fetch_api.json();
    setLoading(false);
    NOTIFY(resp)
    if (resp.success) {
      setTimeout(() => {
        router.push("/")
      }, 500);
    }


  }


  function NOTIFY(response) {
    let sign = "❌";
    if (response.success) {
      sign = "✅";
    }
    toast(`${sign + " " + response.msg}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }


  let counter = 0;
  function magicLink() {
    counter = counter + 1;
    console.log(counter);

    if (counter >= 5) {
      setAgentMode(true);
      NOTIFY({ success: true, msg: "ZBYTES MODE ON" })
    }
  }
  return (
    <>
      <ToastContainer />
      <section className="bg-gray-50 drk:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 drk:text-white">
            <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo" />
            X Vote Vault
          </div>
          <div className="w-full bg-white rounded-lg shadow drk:border md:mt-0 sm:max-w-md xl:p-0 drk:bg-gray-800 drk:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl drk:text-white">
                Admin Login
              </h1>
              <div className="space-y-4 md:space-y-6" action="#">

                <div>
                  <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 drk:text-white">User Name</label>
                  <input value={UserContact} onChange={(e) => setUserContact(e.target.value)} type="text" name="contact" id="contact" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 drk:bg-gray-700 drk:border-gray-600 outline-none drk:placeholder-gray-400 drk:text-white drk:focus:ring-blue-500 drk:focus:border-blue-500" placeholder="enter username" required="" />
                </div>


                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 drk:text-white">User Password</label>
                  <input type={PasswordView ? "password" : "text"} value={UserPassword} onChange={(e) => setUserPassword(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none drk:bg-gray-700 drk:border-gray-600 drk:placeholder-gray-400 drk:text-white drk:focus:ring-blue-500 drk:focus:border-blue-500" placeholder="Password" required="" />
                </div>
                <div className="flex items-center justify-between hover:cursor-pointer">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        onChange={(e) => { TogglePasswordView(); }}
                        className="w-4 h-4 focus:outline-none rounded bg-gray-50"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 drk:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                </div>


                <button onClick={LogIn} className="w-full text-white bg-blue-500 hover:bg-blue-7600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center drk:bg-blue-600 drk:hover:bg-blue-700 drk:focus:ring-blue-800">{Loading ? "Please Wait" : "Login"}</button>

              </div>
            </div>
          </div>
        </div>
      </section>





      <div
        id="popup-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow drk:bg-gray-700">
            <button
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
            <div className="p-4 md:p-5 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="green"
                className="mx-auto mb-4 text-gray-400 w-12 h-12 drk:text-gray-200"
                viewBox="0 0 16 16"
              >
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 drk:text-gray-400">
                Your Account Login is Succesful.
              </h3>
              <a href='/dashboard/home'
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 drk:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Proceed
              </a>

              {/* <button
          data-modal-hide="popup-modal"
          type="button"
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 drk:focus:ring-gray-700 drk:bg-gray-800 drk:text-gray-400 drk:border-gray-600 drk:hover:text-white drk:hover:bg-gray-700"
        >
          No, cancel
        </button> */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login
