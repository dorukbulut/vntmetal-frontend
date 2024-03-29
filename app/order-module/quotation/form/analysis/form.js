"use client";
import UpdateAnalyze from "../../../../../components/Dashboards/general/forms/QuotationMake/Forms/UpdateAnalyze";
import CreateAnalyze from "../../../../../components/Dashboards/general/forms/QuotationMake/Forms/CreateAnalyze";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function AnalysisForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const prevType = searchParams.get("prevType");
  const prevId = searchParams.get("prevId");
  return (
    <div className="w-full h-full flex flex-col space-y-5">
      {true && (
        <div className="space-y-5">
          <div>
            <p
              className={`text-2xl flex text-center ${
                type === "create" ? "text-green-600" : "text-yellow-600"
              } tracking widest font-roboto text-md"`}
            >
              {type === "create" ? "Yeni Analiz" : "Analiz Güncelle"}
            </p>
          </div>
          <div className="rounded-md shadow-lg ">
            <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Analiz Bilgileri
                </p>

                {type === "create" ? (
                  <CreateAnalyze
                    prevType={prevType}
                    prevId={prevId}
                    type={type}
                  />
                ) : (
                  <UpdateAnalyze
                    type={type}
                    prevType={prevType}
                    prevId={prevId}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
