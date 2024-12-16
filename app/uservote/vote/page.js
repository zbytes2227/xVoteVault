"use client";

import TopBar from "@/components/TopBar";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Poll = () => {
  const searchParams = useSearchParams();
  const userID = searchParams.get("id");

  const [Loading, setLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [NoVotesFound, setNoVotesFound] = useState(false);
  const [InvalidUser, setInvalidUser] = useState(false);
  const [agentDetails, setAgentDetails] = useState(null);


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


  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  async function checkAnyVotes() {
    setLoading(true);
    const fetch_api = await fetch("/api/votes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    setLoading(false);
    if (data.success) {
      if (data.votes.length === 0) {
        setNoVotesFound(true);
        NOTIFY({ success: false, msg: "No Active Polls found" });
      } else {
        ValidateUser();
      }
    }
  }

  useEffect(() => {
    checkAnyVotes();
  }, []);

  async function ValidateUser() {
    setLoading(true);

    const fetch_api = await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const resp = await fetch_api.json();
    setLoading(false);
    if (resp.success) {
      const matchedAgent = resp.agents.find((agent) => agent._id === userID);
      if (matchedAgent) {
        setAgentDetails(matchedAgent);
        fetchVotes();
      } else {
        setInvalidUser(true);
      }
    }
  }

  const fetchVotes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/votes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setLoading(false);

      if (data.success && data.votes.length > 0) {
        setVotes(data.votes);
      } else {
        setNoVotesFound(true);
        toast.error("No Active Polls Found", {
          position: "top-center",
          autoClose: 1000,
          theme: "light",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch polls", {
        position: "top-center",
        autoClose: 1000,
        theme: "light",
      });
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submitVote = async () => {
    if (!selectedOption) {
      toast.warn("Please select an option", {
        position: "top-center",
        autoClose: 1000,
        theme: "light",
      });
      return;
    }
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Agent_ID: agentDetails.Agent_ID, option: selectedOption })
    });
    const data = await response.json();
    NOTIFY(data)
    if (data.success) {
      setTimeout(() => {
        window.location.reload()
      }, 1200);
    }
    toast.success(`You voted for: ${selectedOption}`, {
      position: "top-center",
      autoClose: 1000,
      theme: "light",
    });
  };

  return (
    <>
      <TopBar />
      <ToastContainer />
      {Loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
          <p className="text-lg font-semibold text-gray-900">
            Loading, please wait...
          </p>
        </div>
      )}
      {NoVotesFound && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
          <p className="text-lg font-semibold text-gray-900">
            No Active Polls Found⚠
          </p>
        </div>
      )}
      {InvalidUser && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
            <p className="text-lg font-semibold text-gray-900">
              THIS IS AN INVALID LINK🧐🧐
            </p>
          </div>
        </div>
      )}

      {agentDetails && agentDetails.VotedFor && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md z-50">
            <p className="text-lg font-semibold text-gray-900">
              Your Vote is Recorded😇
            </p>
          </div>
        </div>
      )}
      {!Loading && agentDetails && (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-8">
          <p className="text-lg font-semibold text-gray-800">
            Welcome, {agentDetails.Agent_Name}
          </p>
          <p className="text-sm text-gray-600">Today: {getCurrentDateTime()}</p>
        </div>
      )}
      {!Loading && votes.length > 0 && (
        <div className="p-6 space-y-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-8">
          {votes.map((vote) => (
            <div key={vote._id}>
              <h2 className="text-xl font-bold mb-4">{vote.VoteTitle}</h2>
              {vote.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="poll"
                    value={option}
                    onChange={handleOptionChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`option-${index}`} className="ml-2 text-gray-900">
                    {option}
                  </label>
                </div>
              ))}
              <button
                onClick={submitVote}
                className="mt-4 w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Submit Vote
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Poll;
