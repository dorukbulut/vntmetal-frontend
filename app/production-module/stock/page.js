"use client";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Page() {
  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-yellow-600 tracking widest font-roboto">
          Stok Bilgileri
        </p>
      </div>
      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
          <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              <Link
                  href={{
                      pathname: "/order-module/work-order/form",
                      query: {
                          type: "create",
                          id: "none",
                      },
                  }}
              >
                  <Button variant="outlined" color={"success"}>
                      Yeni Dökümhane Kaydı
                  </Button>
              </Link>
          </div>
          <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
              <Link
                  href={{
                      pathname: "/order-module/work-order/form",
                      query: {
                          type: "create",
                          id: "none",
                      },
                  }}
              >
                  <Button variant="outlined" color={"success"}>
                      Yeni Atölye Kaydı
                  </Button>
              </Link>
          </div>
      </div>
    </div>
  );
}
