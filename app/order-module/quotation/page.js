"use client";
import Table from "../table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { columns } from "./data";
import { useState, useEffect } from "react";
import TimePicker from "../../../components/base/timepicker.js";
import Action from "../../../components/base/action";
import QuotationFormService from "../../../services/QuotationService/QuotationFormService";
export default function Quotation() {
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState();
  const handleFilters = (field, e) => {
    setFilters((old) => {
      return {
        ...old,
        [field]: e.target.value,
      };
    });
  };
  useEffect(() => {
    QuotationFormService.getDefaultData().then((res) => {
      if (res.status === 200) {
        const new_data = {
          count: res.data.count,
          rows: res.data.rows.map((item, index) => {
            return {
              reference: item.reference + "-REV" + item.revision,
              account_id: item.Customer_ID,
              day: item.day,
              month: item.month,
              year: item.year.toString().replace(/\,/g, ""),
              options: [
                <Action
                  key={index}
                  preference={{
                    name: "Düzenle",
                    action: ["Müşteriyi Düzenle", "Görüntüle", "İndir"],
                    pathname: "/order-module/customer/form",
                    query: {
                      type: "update",
                      id: item.account_id,
                    },
                  }}
                >
                  <EditIcon />
                </Action>,
              ],
            };
          }),
        };
        setData(new_data);
      }
    });
  }, []);

  useEffect(() => {
    if (filters) {
      const params = {
        Customer_ID:
          filters.account_id !== undefined && filters.account_id !== ""
            ? filters.account_id
            : undefined,
        reference:
          filters.reference !== undefined && filters.reference !== ""
            ? filters.reference.replaceAll(" ", "+")
            : undefined,

        day:
          filters.day !== undefined && filters.day !== ""
            ? filters?.day?.$D
            : undefined,

        month:
          filters.month !== undefined && filters.month !== ""
            ? filters?.month?.$M + 1
            : undefined,

        year:
          filters.year !== undefined && filters.year !== ""
            ? filters?.year?.$y
            : undefined,
      };

      QuotationFormService.getFilteredData(params)
        .then((res) => {
          if (res.status === 200) {
            const new_data = {
              count: res.data.count,
              rows: res.data.rows.map((item, index) => {
                return {
                  reference: item.reference + "-REV" + item.revision,
                  account_id: item.Customer_ID,
                  day: item.day,
                  month: item.month,
                  year: item.year.toString().replace(/\,/g, ""),
                  options: [
                    <Action
                      key={index}
                      preference={{
                        name: "Düzenle",
                        action: ["Müşteriyi Düzenle", "Görüntüle", "İndir"],
                        pathname: "/order-module/customer/form",
                        query: {
                          type: "update",
                          id: item.account_id,
                        },
                      }}
                    >
                      <EditIcon />
                    </Action>,
                  ],
                };
              }),
            };
            setData(new_data);
          }
        })
        .catch((err) => {});
    }
  }, [filters]);

  useEffect(() => {
    QuotationFormService.getPage(parseInt(page))
      .then((res) => {
        if (res.status === 200) {
          const new_data = {
            count: res.data.count,
            rows: res.data.rows.map((item, index) => {
              return {
                reference: item.reference + "-REV" + item.revision,
                account_id: item.Customer_ID,
                day: item.day,
                month: item.month,
                year: item.year.toString().replace(/\,/g, ""),
                options: [
                  <Action
                    key={index}
                    preference={{
                      name: "Düzenle",
                      action: ["Müşteriyi Düzenle", "Görüntüle", "İndir"],
                      pathname: "/order-module/customer/form",
                      query: {
                        type: "update",
                        id: item.account_id,
                      },
                    }}
                  >
                    <EditIcon />
                  </Action>,
                ],
              };
            }),
          };
          setData(new_data);
        }
      })
      .catch((err) => console.log(err));
  }, [page]);
  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
          Tekliflerim
        </p>
      </div>

      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
        <div className="flex items-center hover:cursor-pointer transition duration-500 hover:scale-110 ">
          <Link
            href={{
              pathname: "/order-module/quotation/form",
              query: {
                type: "create",
                id: "none",
              },
            }}
          >
            <Button variant="outlined" color={"success"}>
              Yeni Teklif
            </Button>
          </Link>
        </div>
        <TextField
          label="Teklif No."
          id="filled-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => handleFilters("reference", e)}
        />
        <TextField
          label="Cari Kod"
          id="filled-start-adornment"
          onChange={(e) => handleFilters("account_id", e)}
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        {[
          { label: "Gün", views: ["day"], format: "DD" },
          { label: "Ay", views: ["month"], format: "MM" },
          { label: "Yıl", views: ["year"], format: "YYYY" },
        ].map((item, index) => {
          return (
            <TimePicker
              key={index}
              propLabels={item.label}
              propViews={item.views}
              propFormat={item.format}
              setData={handleFilters}
            />
          );
        })}
      </div>

      <div className="lg:flex lg:flex-col shadow-xl">
        <Table
          columns={columns}
          rowdata={data?.rows}
          count={parseInt(data?.count)}
          setNPage={setPage}
        />
      </div>
    </div>
  );
}
