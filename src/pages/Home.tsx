import React from "react";
import Dashboard from "../components/Dashboard";
import CardArea from "../components/CardArea";
import { CartContext } from "./CartContext";
import { CartProvider } from "./CartContext";

export default function Home() {
  return (
    <div className="main-container">
      <Dashboard message1="Discover Latest Courses on" message2="React" />

      <CardArea />
    </div>
  );
}
