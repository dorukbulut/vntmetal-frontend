"use client";
import CustomerService from "../../../../services/CustomerService/index.js";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CreateQuotationForm from "../../../../components/Dashboards/general/forms/QuotationForms/Forms/CreateQuotationForm";
import UpdateQuotationForm from "../../../../components/Dashboards/general/forms/QuotationForms/Forms/UpdateQuotationForm";
import QuotationFormDisplay from "../../../../components/Dashboards/general/ui/QuotationFormDisplay";
import QuotationFormService from "../../../../services/QuotationService/QuotationFormService";
export default function QuotationMake() {
  const [filters, setFilters] = useState();
  const [customers, setCustomers] = useState([]);
  const [formItems, setformItems] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    QuotationFormService.getDefaultData().then((res) => {
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
    QuotationFormService.getPage(parseInt(page - 1))
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
        reference:
          filters.reference !== undefined && filters.reference !== ""
            ? filters.reference.replaceAll(" ", "+")
            : undefined,
        date:
          filters.date !== undefined && filters.date !== ""
            ? filters.date
            : undefined,
        customer:
          filters.customer !== undefined && filters.customer !== ""
            ? filters.customer.replaceAll(" ", "+")
            : undefined,
      };
      QuotationFormService.getFilteredData(params)
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
          Teklif Formu Hazırlama
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          <CreateQuotationForm
            key={`${9012}+${new Date().getTime()}+qr2`}
            customers={customers}
          />
          <p className="text-sky-700 italic font-poppins tracking-widest">
            Filtrele
          </p>
          <div className="flex space-x-20">
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Form Referans Numarası
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ürün Ara..."
                  onChange={(e) => handleFilters("reference", e)}
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
                Müşteri Referans Numarası
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Cari Kod Ara..."
                  onChange={(e) => handleFilters("customer", e)}
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
                      Form Referans Numarası
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARİ KOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Müşteri Referans Numarası
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
                      <tr
                        key={index}
                        className="bg-white border-b  hover:bg-gray-50 "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                        >
                          {item.reference}
                        </th>
                        <td className="px-6 py-4">{item.Customer_ID}</td>
                        <td className="px-6 py-4">{item.customerInquiryNum}</td>
                        <td className="px-6 py-4">
                          {`${item.day}-${item.month}-${item.year}`}
                        </td>
                        <td className="px-6 py-4">{item.revision}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            id={item.quotation_ID}
                            onClick={QuotationFormService.generateForm}
                            className="hover:underline"
                          >
                            İndir
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <QuotationFormDisplay
                            key={`${index}+${new Date().getTime()}qr`}
                            quotID={item.quotation_ID}
                          />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <UpdateQuotationForm
                            key={`${index}+${new Date().getTime()}`}
                            customerID={item.Customer_ID}
                            quotID={item.quotation_ID}
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
                  Form Bulunamadı
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
