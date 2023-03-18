"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../../../../components/base/Loading";
import { TYPE } from "../../../../../utils/mappers";
import QuotationItemService from "../../../../../services/QuotationService/QuotationItemService";
import CreateMake from "../../../../../components/Dashboards/general/forms/QuotationMake/Forms/CreateaMake";
export default function ItemForm({ id }) {
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false);

  const type = searchParams.get("type");
  const prevType = searchParams.get("prevType");
  const prevId = searchParams.get("prevId");

  return (
    <div>
      {!isLoading && (
        <div className="w-full h-full flex flex-col space-y-5">
          {true && (
            <div className="space-y-5">
              <div>
                <p
                  className={`text-2xl flex text-center ${
                    type === "create" ? "text-green-600" : "text-yellow-600"
                  } tracking widest font-roboto text-md"`}
                >
                  {type === "create" ? "Yeni Kalem" : "Kalemi Güncelle"}
                </p>
              </div>
              <div className="rounded-md shadow-lg ">
                <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
                  <div>
                    {" "}
                    <CreateMake
                      type={type}
                      id={id}
                      prevType={prevType}
                      prevId={prevId}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
