import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ITEM_TYPES } from "../../../../utils/mappers";
import axios from "axios";

export default function SaleConfirmationDisplay({ ConfirmationID }) {
  const router = useRouter();
  const [create, setCreate] = useState(false);
  const [values, setValues] = useState({});
  const getValues = () => {
    axios({
      method: "POST",
      data: {
        sale_ID: ConfirmationID,
      },
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND}/api/sale-confirmation/get-conf`,
    })
      .then((res) => {
        let temp = [];
        temp.push(res.data[0].quotationItem);
        let data = {
          ...res.data[0],
          quotationItems: temp,
        };
        if (res.status === 200) {
          setValues(data);
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
              router.reload(window.location.pathname);
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
              Sipariş Onay Formu :{" "}
              {`${values?.reference}-REV-${values?.revision}`}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:gap-32 lg:grid lg:grid-cols-2 lg:items-end">
                  <div className="flex flex-col gap-5  items-start lg:justify-self-end">
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Müşteri Adı ve Cari Kodu :{""}
                      </p>
                      <p className="text-lg font-poppins">{`${values?.customer?.account_title}-${values?.Customer_ID}`}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Teklif Tarihi :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.quotation_form?.year}-${values?.quotation_form?.month}-${values?.quotation_form?.day}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Sipariş Tarihi :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.OrderDate}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Şirket :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.company}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5  items-start lg:justify-self-start">
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Planlanan Teslim Tarihi :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.deliveryDate}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Özel İstekler :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.specialOffers}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Müşteri Referans No. :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${values?.customerReference}`}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Şirket :{""}
                      </p>
                      <p className="text-lg font-poppins">
                        {`${
                          values?.language === "English"
                            ? "İngilizce"
                            : "Türkçe"
                        }`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 d">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Ürün
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ürün Açıklaması
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ölçü
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Miktar
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Hesaplanan Ağırlık
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Analiz
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Birim Fiyat
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Açıklama
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values?.quotationItems?.map((item, index) => {
                        return (
                          <tr className="border-b border-gray-200 " key={index}>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                            >
                              {ITEM_TYPES[item.itemType]}
                            </th>
                            <td className="px-6 py-4">{item.description}</td>
                            <td className="px-6 py-4 bg-gray-50 d">
                              {item.dimensions}
                            </td>
                            <td className="px-6 py-4">{item.unit_frequence}</td>
                            <td className="px-6 py-4">
                              {parseFloat(item.calcRaw).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              {item.analyze.analyze_Name}
                            </td>
                            <td className="px-6 py-4">
                              {parseFloat(item.unit_price)} {item.currency}
                            </td>
                            <td className="px-6 py-4">{item.deliveryTime}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 d">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Dış Atölye/ İşlemeci Firma Adı
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Dış Atölye/ İşlemeci Firma Fiyatı
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Model Firma Adı
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Model Firma Fiyat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 ">
                        <td className="px-6 py-4">
                          {values?.quotationItem?.treatment_firm}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 d">
                          {values?.quotationItem?.treatment_price}{" "}
                          {values?.quotationItem?.currency}
                        </td>
                        <td className="px-6 py-4">
                          {values?.quotationItem?.model_firm}
                        </td>
                        <td className="px-6 py-4">
                          {values?.quotationItem?.model_price}{" "}
                          {values?.quotationItem?.currency}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                      {values?.certificates?.map((item, index) => {
                        return (
                          <tr key={index} className="border-b border-gray-200 ">
                            <td className="px-6 py-4 bg-gray-50 ">
                              {item.name}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase ">
                      <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Teslim Şekli
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 ">
                          Paketleme
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 ">
                        <td className="px-6 py-4 bg-gray-50 ">
                          {values?.quotation_form?.delivery_type?.name}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 ">
                          {values?.package ? "Var" : "Yok"}
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
