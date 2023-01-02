import Navbar from "../../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../../components/Dashboards/general/ui/ProfileBar";
import BreadCrumbs from "../../../components/Dashboards/general/ui/BreadCrumbs";
import Footer from "../../../components/base/Footer";
import CreateMake from "../../../components/Dashboards/general/forms/CreateaMake";
import CreateAnalyze from "../../../components/Dashboards/general/forms/CreateAnalyze";
import axios from "axios";
import UpdateCustomer from "../../../components/Dashboards/general/forms/UpdateCustomer";
import { useState, useEffect} from "react";
import { useRouter } from "next/router";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UpdateMake from "../../../components/Dashboards/general/forms/UpdateMake";

export default function quotationMake({analyzes, customers, items}) {
  const router = useRouter();
  const [filters, setFilters] = useState();

  const [quotItems, setquotItems] = useState(items.rows);

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios({
      method : "GET",
      url : `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/get-page/${parseInt(page) - 1}`,
      withCredentials : true
    })
    .then(res => {
      if (res.status === 200) {
        setquotItems(res.data.rows);
      }
    })
    .catch(err => console.log(err));
  } , [page])

  useEffect(() => {
    console.log(filters);
    
    if(filters) {
      axios({
        method : "GET",
        url : `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/filter`,
        params : {
          account : filters.account_id !== undefined && filters.account_id !== ''  ? filters.account_id : undefined,
          type  :  filters.type !== undefined && filters.type !== '' ? filters.type.replaceAll(" ", "+") : undefined,
          date : filters.date !== undefined && filters.date !== ''  ? filters.date : undefined,
        }
  
      })
      .then(res => {
        if (res.status === 200) {
          setquotItems(res.data.rows);
        }
      })
      .catch(err => {
        router.reload(window.location.pathname);
      });
    }
    
  }, [filters]) 
  
  
  

  const handleFilters = (field, e) => {
    setFilters(old => {
      return {
        ...old,
        [field] : e.target.value
      }
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
          Teklif Hazırlama
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          <CreateMake analyzes={analyzes} customers={customers}/>
          <CreateAnalyze />
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
          <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
            {quotItems.length !== 0 ? (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                {
                   quotItems.map((item, index) =>  {
                    return (<tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {item.straight_bush ? "Düz Burç" : ""}
                            {item.plate_strip ? "Plaka" : ""}
                            {item.bracket_bush ? "Flanşlı Burç" : ""}
                            {item.middlebracket_bush ? "Ortadan Flanşlı Burç" : ""}
                            {item.doublebracket_bush ? "Çift Flanşlı Burç" : ""}
                    
                          </th>
                          <td className="px-6 py-4">{item.Customer_ID}</td>
                          <td className="px-6 py-4">
                            {item.unit_price}
                          </td>
                          <td className="px-6 py-4">
                            {item.unit_frequence}
                          </td>
                          <td className="px-6 py-4">
                            {item.createdAt}
                          </td>
                          <td className="px-6 py-4 text-right">
                          <UpdateMake analyzes={analyzes} customers={customers} item={item}/>
                          </td>
                        </tr>)
                   })
                }
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
      {quotItems.length !==0 ? <Stack spacing={2}>
        <Pagination count={Math.ceil(items.count / 6)} page={page} onChange={handlePageChange} />
    </Stack> : <div></div>}
      </div>
      <Footer />
    </div>
  );
}


export async function getServerSideProps(context) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/analyze/getAll`
    );
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/all`
    );
    const res3 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-items/get-page/0`
    )
    
    if (res.status === 200 && res2.status === 200 && res3.status === 200) {
      return {
        props: {
          analyzes: res.data.analyzes,
          customers : res2.data.customers,
          items: res3.data
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