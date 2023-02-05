import Navbar from "../../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../../components/Dashboards/general/ui/ProfileBar";
import BreadCrumbs from "../../../components/Dashboards/general/ui/BreadCrumbs";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CreateQuotationForm from "../../../components/Dashboards/general/forms/QuotationForms/Forms/CreateQuotationForm";
import UpdateQuotationForm from "../../../components/Dashboards/general/forms/QuotationForms/Forms/UpdateQuotationForm";
import QuotationFormDisplay from "../../../components/Dashboards/general/ui/QuotationFormDisplay";
export default function QuotationMake({ customers, forms }) {
  const generate = (e) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: e.target.id }),
    }).then((response) => {
      response.blob().then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "QuotationForm.docx";
        a.click();
      });
    });
  };
  const router = useRouter();
  const [filters, setFilters] = useState();

  const [formItems, setformItems] = useState(forms.rows);

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/get-page/${
        parseInt(page) - 1
      }`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          setformItems(res.data.rows);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    if (filters) {
      axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/filter`,
        params: {
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
        },
      })
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
    console.log(filters);
    router.replace(router.asPath);
  };
  return (
    <div className="">
      <Navbar />
      <ProfileBar />
      <BreadCrumbs />
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
          <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
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
                            onClick={generate}
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
              count={Math.ceil(forms.count / 6)}
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

export async function getServerSideProps(context) {
  try {
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/all`
    );
    const r3 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/get-page/0`
    );
    console.log(r3);
    if (res2.status === 200 && r3.status === 200) {
      return {
        props: {
          customers: res2.data.customers,
          forms: r3.data,
        },
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}
