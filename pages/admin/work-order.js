import Navbar from "../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../components/Dashboards/general/ui/ProfileBar";
import BreadCrumbs from "../../components/Dashboards/general/ui/BreadCrumbs";
import Footer from "../../components/base/Footer";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import CreateWorkOrder from "../../components/Dashboards/general/forms/CreateWorkOrder";


export default function quotationMake({customers, workOrders}) {
  const generate = (e) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/work-order/generate`, {method : "POST", headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id : e.target.id.split(",")[0], type :e.target.id.split(",")[1]}),}).then((response) => {
      response.blob().then((blob) => {
        
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "WorkOrder.docx";
        a.click();
      });
    });
  } 
  return (
    <div className="">
      <Navbar />
      <ProfileBar />
      <BreadCrumbs />
      <div className="flex flex-col p-10 lg:p-20 space-y-10">
        <h2 className=" font-medium lg:text-lg text-sm text-sky-700 tracking-widest font-poppins">
          İş Emri Hazırlama
        </h2>
        <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg p-5 space-x-5 items-center">
          {/*Create Button*/}
          <CreateWorkOrder customers={customers} />
          <p className="text-sky-700 italic font-poppins tracking-widest">
            Filtrele
          </p>
          <div className="flex space-x-20">
          <div className="flex flex-col space-y-3">
              <p className="text-xs font-poppins font-medium italic text-sky-700">
                İş Emri Referans  Numarası
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="text"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Ürün Ara..."
                  onChange={(e) => handleFilters("account_title", e)}
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
                Tarih
              </p>
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <input
                  type="date"
                  className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                  placeholder="Tarih Ara..."
                  onChange={(e) => handleFilters("customer_country", e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-100 ">
          <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
            {workOrders.length !== 0 ? (
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      <span className="sr-only">Düzenle</span>
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                {
                   workOrders.map((item, index) =>  {
                    let type = ''
        if (item.quotationItem.straight_bush === null && item.quotationItem.plate_strip === null && item.quotationItem.doublebracket_bush === null && item.quotationItem.middlebracket_bush === null) {
           type = 'bracket_bush'
          } if(item.quotationItem.plate_strip === null && item.quotationItem.bracket_bush === null && item.quotationItem.doublebracket_bush === null && item.quotationItem.middlebracket_bush === null) {
            
            type = 'straigth_bush'
            
          } if(item.quotationItem.bracket_bush === null && item.quotationItem.straight_bush === null && item.quotationItem.doublebracket_bush === null && item.quotationItem.middlebracket_bush === null) {
            type = 'plate_strip'
            
          } if (item.quotationItem.bracket_bush === null && item.quotationItem.straight_bush=== null && item.quotationItem.plate_strip=== null && item.quotationItem.middlebracket_bush === null){
            type = 'doublebracket_bush'
          } if (item.quotationItem.bracket_bush === null && item.quotationItem.straight_bush=== null && item.quotationItem.plate_strip=== null && item.quotationItem.doublebracket_bush === null){
            type = 'middlebracket_bush'

          }
                    return (<tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {item.reference}
                    
                          </th>
                          <td className="px-6 py-4">{item.sale_confirmation.reference}</td>
                          
                          <td className="px-6 py-4">
                            {item.Customer_ID}
                          </td>
                          <td className="px-6 py-4">
                          {item.day + "-" + item.month +  "-" + item.year}
                          </td>
                          <td className="px-6 py-4 text-right">
                           {item.revision}
                          </td>
                          <td className="px-6 py-4 text-right">
                          <button id={item.workorder_ID + "," + type} onClick={generate} className="hover:underline">İndir</button>
                          </td>

                          <td className="px-6 py-4 text-right">
                            
                          </td>

                          
                        </tr>)
                   })
                }
                </tbody>
                
              </table>
            ) : (
              <div className="grid place-items-center p-5">
                <p className="italic font-poppins tracking-widest text-sm text-sky-700">
                  Sipariş Onay Formu Bulunamadı
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>
      <div className="grid place-items-center mb-10">
        
      </div>
      <Footer />
    </div>
  );
}


export async function getServerSideProps(context) {
  try {
    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/customer/all`
    );

    const res3 = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/work-order/all`
      );
    if (res2.status === 200 && res3.status === 200) {
      return {
        props: {
          workOrders : res3.data,
          customers : res2.data.customers,
          
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