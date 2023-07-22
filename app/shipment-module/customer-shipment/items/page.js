"use client";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import Table from "../../../order-module/table";
import { columns, columnsAtelier } from "./data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductionAtelierService from "../../../../services/ProductionAtelierService";
import { Button } from "@mui/material";
import Action from "../../../../components/base/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { delay } from "../../../utils";
import Loading from "../../../../components/base/Loading";
import Alert from "../../../../components/base/alert";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ShipmentCustomerService from "../../../../services/ShipmentCustomerService";
export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const reference = searchParams.get("reference");
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [atelierPage, setAtelierPage] = useState(0);
  const [data, setData] = useState();
  const [atelierData, setAtelierData] = useState();

  const finishProduction = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Sevkiyat Tamamlanıyor...",
      title: "Lütfen Bekleyiniz",
    });
    ShipmentCustomerService.finishAtelier(id)
      .then(async (res) => {
        if (res.status === 200) {
          setError({
            isOpen: true,
            type: "success",
            message: "Döküm Tamamlandı !",
            title: "Başarılı",
          });
          await delay(2000);
          router.push("/shipment-module/customer-shipment");
        }
      })
      .catch(async (err) => {
        setError({
          isOpen: true,
          type: "error",
          message: "Hata !",
          title: "Hata",
        });
        await delay(2000);
        setLoading(false);
      });
  };
  const { data1 } = useSWR(() => {
      ShipmentCustomerService.getAllShipments({ workorder: id })
          .then(res => {
              const new_data = {
                  count : res.data.shipments.count,
                  rows  : res.data.shipments.rows.map(item => {
                      const dateObj = new Date(item.createdAt);

// Extract the year, month, and day components from the Date object
                      const year = dateObj.getFullYear();
                      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
                      const day = String(dateObj.getDate()).padStart(2, "0");
                      return {
                          step : item.step,
                          id : item.Product_ID,
                          package : item.package.reference,
                          n_piece : item.n_piece,
                          total_kg : item.total_kg,
                          date  : `${year}-${month}-${day}`,
                          delete : <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={async (e, id=item.shipment_id) =>{
                                  e.preventDefault();
                                  setLoading(true);
                                  setError({
                                      isOpen: true,
                                      type: "warning",
                                      message: "Kayıt Siliniyor Oluşturuluyor...",
                                      title: "Lütfen Bekleyiniz",
                                  });
                                  let res = await ShipmentCustomerService.delete({shipment_id: id})

                                  if (res.status === 200) {
                                      setError({
                                          isOpen: true,
                                          type: "success",
                                          message: "Sevkiyat Silindi !",
                                          title: "Başarılı",
                                      });
                                      await delay(2000);
                                      router.refresh();
                                  } else {
                                      setLoading(false);
                                      setError({
                                          isOpen: true,
                                          type: "error",
                                          message: "Kayıt Oluşturulamadı !",
                                          title: "Hata",
                                      });
                                  }

                              }}

                          >
                              Kaydı Sil
                          </Button>
                      }
                  })
              }

              setAtelierData(new_data)
          })
      ShipmentCustomerService.getAllItems({ workorder: id })
        .then((res) => {
          let atelier_data = res.data["ateliers"];
          let product_data = res.data["onlyProducts"]
          let all_data = [];

          atelier_data.rows.filter(ateliers => {
              const retval = atelierData?.rows?.find(item => item.id === ateliers.product.product_id)
              return !retval;
          }).map(item => {

              all_data.push(
                  {
                      step : item.product.step + "-" + item.step,
                      n_piece : item.n_piece,
                      type : "Atölye",
                      isQC : <Chip
                          label={
                              "Onaylandı"
                          }
                          color={
                              "success"
                          }
                      />,
                      options: (
                          <Action
                              preference={{
                                  name: "Düzenle",
                                  action: [
                                      {
                                          name: "Sevk Et",
                                          pathname: "/shipment-module/customer-shipment/items/form",
                                          query: {
                                              id: id,
                                              type : "create",
                                              productId : item.product.product_id,
                                              n_piece : item.n_piece
                                          },
                                      },
                                  ],
                              }}
                          >
                              <EditIcon />
                          </Action>
                      ),
                  }
              )

          })
            setData({all_data, productHeader : res.data.productHeader})



        })
        .catch((err) => console.log);
  });


  return (
    <div>
      <Alert error={error} />
      {!isLoading && (
        <div className="w-full h-full space-y-10">
          <div>
            <p className="text-2xl flex text-center text-blue-600 tracking widest font-roboto">
              Sevkiyat Detayları
            </p>
          </div>
          <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
              <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
                  <Button
                      onClick={finishProduction}
                      variant="outlined"
                      disabled={data?.all_data?.length !== 0}
                      color={"warning"}
                  >
                      Tamamla
                  </Button>
              </div>
            <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              <Link
                href={{
                  pathname: "/production-module/atelier",
                }}
              >
                <Button variant="outlined" color={"error"}>
                  Geri
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:flex lg:flex-col gap-7 shadow-xl rounded-md p-4">
            <div>
              <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                Genel Bilgiler
              </p>
            </div>

            {data?.length !== 0 ? (
              <div className="p-3 flex gap-7">
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.reference || ""}
                    label="Referans No."
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.work_order?.reference + "-REV-" + data?.productHeader?.work_order?.revision || ""}
                    label="İş Emri No."
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.work_order?.Customer_ID || ""}
                    label="Cari Kod"
                  />
                </div>

              </div>
            ) : (
              <p className="font-roboto">
                <span className="text-red-600">{reference}</span> numaralı iş
                emri için döküm kaydı henüz oluşturulmadı. Genel Bilgiler ilk
                döküm kaydınızı oluşturduktan sonra görünecektir.
              </p>
            )}
          </div>

          {data?.length !== 0 ? (
            <div className="lg:flex lg:flex-col shadow-xl">
              <div>
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Üretimi Tamamlanan
                </p>
              </div>
              <Table
                columns={columns}
                rowdata={data?.all_data}
                count={data?.all_data?.length}
                setNPage={() => {}}
              />
            </div>
          ) : (
            ""
          )}
          {data?.length !== 0 ? (
            <div className="lg:flex lg:flex-col shadow-xl lg:gap-10">
              <div>
                <p className="font-roboto text-indigo-600 text-sm font-ligth underline">
                  Sevk Edilen
                </p>
              </div>
              <Table
                columns={columnsAtelier}
                rowdata={atelierData?.rows}
                count={atelierData?.count}
                setNPage={() => {}}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
}
