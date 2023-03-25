"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "../../Common/Dropdown";
import ItemSelect from "../../ItemSelect";
import CheckMark from "../../CheckMark";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import QuotationItemService from "../../../../../../services/QuotationService/QuotationItemService";
import QuotationFormService from "../../../../../../services/QuotationService/QuotationFormService";
import OrderConfirmationService from "../../../../../../services/OrderConfirmationService";

export default function CreateConfirmationForm({ customers }) {
  const CUSTOMER = customers.map((customer) => {
    return {
      key: customer.account_id,
      value: customer.account_id,
    };
  });
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [fields, setFields] = useState({
    options: {
      customerReference: "",
      OrderDate: "",
      deliveryDate: "",
      specialOffers: "",
      description: "",
      company: "",
      language: "",
    },
  });

  const [currErrors, setCurrErrors] = useState({
    options: {
      customerReference: "",
      OrderDate: "",
      deliveryDate: "",
      specialOffers: "",
      description: "",
      item: "",
      company: "",
      language: "",
      Customer_ID: "",
      Quotation_ID: "",
      certificates: "",
    },
  });

  const [Customer_ID, setCustomer] = useState({
    options: {
      Customer_ID: "",
    },
  });

  const [quotations, setQuotations] = useState([]);
  const [selectQuo, setSelectedQuo] = useState({
    options: {
      Quotation_ID: "",
    },
  });
  const [certificates, setCertificates] = useState([]);
  const [checkPack, setPackage] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (selectQuo.options.Quotation_ID !== "") {
      const data = {
        Quotation_ID: selectQuo.options.Quotation_ID,
      };
      QuotationItemService.fetchFormItems(data, "get-quo")
        .then((res) => {
          setItems(
            res.data.map((item, key) => {
              let dim = "";
              let name = "";

              if (
                item.straight_bush === null &&
                item.plate_strip === null &&
                item.doublebracket_bush === null &&
                item.middlebracket_bush === null
              ) {
                dim = `${item.bracket_bush.bigger_diameter}*${item.bracket_bush.body_diameter}*${item.bracket_bush.inner_diameter}*${item.bracket_bush.bracket_length}*${item.bracket_bush.bush_length}`;
                name = "Flanşlı Burç";
              }
              if (
                item.plate_strip === null &&
                item.bracket_bush === null &&
                item.doublebracket_bush === null &&
                item.middlebracket_bush === null
              ) {
                dim = `${item.straight_bush.large_diameter}*${item.straight_bush.inner_diameter}*${item.straight_bush.bush_length}`;
                name = "Düz Burç";
              }
              if (
                item.bracket_bush === null &&
                item.straight_bush === null &&
                item.doublebracket_bush === null &&
                item.middlebracket_bush === null
              ) {
                dim = `${item.plate_strip.width}*${item.plate_strip["length"]}*${item.plate_strip.thickness}`;
                name = "Plaka";
              }
              if (
                item.bracket_bush === null &&
                item.straight_bush === null &&
                item.plate_strip === null &&
                item.middlebracket_bush === null
              ) {
                dim = `${item.doublebracket_bush.bigger_diameter}*${item.doublebracket_bush.body_diameter}*${item.doublebracket_bush.inner_diameter}*${item.doublebracket_bush.bracket_l1}*${item.doublebracket_bush.bracket_l2}*${item.doublebracket_bush.bracket_l3}*${item.doublebracket_bush.bracket_full}`;
                name = "Çift Flanşlı Burç";
              }
              if (
                item.bracket_bush === null &&
                item.straight_bush === null &&
                item.plate_strip === null &&
                item.doublebracket_bush === null
              ) {
                dim = `${item.middlebracket_bush.bracket_q1}*${item.middlebracket_bush.bracket_q2}*${item.middlebracket_bush.bracket_q3}*${item.middlebracket_bush.bracket_q4}*${item.middlebracket_bush.bracket_l1}*${item.middlebracket_bush.bracket_l2}*${item.middlebracket_bush.bracket_l3}*${item.middlebracket_bush.bracket_full}`;
                name = "Ortadan Flanşlı Burç";
              }

              return {
                id: key + 1,
                item_id: item.item_id,
                description: item.description,
                dimensions: dim,
                qty: item.unit_frequence,
                name: name,
                analysis: item.analyze.analyze_Name,
                price: `${item.unit_price} ${item.currency}`,
              };
            })
          );
        })
        .catch((err) => console.log(err));
    } else {
      setItems([]);
    }
  }, [selectQuo.options.Quotation_ID]);

  useEffect(() => {
    if (Customer_ID.options.Customer_ID !== "") {
      QuotationFormService.getFormByCustomer(Customer_ID.options.Customer_ID)
        .then((res) => {
          let ITEMS = res.data.map((item) => {
            return {
              key: item.reference + "-REV" + item.revision,
              value: item.quotation_ID,
            };
          });

          setQuotations(ITEMS);
        })
        .catch((err) => console.log(err));
    }
  }, [Customer_ID.options.Customer_ID]);

  const handleChangeCustomer = (field, area, e) => {
    setCustomer((old) => {
      return {
        ...old,
        [field]: {
          [area]: e.target.value,
        },
      };
    });

    setSelectedQuo({
      options: {
        Quotation_ID: "",
      },
    });
  };

  const handleChangeQuo = (field, area, e) => {
    setSelectedQuo((old) => {
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

    //customerReference
    if (check_fields.options.customerReference === "") {
      isValid = false;
      errors.options.customerReference =
        "Müşteri Referans Numarası Boş bırakalamaz !";
    } else {
      errors.options.customerReference = "";
    }

    //Customer_ID
    if (Customer_ID.options.Customer_ID === "") {
      isValid = false;
      errors.options.Customer_ID = "Müşteri Cari Kodu Boş bırakalamaz !";
    } else {
      errors.options.Customer_ID = "";
    }

    //Quotation_ID
    if (selectQuo.options.Quotation_ID === "") {
      isValid = false;
      errors.options.Quotation_ID = "Form Referans Numarası Boş bırakalamaz !";
    } else {
      errors.options.Quotation_ID = "";
    }

    //OrderDate
    if (check_fields.options.OrderDate === "") {
      isValid = false;
      errors.options.OrderDate = "Sipariş Tarihi Boş bırakalamaz !";
    } else {
      errors.options.OrderDate = "";
    }

    //deliveryDate
    if (check_fields.options.deliveryDate === "") {
      isValid = false;
      errors.options.deliveryDate = "Teslim Tarihi Boş bırakalamaz !";
    } else {
      errors.options.deliveryDate = "";
    }

    //language
    if (check_fields.options.language === "") {
      isValid = false;
      errors.options.language = "Form Dili Boş bırakılamaz !";
    } else {
      errors.options.language = "";
    }

    //company
    if (check_fields.options.company === "") {
      isValid = false;
      errors.options.company = "Şirket Boş bırakılamaz !";
    } else {
      errors.options.company = "";
    }

    //item
    if (selectedItem.length === 0) {
      isValid = false;
      errors.options.item = "En az bir adet ürün seçmelisiniz  !";
    } else {
      errors.options.item = "";
    }

    //item
    if (certificates.length === 0) {
      isValid = false;
      errors.options.certificates = "En az bir adet sertifika seçmelisiniz !";
    } else {
      errors.options.certificates = "";
    }

    setCurrErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let data = {
        options: {
          ...fields.options,
          Customer_ID: Customer_ID.options.Customer_ID,
          Quotation_ID: selectQuo.options.Quotation_ID,
          Item_ID: items[selectedItem[0] - 1].item_id,
          package: checkPack,
        },

        cert_options: certificates.map((certificate) => {
          return {
            name: certificate,
          };
        }),
      };

      try {
        const res = await OrderConfirmationService.createForm(data);
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
  return (
    <div>
      <button
        className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleCreate}
      >
        + Form Oluştur
      </button>

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
              Yeni Sipariş Onay Formu
            </p>
            <form className="grid grid-cols-1 space-y-5 lg:grid-cols-1 "></form>

            {/*Buttons*/}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={(e) => {
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
                Sipariş Onay Formu Başarıyla Kaydedildi!
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
