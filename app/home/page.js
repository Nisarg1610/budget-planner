"use client";

import { useState, useEffect } from "react";
import Taskbar from "../components/Taskbar";

// Color palette
const colors = {
  dark: "#0F2854",
  primary: "#1C4D8D",
  secondary: "#4988C4",
  light: "#BDE8F5",
  spent: "#FF7F7F",
  received: "#7FFF7F"
};

// Reusable Tile Component
function Tile({ title, amount, color }) {
  return (
    <div style={{
      backgroundColor: color || colors.secondary,
      padding: '15px',
      borderRadius: '12px',
      textAlign: 'center',
      margin: '8px',
      flex: '1 1 120px',
      minWidth: '120px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      color: colors.dark
    }}>
      <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>{title}</h3>
      <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>${amount}</p>
    </div>
  );
}

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);

        // Calculate totals
        let spent = 0;
        let received = 0;
        const categoryMap = {};

        data.forEach(item => {
          if (item.type === "Expense") spent += parseFloat(item.amount);
          else if (item.type === "Income") received += parseFloat(item.amount);

          // Category totals
          if (!categoryMap[item.title]) categoryMap[item.title] = 0;
          categoryMap[item.title] += parseFloat(item.amount);
        });

        setTotalSpent(spent);
        setTotalReceived(received);

        // Convert categoryMap to array
        const categoryArray = Object.entries(categoryMap).map(([title, amount]) => ({ title, amount }));
        setCategories(categoryArray);

      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: '70px', paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px', backgroundColor: colors.light }}>
        {/* Big Tiles */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <Tile title="Spent" amount={totalSpent} color={colors.spent}/>
          <Tile title="Received" amount={totalReceived} color={colors.received}/>
        </div>

        {/* Category Tiles */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map((cat, i) => (
            <Tile key={i} title={cat.title} amount={cat.amount} color={colors.secondary} />
          ))}
        </div>
      </div>

      <Taskbar />
    </>
  );
}
