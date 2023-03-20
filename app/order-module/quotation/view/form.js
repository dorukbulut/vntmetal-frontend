"use client";
import { renderAsync } from "docx-preview";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QuotationFormService from "../../../../services/QuotationService/QuotationFormService";
import Link from "next/link";
export default function App() {
  const sp = useSearchParams();
  const id = sp.get("id");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((response) => {
      response.blob().then((blob) => {
        renderAsync(blob, document.getElementById("viewer"))
          .then(() => {})
          .catch((err) => console.log(err));
      });
    });
  }, []);
  return (
    <div className="">
      <div id="viewer" className="bg-transparent">
        {""}
      </div>
      <div className="flex flex-row text-center w-full gap-5">
        <button
          onClick={(e) => QuotationFormService.generateForm(id)}
          id="viewerDownload"
          className={`text-lg p-1 mt-5 w-1/4 text-green-600 border-2 border-green-600 enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110  enabled:hover:bg-green-700 font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          INDIR
        </button>
        <Link href={"/order-module/quotation"} passHref>
          <button className="text-lg p-2 mt-5  text-red-600 border-2 border-red-600 enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110  enabled:hover:bg-red-700 font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed">
            GERI
          </button>
        </Link>
      </div>
    </div>
  );
}
