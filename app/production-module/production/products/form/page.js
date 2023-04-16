"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSearchParams } from "next/navigation";
import AutoComplete from "../../../../../components/base/autocomplete";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col space-y-5">
      <div className="space-y-5">
        <div>
          <p
            className={`text-2xl flex text-center ${
              type === "create" ? "text-green-600" : "text-yellow-600"
            } tracking widest font-roboto text-md"`}
          >
            {type === "create" ? "Yeni Kayıt" : "Kayıt Güncelle"}
          </p>
        </div>
        <div className="rounded-md shadow-lg ">
          <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
            <div className="p-2">
              <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                Kayıt Bilgileri
              </p>
            </div>
            <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
              <div>
                <TextField label="Kalıp Ölçüsü" fullWidth variant="standard" />
              </div>
              <div>
                <TextField
                  label="Dökülen Adet"
                  type="number"
                  fullWidth
                  variant="standard"
                />
              </div>
              <div>
                <AutoComplete
                  data={[{ title: "Savurma Döküm" }, { title: "El Kalıbı" }]}
                  setData={() => {}}
                  prevValue={{ title: "" }}
                  valid={false}
                  dropDownOptions={{ label: "Döküm Tipi" }}
                />
              </div>
              <div>
                <TextField
                  label="Adet KG"
                  type="number"
                  defaultValue={0}
                  fullWidth
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  label="İlave KG"
                  type="number"
                  defaultValue={0}
                  fullWidth
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  label="Talaş KG"
                  type="number"
                  defaultValue={0}
                  fullWidth
                  variant="standard"
                />
              </div>
              <div>
                <AutoComplete
                  data={[
                    { title: "İç Atölye" },
                    { title: "Dış atölye" },
                    { title: "Yok" },
                  ]}
                  setData={() => {}}
                  prevValue={{ title: "" }}
                  valid={false}
                  dropDownOptions={{ label: "Atölye" }}
                />
              </div>
              <div>
                <TextField
                  label="Sıcaklık"
                  type="number"
                  variant="standard"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="KWA Baş."
                  variant="standard"
                  type="number"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="KWA Bit."
                  variant="standard"
                  type="number"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Şarj No."
                  variant="standard"
                  type="number"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Yükleme Baş. Zamanı"
                  variant="standard"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Yükleme Bit. Zamanı"
                  variant="standard"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Döküm Baş. Zamanı"
                  variant="standard"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Döküm Bit. Zamanı"
                  variant="standard"
                  fullWidth
                />
              </div>
              <div>
                <TextField label="Durma Zamanı" variant="standard" fullWidth />
              </div>
              <div>
                <TextField label="Durma Nedeni" variant="standard" fullWidth />
              </div>
              <div>
                <FormControlLabel control={<Checkbox />} label="Kalay" />
                <FormControlLabel control={<Checkbox />} label="Mangan" />
                <FormControlLabel control={<Checkbox />} label="Demir" />
                <FormControlLabel control={<Checkbox />} label="Çinko" />
                <FormControlLabel control={<Checkbox />} label="Diğer" />
              </div>
              <div>
                <TextField label="Dolduran" variant="standard" fullWidth />
              </div>
            </div>
            <div className="grid grid-cols-4 space-x-10 col-span-2">
              <button
                onClick={() => {}}
                disabled={false}
                className={`text-sm ${
                  type === "create" ? "text-green-600" : "text-yellow-600"
                } border-2 ${
                  type === "create" ? "border-green-600" : "border-yellow-600"
                } enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 ${
                  type === "create"
                    ? "enabled:hover:bg-green-700"
                    : "enabled:hover:bg-yellow-700"
                } font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {type === "create" ? "OLUŞTUR" : "GÜNCELLE"}
              </button>

              <button
                onClick={() => router.back()}
                className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded"
              >
                IPTAL
              </button>
            </div>
            {false && (
              <p className="text-lg font-rotobot tracking widest text-red-600">
                Tüm zorunlu alanlar doldurulmalıdır !
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
