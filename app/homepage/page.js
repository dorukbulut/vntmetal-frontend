"use client";
import Card from "./card";
import SearchBar from "./searchbar";
import { modules } from "./data";
import { filterData } from "./utils";
import { useState } from "react";
export default function Page() {
  const [searchBox, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="grid place-items-center h-screen w-screen bg-indigo-800 ">
      <div className="w-full h-full bg-indigo-700 rounded-xl overflow-y-scroll">
        <div className="flex flex-col gap-20 lg:gap-5 md:gap-7 w-full h-full bg-indigo-50 rounded-xl overflow-y-scroll p-5">
          <div className="lg:flex md:flex">
            <p className="text-xl font-roboto text-center tracking-widest text-indigo-700">
              Döküm Yönetim Sistemi
            </p>
          </div>

          <p className="text-md text-center font-roboto tracking-widest text-indigo-700">
            Kullanılabilir Modüller
          </p>
          <div className="grid place-items-center">
            <SearchBar searchChange={onSearchChange} />
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 place-items-center gap-10 lg:gap-6">
            {filterData(modules, searchBox).map((module, index) => {
              return <Card key={index} module={module} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
