import React, { useState, useEffect } from "react";
import { OUR_BANK_ID } from "./constants";

// Replace this with your real API call
const fetchMoneyRequests = async (clientId) => {
  try {
    const response = await fetch(
      "http://localhost:4000/getMoneyRequests?clientId=" + clientId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching money requests:", error);
  }
};

function Dashboard({ setPage }) {
  const [moneyRequests, setMoneyRequests] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Fetch money requests when the component mounts
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:4000/createBankClient/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "anything",
          email,
        }),
      });

      // If the response is ok, proceed to extract the JSON
      let data;
      if (response.ok) {
        data = await response.json();
      }

      fetchMoneyRequests(data?.id || OUR_BANK_ID).then((data) => {
        // data message doesn't not contain error
        if (data?.message !== "Internal Server Error") {
          setMoneyRequests(data || []);
        }
      });
    };

    fetchRequests();
  }, [email]);

  return (
    <div className="Dashboard">
      <button onClick={() => setPage("purchase")}>Go to Purchase</button>
      <h1>Dashboard</h1>

      {/* text input for email */}
      <input
        type="text"
        placeholder="Enter email"
        value={email}
        style={{ width: "200px" }}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* onclick button set page to purchase */}

      <h2>All Money Requests</h2>

      {moneyRequests.length === 0 ? (
        <p>No money requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Requested Date</th>
              <th>Requester ID</th>
              <th>Requestee ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {moneyRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.requestedDate}</td>
                <td>{request.requesterId}</td>
                <td>{request.requesteeId}</td>
                <td>{request.amount}</td>
                <td>{request.requestStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
