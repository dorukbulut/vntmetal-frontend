"use client";
import Link from "next/link";
import Alert from "../../../../components/base/alert";
import Loading from "../../../../components/base/Loading";
import AutoComplete from "../../../../components/base/autocomplete";
import TextField from "@mui/material/TextField";
import { isValid } from "../../../valid";
import { delay } from "../../../../app/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TYPE } from "../../../../utils/mappers";
import OrderConfirmationService from "../../../../services/OrderConfirmationService";
import WorkOrderService from "../../../../services/WorkOrderService";
export default function Form({ type, id, customers }) {
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const [Customer_ID, setCustomer] = useState({
    title: "",
  });
  const [Sale_ID, setSale] = useState({
    title: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [confirmations, setConfirmations] = useState([]);
  const router = useRouter();
  const [fields, setFields] = useState({
    options: {
      Item_ID: "",
      type: "",
      plate_model_size: "",
      treatment_size: "",
      reference: "",
      company: "",
    },
  });
  const [valid, setValid] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Form Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });
    let data = {
      options: {
        Customer_ID: Customer_ID?.title,
        Sale_ID: Sale_ID?.value,
        Item_ID: fields.options.Item_ID,
        plate_model_size: fields.options.plate_model_size,
        treatment_size: fields.options.treatment_size,
        company: fields.options.company?.title,
      },
    };

    try {
      let res;
      if (type === "create") {
        res = await WorkOrderService.createForm(data);
      } else {
        data["options"]["reference"] = fields.options.reference;
        res = await WorkOrderService.updateForm(data);
      }

      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Form Oluşturuldu !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(`/order-module/work-order`);
      }
    } catch (err) {
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Form Oluşturulamadı !",
        title: "Hata",
      });
    }
  };
  useEffect(() => {
    if (Customer_ID?.title !== "" && Customer_ID?.title !== undefined) {
      OrderConfirmationService.getByCustomer(Customer_ID?.title)
        .then((res) => {
          let ITEMS = res.data.map((item) => {
            return {
              title: item.reference + "-REV" + item.revision,
              value: item.sale_ID,
            };
          });

          setConfirmations(ITEMS);
        })
        .catch((err) => console.log(err));
    }
  }, [Customer_ID?.title]);
  useEffect(() => {
    if (Sale_ID?.title !== "" && Sale_ID?.title !== undefined) {
      OrderConfirmationService.getByConfirmation(Sale_ID?.value).then((res) => {
        if (res.status === 200) {
          setFields((old) => {
            return {
              ...old,
              options: {
                ...old.options,
                type: TYPE.find(
                  (item) => item.value === res.data[0].quotationItem.itemType
                ).title,
                Item_ID: res.data[0].quotationItem.item_id,
              },
            };
          });
        }
      });
    }
  }, [Sale_ID?.title]);

  useEffect(() => {
    const check_fields = {
      a: Customer_ID?.title === undefined ? "" : Customer_ID?.title,
      b: Sale_ID?.title === undefined ? "" : Sale_ID?.title,
      ee:
        fields.options.company?.title === undefined
          ? ""
          : fields.options.company?.title,
    };
    if (fields.options.type === "Plaka") {
      check_fields["test1"] = fields.options.plate_model_size;
      check_fields["test2"] = fields.options.treatment_size;
    }
    setValid(isValid(check_fields));
  }, [Customer_ID?.title, fields, Sale_ID?.title]);

  useEffect(() => {
    if (type === "update") {
      WorkOrderService.getByWorkOrder(id)
        .then((res) => {
          if (res.status === 200) {
            const item = res.data[0];

            setFields((old) => {
              return {
                ...old,
                options: {
                  Item_ID: item.Item_ID,
                  type: TYPE.find(
                    (item) => item.value === res.data[0].quotationItem.itemType
                  ).title,
                  plate_model_size: item.plate_model_size,
                  treatment_size: item.treatment_size,
                  reference: item.reference,
                  company: { title: item.company },
                },
              };
            });

            setCustomer({ title: item.Customer_ID });
            setSale({
              title: `${item.sale_confirmation.reference}-REV${item.sale_confirmation.revision}`,
              value: item.Sale_ID,
            });
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  const handleChange2 = (area, field, value) => {
    setFields((old) => {
      return {
        ...old,
        [area]: {
          ...old[area],
          [field]: value,
        },
      };
    });
  };

  const handleChange = (area, field, e) => {
    setFields((old) => {
      return {
        ...old,
        [area]: {
          ...old[area],
          [field]: e.target.value,
        },
      };
    });
  };

  return (
    <div className="w-full h-full flex flex-col space-y-5">
      <Alert error={error} />
      {!isLoading && (
        <div className="space-y-5">
          <div>
            <p
              className={`text-2xl flex text-center ${
                type === "create" ? "text-green-600" : "text-yellow-600"
              } tracking widest font-roboto text-md"`}
            >
              {type === "create" ? "Yeni İş Emri" : "İş Emrini Güncelle"}
            </p>
          </div>
          <div className="rounded-md shadow-lg ">
            <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Form Bilgileri
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {type === "create" ? (
                  <AutoComplete
                    data={customers}
                    setData={setCustomer}
                    prevValue={Customer_ID}
                    valid={valid}
                    dropDownOptions={{ label: "Cari Kod" }}
                  />
                ) : (
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={Customer_ID?.title || ""}
                    label="Cari Kod"
                  />
                )}
                {type === "create" ? (
                  <AutoComplete
                    data={confirmations}
                    setData={setSale}
                    prevValue={Sale_ID}
                    valid={valid}
                    dropDownOptions={{ label: "Sipariş No." }}
                  />
                ) : (
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={Sale_ID?.title || ""}
                    label="Sipariş No."
                  />
                )}
                <AutoComplete
                  data={[{ title: "VNT" }, { title: "BILGESIN" }]}
                  dropDownOptions={{ label: "Şirket" }}
                  prevValue={fields?.options?.company || { title: "" }}
                  setData={(data) => handleChange2("options", "company", data)}
                  valid={valid}
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  İş Emri Bilgileri
                </p>
                <div className="flex flex-row gap-5 mt-5 ">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-md font-roboto tracking-widest text-gray-900"
                  >
                    Ürün Tipi :
                  </label>
                  <p className="text-md font-roboto ">{fields.options.type}</p>
                </div>
              </div>
              {fields.options.type === "Plaka" ? (
                <div className="grid grid-cols-1 w-1/2">
                  <TextField
                    error={!valid}
                    label={"Plaka Model Ölçüsü"}
                    value={fields["options"]["plate_model_size"] || ""}
                    variant="standard"
                    helperText="Zorunlu Alan"
                    type={"number"}
                    onChange={(e) =>
                      handleChange("options", "plate_model_size", e)
                    }
                  />
                  <TextField
                    error={!valid}
                    label={"Dış Atölyede İşlenecek Ölçü"}
                    value={fields["options"]["treatment_size"] || ""}
                    variant="standard"
                    helperText="Zorunlu Alan"
                    type={"number"}
                    onChange={(e) =>
                      handleChange("options", "treatment_size", e)
                    }
                  />
                </div>
              ) : (
                ""
              )}
              <div className="grid grid-cols-1 gap-10  p-2 rounded-lg ">
                <div className="grid grid-cols-4 space-x-10 col-span-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!valid}
                    className={`text-sm ${
                      type === "create" ? "text-green-600" : "text-yellow-600"
                    } border-2 ${
                      type === "create"
                        ? "border-green-600"
                        : "border-yellow-600"
                    } enabled:transition enabled:ease-in-out enabled:hover:-translate-y-1 enabled:hover:scale-110 ${
                      type === "create"
                        ? "enabled:hover:bg-green-700"
                        : "enabled:hover:bg-yellow-700"
                    } font-roboto enabled:hover:text-white tacking-widest rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {type === "create" ? "OLUŞTUR" : "GÜNCELLE"}
                  </button>
                  <Link href={"/order-module/work-order"} passHref>
                    <button className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
                      IPTAL
                    </button>
                  </Link>
                </div>
                {!valid && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    Tüm zorunlu alanlar doldurulmalıdır !
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
