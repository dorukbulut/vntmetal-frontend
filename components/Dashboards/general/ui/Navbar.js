import {useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
export default function Navbar () {
    const [isOpen, setIsOpen] = useState(true);
    const [sales, setSales ] = useState(false);
    const [quotation, setQuotation] = useState(false);
    
    const toggleQuotation = () => {
      setQuotation(!quotation);
    }
    const toggleSales  = () => {
      setSales(!sales);
    } 
    const toggleNav = () => {
      setIsOpen(!isOpen);
    }
    return (
      <>
       <div className={isOpen ? "border border-r-2 border-solid absolute w-3/5 md:w-1/3 lg:w-1/5 h-screen bg-gray-100 z-40  p-5 translate-x-0 ease-in-out duration-300" :"fixed z-40 top-0 left-0  h-screen -translate-x-full ease-in-out duration-100 p-5"}>
          <div className={!isOpen ? "p-10 absolute" : "hidden"}>
            <svg onClick={toggleNav} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="hover:cursor-pointer stroke-gray-500 justify-self-end w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>

          <div className={isOpen ? "flex flex-col space-y-10 items-start" : "hidden"}>

            <div className="grid ease-in-out">
              <svg onClick={toggleNav}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="hover:cursor-pointer hover:bg-gray-300 stroke-gray-500 justify-self-end w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className='flex items-center space-x-5 border-solid border-b-2 p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-sky-700 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>

              <p className="font-poppins text-xs lg:text-lg md:text-lg text-sky-700 tracking-widest">VNT METAL DYS</p>
              <hr/>
            </div>

            
            {/*Sales navigation*/}
            <div className='flex flex-col items-end pb-2 space-y-2'>
                <div className='flex items-center space-x-5'>
                  <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="stroke-sky-700 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p onClick={toggleSales} className="hover:cursor-pointer font-poppins text-xs text-sky-700 tracking-widest">Sipariş Modülü</p>
                  <ChevronDownIcon onClick={toggleSales} className={`-mr-1 ml-2 h-5 w-5 ${sales ? "rotate-180": ""} ease-in-out duration-300 hover:cursor-pointer`} aria-hidden="true" />
                </div>

                <div className={`flex flex-col space-y-4 tracking-widest font-poppins lg:text-xs text-xs text-sky-600 ${sales? "visible  scale-100 border-solid border-l-2" : "invisible transform scale-0 h-0"} transition duration-300 ease-in-out origin-top`}>
                    
                      <p className=" hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md">Müşterilerim</p>
                      <div className="flex flex-col lg:text-xs text-xs mb-10 ">
                        <div className='flex items-center w-full'>
                          <p className="hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md">Tekliflerim</p>
                          <ChevronDownIcon onClick={toggleQuotation} className={`-mr-1 ml-2 h-5 w-5 ${quotation ? "rotate-180": "rotate-0"} ease-in-out duration-300 hover:cursor-pointer`} aria-hidden="true" />
                        </div>
                        <div className={`flex flex-col w-full justify-self-end items-end space-y-2 ${quotation? "visible  scale-100 " : "invisible transform scale-0 h-0"} transition duration-300 ease-in-out origin-top`}>
                          <p className='pl-10 hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md'>Teklif Hazırlama</p>
                          <p className='pl-10 hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md'>Teklif Formlarım</p>
                        </div>
                      </div>
                      <p className='hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md'>Satış Formlarım</p>
                      <p className='hover:bg-gray-200 hover:cursor-pointer p-2 hover:rounded-md'>Iş Emirlerim</p>
                    
                    
                </div>
               
            </div>

            
            
          </div>

       </div>
       </>
    );
}