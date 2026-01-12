"use client";

import { useState, useEffect } from "react";
import Taskbar from "../components/Taskbar";

// Colors
const colors = {
  dark: "#0F2854",
  primary: "#1C4D8D",
  secondary: "#4988C4",
  light: "#BDE8F5",
  spent: "#FF7F7F",
  received: "#7FFF7F"
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div style={{ padding: "20px", paddingBottom: "100px", backgroundColor: colors.light, minHeight: "100vh" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: colors.dark, fontSize: "1.8rem" }}>
          Monthly Dashboard
        </h2>

        <div style={cardStyle}>
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "16px", fontStyle: "italic" }}>No transactions yet</td>
                </tr>
              ) : (
                transactions.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#4f8ece" : "white" }}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td style={{ color: item.type === "Expense" ? colors.spent : colors.received, fontWeight: "600" }}>{item.type}</td>
                    <td>{item.title}</td>
                    <td>${Number(item.amount).toFixed(2)}</td>

                    <td>{item.note || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button onClick={handlePrint} style={printButtonStyle}>
          Print Statement
        </button>
      </div>

      <Taskbar />
    </>
  );
}

// Styles
const cardStyle = {
  backgroundColor: "white",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 8px 20px rgba(15,40,84,0.1)",
  overflowX: "auto",
  marginBottom: "20px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.95rem"
};

const theadStyle = {
  backgroundColor: colors.primary,
  color: "white",
  textAlign: "left"
};

const printButtonStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: colors.primary,
  color: colors.light,
  border: "none",
  borderRadius: "14px",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer"
};
