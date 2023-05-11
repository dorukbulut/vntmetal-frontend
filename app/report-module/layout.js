"use client";
import Navbar from "../navbar";
import { navlist } from "../data";
export default function Layout({ children }) {
  return (
    <Navbar
      modulename={"Raporlama Modülü"}
      href={"/report-module"}
      color={"success"}
      navdata={navlist[0]["report-module"]}
    >
      {children}
    </Navbar>
  );
}
