"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Taskbar from "../components/Taskbar";

export default function AddBudget() {
  const router = useRouter();

  const [type, setType] = useState("Expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [titleOptions, setTitleOptions] = useState([]);

  const incomeTitles = ["Salary", "Got from Someone", "Other"];
  const expenseTitles = ["Food", "Transportation", "Rent", "TT", "US", "Other"];

  useEffect(() => {
    if (type === "Income") {
      setTitleOptions(incomeTitles);
      setTitle(incomeTitles[0]);
    } else {
      setTitleOptions(expenseTitles);
      setTitle(expenseTitles[0]);
    }
  }, [type]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!amount || !title) {
    alert("Please fill all fields");
    return;
  }

  const newEntry = { type, title, amount: Number(amount), note };

  try {
    const res = await fetch("/api/transactions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    });

    if (!res.ok) throw new Error("Failed to save");

    const data = await res.json();
    console.log("Saved to DB:", data);

    // Clear form
    setAmount("");
    setNote("");

    // Redirect to home
    router.push("/home");
  } catch (err) {
    console.error("DB Error:", err);
    alert("Failed to save to database");
  }
};

  return (
    <>
      <div style={pageStyle}>
        <h2 style={titleStyle}>Add Budget</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          {/* Title */}
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          >
            {titleOptions.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          {/* Note */}
          <textarea
            placeholder="Add note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="3"
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Add
          </button>
        </form>
      </div>

      <Taskbar />
    </>
  );
}

/* ===== COLORS ===== */
const colors = {
  dark: "#0F2854",
  primary: "#1C4D8D",
  secondary: "#4988C4",
  light: "#BDE8F5"
};

/* ===== STYLES ===== */
const pageStyle = {
  minHeight: "100vh",
  backgroundColor: colors.light,
  padding: "80px 16px 100px"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "24px",
  color: colors.dark
};

const formStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(15,40,84,0.15)"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: `1px solid ${colors.secondary}`,
  fontSize: "1rem",
  backgroundColor: "white",
  color: colors.dark
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  backgroundColor: colors.primary,
  color: colors.light,
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer"
};
