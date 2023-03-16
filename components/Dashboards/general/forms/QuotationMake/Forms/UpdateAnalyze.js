"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isValid } from "../../../../../../app/valid";
import TextField from "@mui/material/TextField";
import AnalysisService from "../../../../../../services/AnalysisService";
import Link from "next/link";
import Dropdown from "../../../../../base/autocomplete";
import Alert from "../../../../../base/alert";
import Loading from "../../../../../base/Loading";
import { delay } from "../../../../../../app/utils";

export default function UpdateAnalyze({ type, prevType, prevId }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const [all, setAll] = useState([]);
  const [valid, setValid] = useState(false);
  const [fields, setFields] = useState({
    analyze: {
      analyze_Name: "",
      analyze_coefCopper: "",
      analyze_coefTin: "",
    },
  });
  const [selected, setSelected] = useState({ title: "" });

  const handleChange = (field, area, e) => {
    setFields((old) => {
      return {
        ...old,
        [field]: {
          ...old[field],
          [area]: e.target.value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = all.find((l) => l.title === selected?.title);

    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Analiz Güncelleniyor...",
      title: "Lütfen Bekleyiniz",
    });
    try {
      const res = await AnalysisService.updateAnalysis(fields.analyze, item.id);

      if (res.status === 200) {
        console.log("hit");
        setError({
          isOpen: true,
          type: "success",
          message: "Analiz Güncellendi !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(
          `/order-module/quotation/form?type=${prevType}&id=${prevId}`
        );
      }
    } catch (err) {
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Böyle bir analiz zaten mevcut",
        title: "Hata",
      });
    }
  };

  const getValues = () => {
    AnalysisService.getAllAnalyze()
      .then((res) => {
        if (res.status === 200) {
          let all_values = res.data.analyzes.map((item) => {
            return {
              title: item.analyze_Name,
              id: item.analyze_id,
            };
          });
          setAll(all_values);
        }
      })
      .catch((err) => console.log());
  };
  useEffect(() => {
    const check_valid = {
      a: fields?.analyze?.analyze_Name,
      b: fields?.analyze?.analyze_coefCopper,
      c: fields?.analyze?.analyze_coefTin,
      d: selected?.title === undefined ? "" : selected?.title,
    };
    setValid(isValid(check_valid));
  }, [fields, selected]);

  useEffect(() => {
    const item = all.find((l) => l.title === selected?.title);
    if (item !== "" && item !== undefined) {
      AnalysisService.getAnalyze(item.id)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.analyze[0];
            setFields((old) => {
              return {
                analyze: {
                  ...old.analyze,
                  analyze_Name: data.analyze_Name,
                  analyze_coefCopper: data.analyze_coefCopper,
                  analyze_coefTin: data.analyze_coefTin,
                },
              };
            });
          }
        })
        .catch((e) => console.log(e.message));
    }
  }, [selected]);

  useEffect(() => {
    getValues();
  }, []);
  return (
    <div>
      <div
        className="relative lg:top-3 top-20 mx-auto p-5 
      lg:w-full lg:w-full rounded-md bg-white p-10"
      >
        <Alert error={error} />
        {!isLoading && (
          <div
            className={`${
              true ? "visible scale-100" : "invisible scale-0 h-0"
            } flex flex-col space-y-10 lg:items-center lg:justify-center`}
          >
            <div className="mt-5 space-y-2 lg:grid lg:place-items-center lg:justify-center">
              <div className="space-y-5 lg:grid lg:place-items-center lg:gap-3 ">
                <div className="flex flex-col lg:w-full md:w-full">
                  <Dropdown
                    dropDownOptions={{ label: "Analiz Seçiniz" }}
                    data={all}
                    prevValue={selected}
                    valid={valid}
                    setData={setSelected}
                  />
                </div>
                <TextField
                  label={"Yeni Analiz İsmi"}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.analyze?.analyze_Name || ""}
                  type={"text"}
                  error={!valid}
                  onChange={(e) => handleChange("analyze", "analyze_Name", e)}
                />

                <TextField
                  label={"Yeni Bakır Katsayısı"}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.analyze?.analyze_coefCopper || ""}
                  type={"number"}
                  error={!valid}
                  onChange={(e) =>
                    handleChange("analyze", "analyze_coefCopper", e)
                  }
                />

                <TextField
                  label={"Yeni Kalay Katsayısı"}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.analyze?.analyze_coefTin || ""}
                  type={"number"}
                  error={!valid}
                  onChange={(e) =>
                    handleChange("analyze", "analyze_coefTin", e)
                  }
                />
              </div>
            </div>

            {/*Buttons*/}
            <div className="grid grid-cols-2 space-x-10 col-span-2">
              <button
                onClick={handleSubmit}
                disabled={!valid}
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

              <Link
                href={{
                  pathname: "/order-module/quotation/form",
                  query: {
                    type: prevType,
                    id: prevId,
                  },
                }}
                passHref
              >
                <button className="p-1 text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
                  IPTAL
                </button>
              </Link>
            </div>
            {!valid && (
              <p className="text-lg font-rotobot tracking widest text-red-600">
                Tüm zorunlu alanlar doldurulmalıdır !
              </p>
            )}
          </div>
        )}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
