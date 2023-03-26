"use client";
import Navbar from "../navbar";
import { navlist } from "../data";
export default function Layout({ children }) {
  return (
    <Navbar
      modulename={"Üretim Modülü"}
      href={"/production-module"}
      color={"warning"}
      navdata={navlist[0]["production-module"]}
    >
      {children}
    </Navbar>
  );
}
