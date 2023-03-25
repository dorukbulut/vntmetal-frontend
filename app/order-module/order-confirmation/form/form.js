"use client";
import { useEffect, useState } from "react";
import Alert from "../../../../components/base/alert";
import Loading from "../../../../components/base/Loading";
import Link from "next/link";
import AutoComplete from "../../../../components/base/autocomplete";
import QuotationFormService from "../../../../services/QuotationService/QuotationFormService";
import QuotationItemService from "../../../../services/QuotationService/QuotationItemService";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ItemSelect from "../../../../components/Dashboards/general/forms/ItemSelect";
import CheckMark from "../../../../components/Dashboards/general/forms/CheckMark/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TYPE } from "../../../../utils/mappers";
import { isValid } from "../../../valid";
import { delay } from "../../../../app/utils";
import { useRouter } from "next/navigation";
import OrderConfirmationService from "../../../../services/OrderConfirmationService";
export default function Form({ prevValue, id, type, dispatch, customers }) {
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const router = useRouter();
  const [fields, setFields] = useState({
    options: {
      customerReference: "",
      OrderDate: "",
      deliveryDate: "",
      reference: "",
      specialOffers: "",
      description: "",
      company: "",
      language: "",
    },
  });

  const [certificates, setCertificates] = useState([]);
  const [checkPack, setPackage] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [items, setItems] = useState([]);
  const [Customer_ID, setCustomer] = useState({
    title: "",
  });
  const [Quotation_ID, setQuotation] = useState({
    title: "",
  });
  const [quotations, setQuotations] = useState([]);
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
        ...fields.options,
        language:
          fields.options.language?.title === "İngilizce"
            ? "English"
            : "Turkish",
        company: fields.options.company?.title,
        Customer_ID: Customer_ID?.title,
        Quotation_ID: Quotation_ID?.value,
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
      let res;
      if (type === "create") {
        res = await OrderConfirmationService.createForm(data);
      } else {
        data["options"]["reference"] = fields.options.reference;
        res = await OrderConfirmationService.updateForm(data);
      }

      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Form Oluşturuldu !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(`/order-module/order-confirmation`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Form Oluşturulamadı !",
        title: "Hata",
      });
    }
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
  useEffect(() => {
    if (Customer_ID?.title !== "" && Customer_ID?.title !== undefined) {
      QuotationFormService.getFormByCustomer(Customer_ID?.title)
        .then((res) => {
          let ITEMS = res.data.map((item) => {
            return {
              title: item.reference + "-REV" + item.revision,
              value: item.quotation_ID,
            };
          });

          setQuotations(ITEMS);
        })
        .catch((err) => console.log(err));
    } else {
      setQuotations([]);
    }
  }, [Customer_ID?.title]);
  useEffect(() => {
    if (Quotation_ID?.value !== "" && Quotation_ID?.value !== undefined) {
      const data = {
        Quotation_ID: Quotation_ID?.value,
      };
      QuotationItemService.fetchFormItems(data, "get-quo")
        .then((res) => {
          setItems(
            res.data.map((item, key) => {
              return {
                id: key + 1,
                item_id: item.item_id,
                description: item.description,
                dimensions: item.dimensions,
                qty: item.unit_frequence,
                name: TYPE.find((r) => r.value === item.itemType).title,
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
  }, [Quotation_ID?.value]);

  useEffect(() => {
    if (type === "update") {
      OrderConfirmationService.getByConfirmation(id)
        .then((res) => {
          if (res.status === 200) {
            const item = res.data[0];
            setFields((old) => {
              return {
                ...old,
                options: {
                  customerReference: item.customerReference,
                  OrderDate: item.OrderDate,
                  deliveryDate: item.deliveryDate,
                  specialOffers: item.specialOffers,
                  reference: item.reference,
                  description: item.description,
                  company: { title: item.company },
                  language: {
                    title: item.language === "English" ? "İngilizce" : "Türkçe",
                  },
                },
              };
            });

            setCustomer({ title: item.Customer_ID });
            setQuotation({
              title: `${item.quotation_form.reference}-REV${item.quotation_form.revision}`,
              value: item.Quotation_ID,
            });

            setCertificates(item.certificates.map((cert) => cert.name));
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  useEffect(() => {
    const check_fields = {
      a: Customer_ID?.title === undefined ? "" : Customer_ID?.title,
      b: Quotation_ID?.title === undefined ? "" : Quotation_ID?.title,
      c: fields.options.customerReference,
      d: fields.options.OrderDate,
      aa: fields.options.deliveryDate,
      ee:
        fields.options.company?.title === undefined
          ? ""
          : fields.options.company?.title,
      aaa:
        fields.options.language?.title === undefined
          ? ""
          : fields.options.language?.title,
      eee: certificates.length !== 0 ? "yes" : "",
      asde: selectedItem.length !== 0 ? "yes" : "",
    };
    setValid(isValid(check_fields));
  }, [
    Customer_ID?.title,
    fields,
    Quotation_ID?.title,
    selectedItem,
    certificates,
  ]);
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
              {type === "create"
                ? "Yeni Sipariş Formu"
                : "Sipariş Formu Güncelle"}
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
                    data={quotations}
                    setData={setQuotation}
                    prevValue={Quotation_ID}
                    valid={valid}
                    dropDownOptions={{ label: "Teklif No." }}
                  />
                ) : (
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={Quotation_ID?.title || ""}
                    label="Teklif No."
                  />
                )}
                <TextField
                  label={"Müşteri Referans No."}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.options?.customerReference || ""}
                  type={"text"}
                  error={!valid}
                  onChange={(e) =>
                    handleChange("options", "customerReference", e)
                  }
                />
                <AutoComplete
                  data={[{ title: "İngilizce" }, { title: "Türkçe" }]}
                  dropDownOptions={{ label: "Form Dili" }}
                  prevValue={fields?.options?.language || { title: "" }}
                  setData={(data) => handleChange2("options", "language", data)}
                  valid={valid}
                />
                <AutoComplete
                  data={[{ title: "VNT" }, { title: "BILGESIN" }]}
                  dropDownOptions={{ label: "Şirket" }}
                  prevValue={fields?.options?.company || { title: "" }}
                  setData={(data) => handleChange2("options", "company", data)}
                  valid={valid}
                />
                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-roboto text-gray-900"
                  >
                    Sipariş Tarihi
                  </label>
                  <input
                    type="date"
                    className="invalid:border-red-500 valid:border-slate-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100  relative  block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                    value={fields.options.OrderDate}
                    required
                    onChange={(e) => {
                      handleChange("options", "OrderDate", e);
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium font-roboto  text-gray-900 "
                  >
                    Planlanan Teslim Tarihi
                  </label>
                  <input
                    type="date"
                    className="invalid:border-red-500 valid:border-slate-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100  relative  block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                    placeholder=""
                    value={fields.options.deliveryDate}
                    required
                    onChange={(e) => {
                      handleChange("options", "deliveryDate", e);
                    }}
                  />
                </div>

                <br />
                <TextField
                  multiline
                  rows={3}
                  value={fields["options"]["specialOffers"] || ""}
                  label={"Özel Istekler"}
                  variant="standard"
                  type={"text"}
                  onChange={(e) => handleChange("options", "specialOffers", e)}
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Ürün Bilgileri
                </p>
              </div>
              <div className="grid grid-col-4 gap-5 rounded-lg">
                <ItemSelect items={items} setSelectedItem={setSelectedItem} />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Sertifika ve Paketleme
                </p>
              </div>
              <div className="grid grid-cols-1 gap-10  p-2 rounded-lg ">
                <TextField
                  label={"Açıklama"}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.options?.description || ""}
                  type={"text"}
                  onChange={(e) => handleChange("options", "description", e)}
                />
                <br />
                <div className="">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font roboto text-gray-900"
                  >
                    Sertifika
                  </label>
                  <CheckMark
                    setCertificates={setCertificates}
                    defaultValues={certificates}
                  />
                </div>
                <br />
                <div className="">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultValue={checkPack}
                        onClick={(e) => setPackage(e.target.checked)}
                        defaultChecked
                      />
                    }
                    label="Paketleme"
                  />
                </div>
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
                  <Link href={"/order-module/order-confirmation"} passHref>
                    <button className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded">
                      IPTAL
                    </button>
                  </Link>
                </div>
                {!valid && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    Tüm zorunlu alanlar doldurulmalıdır ! Sertifika, Müşteri ve
                    Ürün Bilgilerini seçtiğinizden emin olun !
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
