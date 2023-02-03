import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
        if (res.status === 200) {
          setValues(res.data[0]);
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
              Sipariş Onay Formu : {``}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:gap-32 lg:grid lg:grid-cols-2 lg:items-end">
                  <div className="flex flex-col gap-5  items-start lg:justify-self-end">
                    <div className="flex gap-2 items-center">
                      <p className="text-md font-medium font-poppins italic text-sky-600 text-gray-900 ">
                        {" "}
                        Müşteri Adı ve Cari Kodu :{" "}
                      </p>
                      <p className="text-lg font-poppins">{}</p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg"></div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg"></div>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg"></div>
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
