"use client";
import Link from "next/link";

export default function Taskbar() {
  return (
    <div style={taskbarStyle}>
      <Link href="/home" style={itemStyle}>
        <span>🏠</span>
        <small>Home</small>
      </Link>

      <Link href="/add-budget" style={itemStyle}>
        <span>➕</span>
        <small>Add</small>
      </Link>

      <Link href="/dashboard" style={itemStyle}>
        <span>📊</span>
        <small>Dashboard</small>
      </Link>
    </div>
  );
}
const taskbarStyle = {
  position: "fixed",
  bottom: "16px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "90%",
  height: "68px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  backgroundColor: "rgba(189, 232, 245, 0.7)", // BDE8F5 glass
  borderRadius: "22px",
  boxShadow: "0 10px 25px rgba(15, 40, 84, 0.25)",
  zIndex: 1000
};

const itemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  color: "#0F2854",
  fontSize: "0.7rem",
  fontWeight: "600"
};

const iconStyle = {
  fontSize: "1.2rem"
};

const centerItemStyle = {
  backgroundColor: "#1C4D8D",
  width: "52px",
  height: "52px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "-28px",
  textDecoration: "none",
  boxShadow: "0 6px 16px rgba(28, 77, 141, 0.5)"
};

const addIconStyle = {
  fontSize: "1.8rem",
  color: "#BDE8F5",
  fontWeight: "bold"
};
