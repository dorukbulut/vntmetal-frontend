"use client";
import Navbar from "../navbar";
import { navlist } from "../data";
export default function Layout({ children }) {
  return (
    <Navbar
      modulename={"Sevkiyat Modülü"}
      href={"/shipment-module"}
      color={"info"}
      navdata={navlist[0]["shipment-module"]}
    >
      {children}
    </Navbar>
  );
}
