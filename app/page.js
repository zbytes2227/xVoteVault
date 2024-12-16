"use client";

import TopBar from "@/components/TopBar";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [VoteTitle, setVoteTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [NewVoteMode, setNewVoteMode] = useState(true)
  const [VoteResults, setVoteResults] = useState([]); // State to hold voting results

  async function FetchUser(opt) {
    setLoading(true);

    const fetch_api = await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resp = await fetch_api.json();
    setLoading(false);

    if (resp.success) {
      // Extract all possible options and count votes
      const allOptions = opt; // Add all options here
      console.log(opt);

      const totalVotes = resp.agents.length; // Total number of votes
      const voteCounts = {}; // To count votes for each option

      resp.agents.forEach((agent) => {
        voteCounts[agent.VotedFor] = (voteCounts[agent.VotedFor] || 0) + 1;
      });

      // Convert counts to percentages, including options with 0 votes
      const results = allOptions.map((option) => ({
        option,
        percentage: totalVotes > 0
          ? ((voteCounts[option] || 0) / totalVotes * 100).toFixed(2)
          : 0,
      }));

      setVoteResults(results); // Save results to state
    }
  }

  const getColorClass = (percentage) => {
    if (percentage === 0) return "bg-red-200 text-red-800"; // Lowest votes
    if (percentage < 50) return "bg-yellow-200 text-yellow-800"; // Mid votes
    return "bg-green-200 text-green-800"; // Highest votes
  };



  async function fetchVotes() {
 
    const fetch_api = await fetch("/api/votes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      if (data.votes.length > 0) {
        setNewVoteMode(false);
        setOptions(data.votes[0].options);
        setVoteTitle(data.votes[0].VoteTitle);
        FetchUser(data.votes[0].options);
      } else {
        setNewVoteMode(true);
      }
    }
  }


  async function admin_auth() {
    const fetch_api = await fetch("/api/admin_auth", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      fetchVotes();
    }else{
      router.push("/login");
    }
  }

  useEffect(() => {
    admin_auth();
  }, [])

  

  function NOTIFY(response) {
    let sign = "❌";
    if (response.success) {
      sign = "✅";
    }
    toast(`${sign + " " + response.msg}`, {
      position: "top-center",
      autoClose: 3200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }

  async function AddVote() {

    const fetch_api = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ VoteTitle: VoteTitle, options: options })

    });

    const data = await fetch_api.json();
    NOTIFY(data);

  }



  async function deleteVote() {
    const fetch_api = await fetch("/api/votes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    NOTIFY(data);
    setTimeout(() => {
      window.location.reload()
    }, 2500);
  }

  const handleAddOption = () => {
    setOptions([...options, ""]); // Add a new empty option
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <>
      <TopBar />
      <ToastContainer />
      <div className="container mx-auto max-w-lg border pb-24 min-h-[90vh] flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="flex justify-center items-center">
            <a
              href={`/uservote`}
              className="border flex items-center p-2 bg-white hover:bg-gray-100 shadow shadow-lg max-w-md px-5 w-full py-3 rounded rounded-xl"
            >
              <p className="mr-2">+</p>
              <h3 className="text-md font-medium">Register Page</h3>
            </a>
          </div>
          <div className={`flex justify-center items-center ${Loading && "text-gray-400"}`}>
            <button onClick={() => { setOptions([]); setVoteTitle(""); deleteVote() }}
              className="border flex items-center p-2 bg-white hover:bg-gray-100 shadow shadow-lg max-w-md px-5 w-full py-3 rounded rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="mr-3 bi bi-person-hearts"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
                />
              </svg>
              <h3 className="text-md font-medium">Delete Poll</h3>
            </button>
          </div>
        </div>

        <div className="w-full max-w-md px-4 my-3 bg-white rounded-lg">
          <div className="space-y-2 md:space-y-3">
            {/* Title Input */}
            {NewVoteMode && <div>
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-900 drk:text-white"
              >
                Enter Vote Title
              </label>
              <input
                value={VoteTitle}
                onChange={(e) => setVoteTitle(e.target.value)}
                type="text"
                name="contact"
                id="contact"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 drk:bg-gray-700 drk:border-gray-600 drk:placeholder-gray-400 outline-none drk:text-white drk:focus:ring-blue-500 drk:focus:border-blue-500"
                placeholder="Enter title"
                required
              />
            </div>}

            {!NewVoteMode && <p
              className="block mb-1 text-xl font-semibold text-gray-900"
            >
             Active Poll Title : {VoteTitle}
            </p>}

            {/* Options List */}
            {options && NewVoteMode && options.map((option, index) => (
              <div key={index} className="mt-4 flex items-end">
                {/* Option Input */}
                <div className="flex-grow">
                  <label
                    htmlFor={`option-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 drk:text-white"
                  >
                    Option {index + 1}
                  </label>
                  <input
                    id={`option-${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 drk:bg-gray-700 drk:border-gray-600 drk:placeholder-gray-400 outline-none drk:text-white drk:focus:ring-blue-500 drk:focus:border-blue-500"
                  />
                </div>
                {/* Delete Button */}
                {NewVoteMode && <button
                  onClick={() => handleDeleteOption(index)}
                  className="ml-2 bg-red-500 text-white px-3 py-3 rounded-lg hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>}
              </div>
            ))}



            {NewVoteMode && <button
              type="button"
              onClick={handleAddOption}
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 mt-4 py-2.5 text-center drk:bg-blue-600 drk:hover:bg-blue-700 drk:focus:ring-blue-800"
            >
              + Add Option
            </button>}
            {options && NewVoteMode && options.length > 1 && (
              <button
                type="button"
                onClick={AddVote}
                className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-md px-5 mt-4 py-2.5 text-center drk:bg-blue-600 drk:hover:bg-blue-700 drk:focus:ring-blue-800"
              >
                START VOTE POLL
              </button>
            )}

          </div>
        </div>

        {/* Results Section */}
        <div className="w-full max-w-md px-4 my-3 bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          {Loading ? (
            <p>Loading results...</p>
          ) : VoteResults.length > 0 ? (
            <ul>
              {VoteResults.map((result, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg mb-2 ${getColorClass(
                    result.percentage
                  )}`}
                >
                  <span>{result.option}</span>
                  <span>{result.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No votes yet.</p>
          )}
        </div>
      </div>






    </>
  );
}
