"use client";
import Loading from "../../../components/base/Loading";
import SetItem from "../../../components/Dashboards/general/forms/QuotationForms/Forms/SetQuotationItem";
import TextField from "@mui/material/TextField";
import {
  setValues,
  clearResults,
  setCust,
} from "../../GlobalRedux/Features/Quotation/quotationSlice";
import {
  QuotationInfo,
  PreparedData,
  TransPortdata,
  TransPortDataExtra,
  INCOTERMS_EXTRA,
  INCOTERMS_INTRA,
} from "./form/data";
import AutoComplete from "../../../components/base/autocomplete";
import { useEffect, useState } from "react";
import { isValid } from "../../valid";
import { delay } from "../../../app/utils";
import Link from "next/link";

import Alert from "../../../components/base/alert";
import { useSearchParams, useRouter } from "next/navigation";
import QuotationFormService from "../../../services/QuotationService/QuotationFormService";
export default function QuotationForm({
  customers,
  prevValue,
  dispatch,
  type,
  id,
}) {
  const { customer, prevarea } = prevValue;
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const router = useRouter();
  const [all, setAll] = useState([]);
  const [valid, setValid] = useState(false);
  const [area, setArea] = useState({ title: prevarea });
  const [isEmpty, setisEmpty] = useState(false);
  const [isSame, setisSame] = useState(false);
  const [isAllSame, setAllSame] = useState(false);
  const [Customer_ID, setCustomer] = useState({
    title: customer,
  });
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState({ ...prevValue.fields });

  useEffect(() => {
    const filtered = all.filter((item) => item !== undefined);
    const written = filtered.find(
      (item) => item.deliveryTime === "" || item.description === ""
    );
    const same = filtered.find(
      (item) => item.currency !== filtered[0].currency
    );
    setisSame(same === undefined);
    setisEmpty(filtered.length !== 0);
    setAllSame(
      filtered[0]?.currency === fields?.delivery_type?.currencyType?.title
    );

    const check_valid = {
      a: Customer_ID?.title === undefined ? "" : Customer_ID?.title,
      b: fields?.options?.customerInquiryNum,
      c:
        fields?.area?.name?.title === undefined
          ? ""
          : fields?.area?.name?.title,
      d:
        fields?.delivery_type?.name?.title === undefined
          ? ""
          : fields?.delivery_type?.name?.title,
      e:
        fields?.delivery_type?.currencyType?.title === undefined
          ? ""
          : fields?.delivery_type?.currencyType?.title,
      f: fields?.delivery_type?.currencyVal,
      g: fields?.delivery_type?.package_fee,
      h: fields?.delivery_type?.loading_fee,
      aa: fields?.delivery_type?.transport_fee,
      bb: fields?.delivery_type?.description,
      cc:
        fields?.options?.language?.title === undefined
          ? ""
          : fields?.options?.language?.title === undefined,
      ff:
        fields?.options?.company?.title === undefined
          ? ""
          : fields?.options?.company?.title === undefined,
      ddd: fields?.options?.preparedBy,
      xxx: fields?.options?.approvedBy,
    };
    setValid(
      isValid(check_valid) &&
        filtered.length !== 0 &&
        same === undefined &&
        filtered[0]?.currency === fields?.delivery_type?.currencyType?.title &&
        written == undefined
    );
  }, [fields, Customer_ID?.title, all]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Form Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });
    dispatch(clearResults());
    let data = {
      options: {
        ...fields.options,
        Customer_ID: Customer_ID?.title,
        language:
          fields?.options?.language?.title === "Türkçe" ? "Turkish" : "English",
        company: fields?.options?.company?.title,
        grand_total: all
          .filter((item) => item != undefined)
          .reduce((prev, val) => {
            console.log();
            return prev + parseFloat(val.total_price.split(" ")[0]);
          }, 0),
      },

      delivery_type: {
        ...fields.delivery_type,
        area: fields?.area?.name?.title,
        currencyType: fields?.delivery_type?.currencyType?.title,
        name: fields?.delivery_type?.name?.title,

        total:
          parseFloat(fields.delivery_type.package_fee) +
          parseFloat(fields.delivery_type.loading_fee) +
          parseFloat(fields.delivery_type.delivery_fee) +
          parseFloat(fields.delivery_type.export_fee) +
          parseFloat(fields.delivery_type.terminal_fee_exit) +
          parseFloat(fields.delivery_type.vehicleLoading_fee) +
          parseFloat(fields.delivery_type.transport_fee) +
          parseFloat(fields.delivery_type.insurance_fee) +
          parseFloat(fields.delivery_type.terminal_fee_entry) +
          parseFloat(fields.delivery_type.import_fee),
      },

      all: all
        .filter((item) => item != undefined)
        .map((item) => {
          return {
            item_id: item.item_id,
            description: item.description,
            deliveryTime: item.deliveryTime,
          };
        }),
    };

    try {
      const res = await QuotationFormService.createForm(data);
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Form Oluşturuldu !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push(`/order-module/quotation`);
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
  const handleChange = (area, field, e) => {
    dispatch(setValues(fields));
    dispatch(setCust(Customer_ID?.title || ""));
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
    dispatch(setValues(fields));
    dispatch(setCust(Customer_ID?.title || ""));
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
                ? "Yeni Teklif Formu"
                : "Teklif Formu Güncelle"}
            </p>
          </div>
          <div className="rounded-md shadow-lg ">
            <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Müşteri Bilgileri
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

                <TextField
                  id="standard-helperText"
                  label={"Müşteri Referans No."}
                  variant="standard"
                  helperText="Zorunlu Alan"
                  value={fields?.options?.customerInquiryNum || ""}
                  type={"text"}
                  error={!valid}
                  onChange={(e) =>
                    handleChange("options", "customerInquiryNum", e)
                  }
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Ürün Bilgileri
                </p>
              </div>
              <div className="grid grid-col-4 gap-5 rounded-lg">
                <SetItem
                  fields={{ options: { Customer_ID: Customer_ID?.title } }}
                  setAll={setAll}
                  url={type === "create" ? "get" : "getitems"}
                  prevType={type}
                  prevId={id}
                />
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Teslimat Detayları
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {TransPortdata.map((item, index) => {
                  if (item.type === "dropdown") {
                    if (item.name === "Teslimat Tipi") {
                      return fields?.area?.name?.title === "Yurt Dışı" ? (
                        <AutoComplete
                          key={index}
                          data={INCOTERMS_EXTRA}
                          dropDownOptions={{ labe: item.name }}
                          prevValue={
                            fields[item.field][item.area] || { title: "" }
                          }
                          setData={(data) =>
                            handleChange2(item.field, item.area, data)
                          }
                          valid={valid}
                        />
                      ) : (
                        <AutoComplete
                          key={index}
                          data={INCOTERMS_INTRA}
                          dropDownOptions={{ label: item.name }}
                          prevValue={
                            fields[item.field][item.area] || { title: "" }
                          }
                          setData={(data) =>
                            handleChange2(item.field, item.area, data)
                          }
                          valid={valid}
                        />
                      );
                    }
                    return (
                      <AutoComplete
                        key={index}
                        data={item.data}
                        dropDownOptions={{ label: item["name"] }}
                        prevValue={
                          fields[item.field][item.area] || { title: "" }
                        }
                        setData={(data) =>
                          handleChange2(item.field, item.area, data)
                        }
                        valid={valid}
                      />
                    );
                  } else
                    return (
                      <TextField
                        key={index}
                        error={!valid}
                        helperText="Zorunlu Alan"
                        label={item.name}
                        value={fields[item.field][item.area] || ""}
                        variant="standard"
                        type={item.type}
                        onChange={(e) => handleChange(item.field, item.area, e)}
                      />
                    );
                })}
              </div>

              {fields.area.name?.title === "Yurt Dışı" ? (
                <div>
                  <div className="p-2">
                    <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                      Yurt Dışı Teslimat Detayları
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                    {TransPortDataExtra.map((item, index) => {
                      return (
                        <TextField
                          key={index}
                          id="standard-helperText"
                          value={fields[item.field][item.area] || ""}
                          label={item.name}
                          variant="standard"
                          type={item.type}
                          onChange={(e) =>
                            handleChange(item.field, item.area, e)
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Teklif Detayları
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {QuotationInfo.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      multiline
                      rows={3}
                      value={fields[item.field][item.area] || ""}
                      label={item.name}
                      variant="standard"
                      type={item.type}
                      onChange={(e) => handleChange(item.field, item.area, e)}
                    />
                  );
                })}
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
                {PreparedData.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      error={!valid}
                      label={item.name}
                      value={fields[item.field][item.area] || ""}
                      variant="standard"
                      helperText="Zorunlu Alan"
                      type={"text"}
                      onChange={(e) => handleChange(item.field, item.area, e)}
                    />
                  );
                })}
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
                  <Link href={"/order-module/quotation"} passHref>
                    <button
                      onClick={() => {
                        dispatch(clearResults());
                      }}
                      className="text-red-600 w-full h-full border-2 border-red-600 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-700 font-roboto hover:text-white tacking-widest rounded"
                    >
                      IPTAL
                    </button>
                  </Link>
                </div>
                {!valid && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    Tüm zorunlu alanlar doldurulmalıdır !
                  </p>
                )}
                {!isEmpty && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    En az bir adet ürün seçilmeli !
                  </p>
                )}
                {!isSame && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    Seçilen ürünlerin para birimleri aynı olmalıdır !
                  </p>
                )}
                {!isAllSame && (
                  <p className="text-lg font-rotobot tracking widest text-red-600">
                    Teslimat ve seçilen Ürünlerin para birimi aynı olmalıdır !
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
