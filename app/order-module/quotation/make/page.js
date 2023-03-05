"use client";
import QuotationItemService from "../../../../services/QuotationService/QuotationItemService";
import CreateMake from "../../../../components/Dashboards/general/forms/QuotationMake/Forms/CreateaMake";
import CreateAnalyze from "../../../../components/Dashboards/general/forms/QuotationMake/Forms/CreateAnalyze";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UpdateAnalyze from "../../../../components/Dashboards/general/forms/QuotationMake/Forms/UpdateAnalyze";
import { ITEM_TYPES } from "../../../../utils/mappers";

export default function QuotationMake({ items }) {
  //

  const [filters, setFilters] = useState();

  const [quotItems, setquotItems] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    QuotationItemService.getDefaultData().then((res) => {
      if (res.status === 200) {
        setquotItems(res.data.rows);
        setCount(res.data.count);
      }
    });
  }, []);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    QuotationItemService.getPage(parseInt(page) - 1)
      .then((res) => {
        if (res.status === 200) {
          setquotItems(res.data.rows);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    if (filters) {
      const params = {
        Customer_ID:
          filters.account_id !== undefined && filters.account_id !== ""
            ? filters.account_id
            : undefined,
        createdAt:
          filters.date !== undefined && filters.date !== ""
            ? filters.date
            : undefined,
      };
      QuotationItemService.getFilteredData(params)
        .then((res) => {
          if (res.status === 200) {
            setquotItems(res.data.rows);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filters]);

  const handleFilters = (field, e) => {
    setFilters((old) => {
      return {
        ...old,
        [field]: e.target.value,
      };
    });
  };
  return (
    <div className="">
      <div className="flex flex-col p-10 lg:p-20 space-y-10">
        <h2 className=" font-medium lg:text-lg text-sm text-sky-700 tracking-widest font-poppins">
          Teklif Hazırlama
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          <CreateMake
            key={`${1021}+${new Date().getTime()}`}
            prevValues={{}}
            type={"create"}
          />
          <CreateAnalyze />
          <UpdateAnalyze />
          <p className="text-sky-700 italic font-poppins tracking-widest">
            Filtrele
          </p>
          <div className="flex space-x-20">
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Cari Kod
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="number"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Cari Kod Ara..."
                  onChange={(e) => handleFilters("account_id", e)}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Tarih
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="date"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Tarih Ara..."
                  onChange={(e) => handleFilters("date", e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 ">
          <div className="relative overflow-x-auto overflow-y-scroll h-64 shadow-md  sm:rounded-lg">
            {quotItems.length !== 0 ? (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ÜRÜN TİPİ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARİ KOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      SATIŞ FİYATI
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ADET
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TARİH
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Düzenle</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quotItems.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b  hover:bg-gray-50 "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 "
                        >
                          {ITEM_TYPES[item.itemType]}
                        </th>
                        <td className="px-6 py-4">{item.Customer_ID}</td>
                        <td className="px-6 py-4">
                          {item.unit_price + " " + item.currency}
                        </td>
                        <td className="px-6 py-4">{item.unit_frequence}</td>
                        <td className="px-6 py-4">{item.createdAt}</td>
                        <td className="px-6 py-4 text-right">
                          <CreateMake
                            key={`${index}+${new Date().getTime()}`}
                            prevValues={item}
                            item={item}
                            type={"update"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="grid place-items-center p-5">
                <p className="italic font-poppins tracking-widest text-sm text-sky-700">
                  Teklif Bulunamadı
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid place-items-center mb-10">
        {quotItems.length !== 0 ? (
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(count / 6)}
              page={page}
              onChange={handlePageChange}
            />
          </Stack>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
