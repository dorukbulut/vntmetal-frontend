"use client";
import Navbar from "../navbar";
import { navlist } from "../data";
export default function Layout({ children }) {
  return (
    <Navbar
      modulename={"Kalite Kontrol Modülü"}
      href={"/qc-module"}
      color={"secondary"}
      navdata={navlist[0]["qc-module"]}
    >
      {children}
    </Navbar>
  );
}
