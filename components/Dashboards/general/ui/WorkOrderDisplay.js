"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMAGE_MAPPER, ITEM_TYPES } from "../../../../utils/mappers";
import ModalImage from "./ModalImage";
import WorkOrderService from "../../../../services/WorkOrderService";
export default function WorkOrderDisplay({ WorkOrderID }) {
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [values, setValues] = useState({});
  const getValues = () => {
    WorkOrderService.getByWorkOrder(WorkOrderID)
      .then((res) => {
        if (res.status === 200) {
          setValues(res.data[0]);
        }
      })
      .catch((err) => console.log(err.message));
  };
  const toggleCreate = () => {
    setCreate(!create);
  };
  return (
    <div>
      <a
        onClick={(e) => {
          getValues();
          toggleCreate();
        }}
        className="hover:cursor-pointer font-medium text-text-fuchsia-500  hover:underline"
      >
        Görüntüle
      </a>

      <div
        className={`${
          create ? "visible scale-100" : "invisible transform scale-0 h-0"
        } fixed z-50 inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto lg:p-10  h-full w-full transition duration-500 ease-in-out origin-center`}
      >
        <div className="relative lg:top-3 top-20 mx-auto p-5 border shadow-lg lg:w-full lg:w-full rounded-md bg-white p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 relative top-0 left-0 hover:cursor-pointer"
            onClick={() => {
              toggleCreate();
              router.refresh();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div
            className={`${
              true ? "visible scale-100" : "invisible scale-0 h-0"
            } flex flex-col space-y-10`}
          >
            <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-gray-600">
              İş Emri No : {`${values?.reference}-REV-${values?.revision}`}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:gap-32 lg:grid lg:grid-cols-2 lg:items-end">
                  <div className="flex flex-col gap-5  items-start lg:justify-self-end">
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Miktar :{""}
                      </p>
                      <p className="text-lg font-poppins">{`${values?.quotationItem?.unit_frequence}`}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Teslim Tarihi :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.sale_confirmation?.deliveryDate}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Analiz/Malzeme :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.quotationItem?.analyze?.analyze_Name}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Müşteri Referans No :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.sale_confirmation?.customerReference}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5  items-start lg:justify-self-start">
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Ürün Tipi :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${ITEM_TYPES[values?.quotationItem?.itemType]}`}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Ürün Açıklaması :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.sale_confirmation?.description}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Özel İstekler :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.sale_confirmation?.specialOffers}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Tarih :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.day}-${values?.month}-${values?.year}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg ">
                  <div className="flex flex-col items-center">
                    <ModalImage
                      image={IMAGE_MAPPER[values?.quotationItem?.itemType]}
                    />
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          İstenen Sertifikalar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values?.sale_confirmation?.certificates?.map(
                        (item, index) => {
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray-200 "
                            >
                              <td className="px-6 py-4 bg-gray-50 ">
                                {item.name}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 d">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Nihai Ağırlık
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Dış Atölye/ İşlemeci Firma Adı
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Model Firma Adı
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Paketleme
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 ">
                        <td className="px-6 py-4">
                          {values?.finalWeight === ""
                            ? values?.finalWeight
                            : "Girilmemiş"}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 d">
                          {values?.quotationItem?.treatment_firm}
                        </td>
                        <td className="px-6 py-4">
                          {values?.quotationItem?.model_firm}
                        </td>
                        <td className="px-6 py-4">
                          {values?.sale_confirmation?.package ? "Var" : "Yok"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/*Buttons*/}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-red-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={toggleCreate}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
