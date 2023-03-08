"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "next/navigation";
import { customerInputInfo, taxInputInfo, adressInputInfo } from "./form/data";
import CustomerService from "../../../services/CustomerService";
import Alert from "../../../components/base/alert";
import Loading from "../../../components/base/Loading";
import { useRouter } from "next/navigation";
import Link from  "next/link";
import { isValid } from "../../valid";
import { delay } from "../../utils";
export default function CustomerForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const [fields, setFields] = useState({
    customer: {
      account_id: "",
      account_title: "",
      account_related: "",
      account_IN: 0,
      account_tel1: "",
      account_tel2: "",
      account_fax: "",
      account_email: "",
      account_webSite: "",
      account_KEP: "",
    },
    taxinfo: {
      tax_info_taxID: 0,
      tax_info_Admin: "",
      tax_info_AdminID: 0,
    },

    adressinfo: {
      customer_Address: "",
      customer_bID: 0,
      customer_bName: "",
      customer_dID: 0,
      customer_town: "",
      customer_district: "",
      customer_city: "",
      customer_country: "",
      customer_UAVT: 0,
      customer_postal: 0,
    },
  });
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "",
    title: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const check_valid = {
      a: fields.customer.account_id,
      b: fields.customer.account_title,
      c: fields.customer.account_related,
    };
    setValid(isValid(check_valid));
  }, [fields]);
  useEffect(() => {
    if (type === "update") {
      CustomerService.getCustomer(id).then((res) => {
        if (res.status === 200) {
          const old_data = {
            customer: {
              account_id: id,
              account_title: res.data.customer[0].account_title,
              account_related: res.data.customer[0].account_related,
              account_IN: res.data.customer[0].account_IN,
              account_tel1: res.data.customer[0].account_tel1,
              account_tel2: res.data.customer[0].account_tel1,
              account_fax: res.data.customer[0].account_fax,
              account_email: res.data.customer[0].account_email,
              account_webSite: res.data.customer[0].account_webSite,
              account_KEP: res.data.customer[0].account_KEP,
            },
            taxinfo: {
              tax_info_taxID: res.data.customer[0].tax_info.tax_info_taxID,
              tax_info_Admin: res.data.customer[0].tax_info.tax_info_Admin,
              tax_info_AdminID: res.data.customer[0].tax_info.tax_info_AdminID,
            },

            adressinfo: {
              customer_Address:
                res.data.customer[0].customer_adress.customer_Address,
              customer_bID: res.data.customer[0].customer_adress.customer_bID,
              customer_bName:
                res.data.customer[0].customer_adress.customer_bName,
              customer_dID: res.data.customer[0].customer_adress.customer_dID,
              customer_town: res.data.customer[0].customer_adress.customer_town,
              customer_district:
                res.data.customer[0].customer_adress.customer_district,
              customer_city: res.data.customer[0].customer_adress.customer_city,
              customer_country:
                res.data.customer[0].customer_adress.customer_country,
              customer_UAVT: res.data.customer[0].customer_adress.customer_UAVT,
              customer_postal:
                res.data.customer[0].customer_adress.customer_postal,
            },
          };

          setFields((old) => {
            return old_data;
          });
        }
      });
    }
  }, []);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Müşteri Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });
    let data = {
      ...fields,
    };
    if (type === "update") {
      data["account_id"] = parseInt(id);
    }
    try {
      let res;
      if (type === "create") {
        res = await CustomerService.createCustomer(data);
      } else {
        res = await CustomerService.updateCustomer(data);
      }
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Müşteri Oluşturuldu !",
          title: "Başarılı",
        });
        await delay(2000);
        router.push("/order-module/customer");
      }
    } catch (err) {
      setLoading(false);
      setError({
        isOpen: true,
        type: "error",
        message: "Böyle bir müşteri zaten mevcut",
        title: "Hata",
      });
    }
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
              {type === "create" ? "Yeni Müşteri" : "Müşteri Güncelle"}
            </p>
          </div>
          <div className="rounded-md shadow-lg ">
            <div className="flex flex-col p-5 space-y-5 border-2 rounded-lg">
              <div className="p-2">
                <p className="font-roboto text-indigo-700 text-sm font-ligth underline">
                  Cari Hesap Bilgileri
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg ">
                {customerInputInfo.map((item, index) => {
                  return item.isRequired ? (
                    <TextField
                      error={!valid}
                      key={index}
                      id="standard-helperText"
                      label={item.name}
                      value={fields[item.field][item.area] || ""}
                      variant="standard"
                      helperText="Zorunlu Alan"
                      type={item.type}
                      onChange={(e) => handleChange(item.field, item.area, e)}
                    />
                  ) : (
                    <TextField
                      key={index}
                      value={fields[item.field][item.area] || ""}
                      id="standard-helperText"
                      label={item.name}
                      variant="standard"
                      type={item.type}
                      onChange={(e) => handleChange(item.field, item.area, e)}
                    />
                  );
                })}
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Vergi Dairesi Bilgileri
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg">
                {taxInputInfo.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      id="standard-helperText"
                      label={item.name}
                      value={fields[item.field][item.area] || ""}
                      variant="standard"
                      type={item.type}
                      onChange={(e) => handleChange(item.field, item.area, e)}
                    />
                  );
                })}
              </div>

              <div className="p-2">
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Adres Bilgileri
                </p>
              </div>
              <div className="grid grid-cols-4 gap-10  p-2 rounded-lg  ">
                {adressInputInfo.map((item, index) => {
                  return (
                    <TextField
                      key={index}
                      id="standard-helperText"
                      label={item.name}
                      value={fields[item.field][item.area] || ""}
                      variant="standard"
                      type={item.type}
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
                  <Link href={"/order-module/customer"} passHref>
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
