import Navbar from "../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../components/Dashboards/general/ui/ProfileBar";
import BreadCrumbs from "../../components/Dashboards/general/ui/BreadCrumbs";
import Footer from "../../components/base/Footer";
import CreateCustomer from "../../components/Dashboards/general/forms/CreateCustomer";
import axios from "axios";
import UpdateCustomer from "../../components/Dashboards/general/forms/UpdateCustomer";
import { useState } from "react";
import { useRouter } from "next/router";
import usePagination from "../../components/Dashboards/general/ui/Pagination";
import Pagination from "@mui/material/Pagination";
//TODO : Pagination Filter Problem

export default function CustomersPage({ customers }) {
  const router = useRouter();
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;

  const count = Math.ceil(customers.length / PER_PAGE);
  const _DATA = usePagination(customers, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const [filters, setFilters] = useState({
    account_id: "",
    account_title: "",
    account_related: "",
    customer_country: "",
  });

  const handleFilters = (field, e) => {
    let new_filters = filters;
    new_filters[field] = e.target.value;
    setFilters(new_filters);

    router.replace(router.asPath);
  };
  return (
    <div className="">
      <Navbar />
      <ProfileBar />
      <BreadCrumbs />
      <div className="flex flex-col p-10 lg:p-20 space-y-10">
        <h2 className=" font-medium lg:text-lg text-sm text-sky-700 tracking-widest font-poppins">
          Müşterilerim
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          <CreateCustomer />
          <p className="text-sky-700 italic font-poppins tracking-widest">
            Filtrele
          </p>
          <div className="flex space-x-20">
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Cari Ünvan
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ünvan Ara..."
                  onChange={(e) => handleFilters("account_title", e)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Cari Kod
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Cari Kod Ara..."
                  onChange={(e) => handleFilters("account_id", e)}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                İlgili Kişi
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Kişi Ara... "
                  onChange={(e) => handleFilters("account_related", e)}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                Ülke
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ülke ara..."
                  onChange={(e) => handleFilters("customer_country", e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {_DATA.currentData().length !== 0 ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      CARİ ÜNVAN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARİ KOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      İLGİLİ KİŞİ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ÜLKE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Düzenle</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {_DATA
                    .currentData()
                    .filter((customer) => {
                      if (filters.account_title === "") return customer;
                      else {
                        if (
                          customer.account_title
                            .toLowerCase()
                            .includes(filters.account_title.toLowerCase())
                        )
                          return customer;
                      }
                    })
                    .filter((customer) => {
                      if (filters.account_id === "") return customer;
                      else {
                        if (
                          `${customer.account_id}`
                            .toLowerCase()
                            .includes(filters.account_id.toLowerCase())
                        )
                          return customer;
                      }
                    })

                    .filter((customer) => {
                      if (filters.account_related === "") return customer;
                      else {
                        if (
                          customer.account_related
                            .toLowerCase()
                            .includes(filters.account_related.toLowerCase())
                        )
                          return customer;
                      }
                    })
                    .filter((customer) => {
                      if (filters.customer_country === "") return customer;
                      else {
                        if (
                          customer.customer_adress.customer_country
                            .toLowerCase()
                            .includes(filters.customer_country.toLowerCase())
                        )
                          return customer;
                      }
                    })
                    .map((customer, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {customer.account_title}
                          </th>
                          <td className="px-6 py-4">{customer.account_id}</td>
                          <td className="px-6 py-4">
                            {customer.account_related}
                          </td>
                          <td className="px-6 py-4">
                            {customer.customer_adress.customer_country}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <UpdateCustomer customer={customer} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="grid place-items-center p-5">
                <p className="italic font-poppins tracking-widest text-sm text-sky-700">
                  Müşteri Bulunamadı
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>
      <div className="grid place-items-center">
        {_DATA.currentData().length !==0 ? <Pagination count={count} page={page} onChange={handleChange} color="primary" /> : <div></div>}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/all`
    );
    if (res.status === 200) {
      return {
        props: {
          customers: res.data.customers,
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
