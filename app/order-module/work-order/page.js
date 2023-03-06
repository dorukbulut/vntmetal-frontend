"use client";
import CustomerService from "../../../services/CustomerService/index.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import CreateWorkOrder from "../../../components/Dashboards/general/forms/WorkOrder/Forms/CreateWorkOrder";
import UpdateWorkOrder from "../../../components/Dashboards/general/forms/WorkOrder/Forms/UpdateWorkOrder";
import WorkOrderService from "../../../services/WorkOrderService";
export default function QuotationMake() {
  const [filters, setFilters] = useState();

  const [formItems, setformItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    WorkOrderService.getDefaultData().then((res) => {
      if (res.status === 200) {
        setformItems(res.data.rows);
        setCount(res.data.count);

        CustomerService.getAllCustomers().then((res) => {
          console.log("res");
          if (res.status === 200) {
            setCustomers(res.data.customers);
          }
        });
      }
    });
  }, []);
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    WorkOrderService.getPage(parseInt(page) - 1)
      .then((res) => {
        if (res.status === 200) {
          setformItems(res.data.rows);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    if (filters) {
      const params = {
        account:
          filters.account_id !== undefined && filters.account_id !== ""
            ? filters.account_id
            : undefined,
        workReference:
          filters.workReference !== undefined && filters.workReference !== ""
            ? filters.workReference.replaceAll(" ", "+")
            : undefined,
        date:
          filters.date !== undefined && filters.date !== ""
            ? filters.date
            : undefined,
        saleReference:
          filters.saleReference !== undefined && filters.saleReference !== ""
            ? filters.saleReference.replaceAll(" ", "+")
            : undefined,
      };

      WorkOrderService.getFilteredData(params)
        .then((res) => {
          if (res.status === 200) {
            setformItems(res.data.rows);
          }
        })
        .catch((err) => {});
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
          İş Emri Hazırlama
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          {/*Create Button*/}
          <CreateWorkOrder key={12002} customers={customers} />
          <p className="text-sky-700 italic font-poppins tracking-widest">
            Filtrele
          </p>
          <div className="flex space-x-20">
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                İş Emri Referans Numarası
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ürün Ara..."
                  onChange={(e) => handleFilters("workReference", e)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Sipariş Referans Numarası
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ürün Ara..."
                  onChange={(e) => handleFilters("saleReference", e)}
                />
              </div>
            </div>

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
            {formItems.length !== 0 ? (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      İş Emri Referans Numarası
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sipariş Referans Numarası
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARİ KOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tarih
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Revizyon
                    </th>
                    <th scope="col" className="px-6 py-3">
                      İndir
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Görüntüle</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Düzenle</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formItems.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.reference}
                        </th>
                        <td className="px-6 py-4">
                          {item.sale_confirmation.reference}
                        </td>

                        <td className="px-6 py-4">{item.Customer_ID}</td>
                        <td className="px-6 py-4">
                          {item.day + "-" + item.month + "-" + item.year}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.revision}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            id={
                              item.workorder_ID +
                              "," +
                              item.quotationItem.itemType
                            }
                            onClick={WorkOrderService.generateForm}
                            className="hover:underline"
                          >
                            İndir
                          </button>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <UpdateWorkOrder
                            key={`${index + 4}+${new Date().getTime()}`}
                            Workitem={item}
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
                  İş Emri Bulunamadı
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid place-items-center mb-10">
        {formItems.length !== 0 ? (
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
