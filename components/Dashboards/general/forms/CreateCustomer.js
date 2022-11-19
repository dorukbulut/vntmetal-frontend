import { useState } from "react";
export default function CreateCustomer() {
  const [create, setCreate] = useState(false);
  const toggleCreate = () => {
    setCreate(!create);
  };
  return (
    <div>
      <button
        className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleCreate}
      >
        + Müşteri Oluştur
      </button>

      <div
        className={`${
          create ? "visible scale-100" : "invisible transform scale-0 h-0" 
        } fixed z-50 inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto  h-full w-full  transition duration-500 ease-in-out origin-center`}
      >
        <div className="relative top-20 mx-auto p-5 border shadow-lg lg:w-1/2 lg:w-1/2 rounded-md bg-white p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 relative top-0 left-0 hover:cursor-pointer"
            onClick={toggleCreate}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div className="flex flex-col space-y-10">
            <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
              Yeni Müşteri
            </p>
            <form className="grid grid-cols-1 space-y-5">
              <div className="space-y-2">
                <p className="text-center font-poppins text-gray-500 font-medium text-sm ">Cari Hesap Bilgileri</p>
                <hr />
              </div>
              {/*Customer info*/}
              <div className="space-y-5">
                <div className="flex flex-col ">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Cari Kod
                  </label>
                  <input
                    type="number"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Cari Ünvan
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    İlgili Kişi
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    T.C Kimlik Numarası
                  </label>
                  <input
                    type="number"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Telefon Numarası 1
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Telefon Numarası 2
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Fax Numarası
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    E-Posta Adresi
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Web Sitesi
                  </label>
                  <input
                    type="text"
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
                  >
                    Kep Adresi
                  </label>
                  <input
                    type=""
                    className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-center font-poppins text-gray-500 font-medium text-sm ">Vergi Dairesi Bilgileri</p>
                <hr />
              </div>
              {/*Tax Info*/}
              <div></div>

              {/*Contact Info*/}
              <div></div>

              {/*Buttons*/}
              <div className="flex justify-end space-x-3">
                <button
                  className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={toggleCreate}
                >
                  Oluştur
                </button>
                <button
                  className="bg-red-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={toggleCreate}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
          <div className=" hidden mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Successful!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Account has been successfully registered!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
