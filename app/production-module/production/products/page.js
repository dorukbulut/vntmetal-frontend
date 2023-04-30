"use client";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import Table from "../../../order-module/table";
import { columns } from "./data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductionProductService from "../../../../services/ProductionProductService";
import { Button } from "@mui/material";
import Action from "../../../../components/base/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { delay } from "../../../../app/utils";
import Loading from "../../../../components/base/Loading";
import Alert from "../../../../components/base/alert";
import { useRouter } from "next/navigation";
import useSWR from "swr";
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
  const [data, setData] = useState();
  const deleteProduct = (e, product_id) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Kayıt Oluşturuluyor...",
      title: "Lütfen Bekleyiniz",
    });
    ProductionProductService.deleteProduct(product_id)
      .then(async (res) => {
        if (res.status === 200) {
          setError({
            isOpen: true,
            type: "success",
            message: "Kayıt Silindi !",
            title: "Başarılı",
          });
          setData((old) => {
            return {
              ...old,
              products: {
                ...old.products,
                rows: old.products.rows.filter(
                  (product) => product.product_id !== product_id
                ),
              },
            };
          });
          await delay(2000);
          setLoading(false);
        }
      })
      .catch(async (err) => {
        setError({
          isOpen: true,
          type: "error",
          message: "Kayıt Silinemedi !",
          title: "Hata",
        });
        await delay(2000);
        setLoading(false);
      });
  };
  const finishProduction = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      isOpen: true,
      type: "warning",
      message: "Döküm Tamamlanıyor...",
      title: "Lütfen Bekleyiniz",
    });
    ProductionProductService.finishProduct(id)
      .then(async (res) => {
        if (res.status === 200) {
          setError({
            isOpen: true,
            type: "success",
            message: "Döküm Tamamlandı !",
            title: "Başarılı",
          });
          await delay(2000);
          setLoading(false);
          router.push("/production-module/production");
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
    ProductionProductService.getProduct(id, page)
      .then((res) => {
        if (res.data.length === 0) {
          setData(res.data);
        } else {
          const new_data = {
            ...res.data,
            products: {
              ...res.data.products,
              rows: res.data.products.rows.map((product) => {
                return {
                  ...product,
                  isLabel: product.isQC,
                  isQC: (
                    <Chip
                      label={
                        product.isQC === "pending"
                          ? "Bekliyor"
                          : product.isQC === "accepted"
                          ? "Onaylandı"
                          : "Red"
                      }
                      color={
                        product.isQC === "pending"
                          ? "warning"
                          : product.isQC === "accepted"
                          ? "success"
                          : "error"
                      }
                    />
                  ),
                  options: (
                    <Action
                      preference={{
                        name: "Düzenle",
                        action: [
                          {
                            name: "Güncelle",
                            pathname:
                              "/production-module/production/products/form",
                            query: {
                              product_id: product.product_id,
                              type: "update",
                            },
                          },
                        ],
                      }}
                    >
                      <EditIcon />
                    </Action>
                  ),
                  delete: (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={(e) => {
                        deleteProduct(e, product.product_id);
                      }}
                    >
                      Sil
                    </Button>
                  ),
                };
              }),
            },
          };
          setData(new_data);
        }
      })
      .catch((err) => console.log);
  });

  return (
    <div>
      <Alert error={error} />
      {!isLoading && (
        <div className="w-full h-full space-y-10">
          <div>
            <p className="text-2xl flex text-center text-yellow-600 tracking widest font-roboto">
              Döküm Detayları
            </p>
          </div>
          <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
            <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              {data?.productHeader?.n_remaining > 0 || data?.length === 0 ? (
                <Link
                  href={{
                    pathname: "/production-module/production/products/form",
                    query: {
                      id: id,
                      type: "create",
                    },
                  }}
                >
                  <Button variant="outlined" color="success">
                    Yeni Kayıt
                  </Button>
                </Link>
              ) : (
                <Button variant="outlined" color="success" disabled>
                  Yeni Kayıt
                </Button>
              )}
            </div>
            <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              <Button
                onClick={finishProduction}
                disabled={
                  data?.productHeader?.n_remaining === "0" &&
                  data?.products?.rows.filter(
                    (product) => product.isLabel !== "accepted"
                  ).length === 0
                    ? false
                    : true
                }
                variant="outlined"
                color={"warning"}
              >
                Dökümü Tamamla
              </Button>
            </div>
            <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              <Link
                href={{
                  pathname: "/production-module/production",
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
                    value={reference || ""}
                    label="İş Emri No."
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.customer || ""}
                    label="Cari Kod"
                  />
                </div>

                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.analyze || ""}
                    label="Analiz"
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.n_piece || ""}
                    label="Adet"
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.n_remaining || ""}
                    label="Kalan Adet"
                  />
                </div>
                <div>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                    value={data?.productHeader?.total_kg + " kg" || ""}
                    label="Toplam Kg."
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
              <Table
                columns={columns}
                rowdata={data?.products?.rows}
                count={data?.products?.count}
                setNPage={setPage}
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
