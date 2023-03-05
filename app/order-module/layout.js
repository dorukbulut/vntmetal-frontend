"use client";
import Navbar from "../navbar";
import { navlist } from "../data";
export default function Layout({ children }) {
  return (
    <Navbar
      modulename={"Sipariş Modülü"}
      color={"error"}
      navdata={navlist[0]["order-module"]}
    >
      {children}
    </Navbar>
  );
}
