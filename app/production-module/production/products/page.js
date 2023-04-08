"use client";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Table from "../../../order-module/table";
import { columns } from "./data";
import Link from "next/link";
import { Button } from "@mui/material";
export default function Page() {
  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-yellow-600 tracking widest font-roboto">
          Döküm Detayları
        </p>
      </div>
      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Link
            href={{
              pathname: "/order-module/quotation/form",
              query: {
                type: "create",
                id: "none",
              },
            }}
          >
            <Button variant="outlined" color={"success"}>
              Yeni Kayıt
            </Button>
          </Link>
        </div>
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Button variant="outlined" color={"warning"}>
            Dökümü Tamamla
          </Button>
        </div>
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Link
            href={{
              pathname: "/production-module/production",
            }}
          >
            <Button variant="outlined" color={"error"}>
              Geri
            </Button>
          </Link>
        </div>
      </div>

      <div className="lg:flex lg:flex-col gap-7 shadow-xl rounded-md p-4">
        <div>
          <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
            Genel Bilgiler
          </p>
        </div>

        {true ? (
          <div className="p-3 flex gap-7">
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Referans No."
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="İş Emri No."
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Cari Kod"
              />
            </div>

            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Analiz"
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Adet"
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Kalan Adet"
              />
            </div>
            <div>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
                value={""}
                label="Toplam Kg."
              />
            </div>
          </div>
        ) : (
          <p className="font-roboto">
            X İş emri için döküm kaydı oluşturulmadı. Genel Bilgiler ilk döküm
            kaydınızı oluşturduktan sonra görünecektir.
          </p>
        )}
      </div>

      {true ? (
        <div className="lg:flex lg:flex-col shadow-xl">
          <Table columns={columns} rowdata={[]} count={1} setNPage={() => {}} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
