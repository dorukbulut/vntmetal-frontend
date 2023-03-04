"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkOrderService from "../../../../../../services/WorkOrderService";

export default function UpdateWorkOrder({ Workitem }) {
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [fields, setFields] = useState({
    options: {
      Item_ID: "",
      type: "",
      plate_model_size: "",
      treatment_size: "",
    },
  });

  const [currErrors, setCurrErrors] = useState({
    options: {
      Customer_ID: "",
      sale_ID: "",
    },
  });

  const [Customer_ID, setCustomer] = useState({
    options: {
      Customer_ID: Workitem.Customer_ID,
    },
  });

  const [all, setAll] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [selectConf, setSelectedConf] = useState({
    options: {
      sale_ID: Workitem.Sale_ID,
    },
  });

  const [typeName, setType] = useState("");

  const handleChangeCustomer = (field, area, e) => {
    setCustomer((old) => {
      return {
        ...old,
        [field]: {
          [area]: e.target.value,
        },
      };
    });

    setSelectedConf({
      options: {
        sale_ID: "",
      },
    });
  };

  const handleChangeQuo = (field, area, e) => {
    setSelectedConf((old) => {
      return {
        ...old,
        [field]: {
          [area]: e.target.value,
        },
      };
    });
  };

  const router = useRouter();

  const handleChange = (field, area, e) => {
    let new_fields = fields;
    new_fields[field][area] = e.target.value;
    setFields(new_fields);
  };

  const handleValidation = () => {
    let check_fields = fields;
    let errors = currErrors;
    let isValid = true;

    //Customer_ID
    if (Customer_ID.options.Customer_ID === "") {
      isValid = false;
      errors.options.Customer_ID = "Müşteri Cari Kodu Boş bırakalamaz !";
    } else {
      errors.options.Customer_ID = "";
    }

    //Quotation_ID
    if (selectConf.options.sale_ID === "") {
      isValid = false;
      errors.options.sale_ID = "Form Referans Numarası Boş bırakalamaz !";
    } else {
      errors.options.sale_ID = "";
    }

    setCurrErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let data = {
        options: {
          Customer_ID: Workitem.Customer_ID,
          Sale_ID: Workitem.Sale_ID,
          Item_ID: Workitem.Item_ID,
          plate_model_size: fields.options.plate_model_size,
          treatment_size: fields.options.treatment_size,
          reference: Workitem.reference,
        },
      };

      try {
        const res = await WorkOrderService.updateForm(data);
        if (res.status === 200) {
          setSubmit(true);
          setIsvalid(true);
        }
      } catch (err) {
        setSubmit(false);
        setCreateErr(true);
      }
    } else {
      setIsvalid(false);
    }
  };

  const toggleCreate = () => {
    setCreate(!create);
  };
  useEffect(() => {
    let type = "";
    if (
      Workitem.quotationItem.straight_bush === null &&
      Workitem.quotationItem.plate_strip === null &&
      Workitem.quotationItem.doublebracket_bush === null &&
      Workitem.quotationItem.middlebracket_bush === null
    ) {
      type = "Flanşlı Burç";
    }
    if (
      Workitem.quotationItem.plate_strip === null &&
      Workitem.quotationItem.bracket_bush === null &&
      Workitem.quotationItem.doublebracket_bush === null &&
      Workitem.quotationItem.middlebracket_bush === null
    ) {
      type = "Düz Burç";
    }
    if (
      Workitem.quotationItem.bracket_bush === null &&
      Workitem.quotationItem.straight_bush === null &&
      Workitem.quotationItem.doublebracket_bush === null &&
      Workitem.quotationItem.middlebracket_bush === null
    ) {
      type = "Plaka";
    }
    if (
      Workitem.quotationItem.bracket_bush === null &&
      Workitem.quotationItem.straight_bush === null &&
      Workitem.quotationItem.plate_strip === null &&
      Workitem.quotationItem.middlebracket_bush === null
    ) {
      type = "Çift Flanşlı Burç";
    }
    if (
      Workitem.quotationItem.bracket_bush === null &&
      Workitem.quotationItem.straight_bush === null &&
      Workitem.quotationItem.plate_strip === null &&
      Workitem.quotationItem.doublebracket_bush === null
    ) {
      type = "Ortadan Flanşlı Burç";
    }
    setType(type);
  });
  return (
    <div>
      <a
        onClick={toggleCreate}
        className="hover:cursor-pointer font-medium text-text-fuchsia-500  hover:underline"
      >
        Düzenle
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
              router.refresh();
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
              !submit && isValid && !createErr
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } flex flex-col space-y-10`}
          >
            <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
              Yeni İş Emri
            </p>
            <form className="grid grid-cols-1 space-y-5 lg:grid-cols-1 ">
              {/*Customer info*/}
              <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Form Bilgileri
                  </p>
                  <hr />
                </div>

                <div className="space-y-5 lg:grid lg:grid-cols-3 lg:items-end lg:gap-10 ">
                  <div className="flex flex-col space-y-3 ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Cari Kod *
                    </label>
                    <p>{Customer_ID.options.Customer_ID}</p>
                  </div>
                  <div className="flex flex-col space-y-3 ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Sipariş Onay Formu *
                    </label>
                    {Workitem.sale_confirmation.reference +
                      "-REV" +
                      Workitem.sale_confirmation.revision}
                  </div>
                </div>
              </div>
              <div className="m-0 space-y-7 lg:flex lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    İş Emri Bilgileri
                  </p>
                  <hr />
                </div>

                <div className="space-y-5 lg:grid lg:place-items-center lg:w-4/5">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Ürün Tipi
                    </label>
                    <p>{typeName}</p>
                  </div>
                </div>
                {typeName === "Plaka" ? (
                  <div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                      >
                        Plaka Model Ölçüsü *
                      </label>
                      <input
                        type="number"
                        step={"any"}
                        className="invalid:border-red-500  pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100  relative  block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                        placeholder=""
                        onChange={(e) =>
                          handleChange("options", "plate_model_size", e)
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                      >
                        Dış Atölyede İşlenecek Ölçü *
                      </label>
                      <input
                        type="number"
                        step={"any"}
                        className="invalid:border-red-500  pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100  relative  block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                        placeholder=""
                        onChange={(e) =>
                          handleChange("options", "treatment_size", e)
                        }
                      />
                    </div>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </form>

            {/*Buttons*/}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={(e) => {
                  console.log(typeName);
                  handleSubmit(e);
                }}
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
          </div>

          <div
            className={`${
              submit && isValid ? "visible scale-100" : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
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
              Başarılı!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                İş Emri Başarıyla Oluşturuldu!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  toggleCreate();
                  setSubmit(false);
                  router.refresh();
                }}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Tamam
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && !isValid
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Eksik Bilgi girdiniz !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>

              <div className="text-justify font-poppins italic w-full space-y-1">
                {!submit && !isValid
                  ? Object.entries(currErrors).map((heading) => {
                      return Object.entries(heading[1]).map((err, index) => {
                        if (err[1] !== 0) {
                          return (
                            <p key={index} className="text-sm text-red-600">
                              {err[1]}
                            </p>
                          );
                        }
                      });
                    })
                  : ""}
              </div>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setIsvalid(true);
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && createErr
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Böyle bir müşteri zaten mecvut !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setCreateErr(false);
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
