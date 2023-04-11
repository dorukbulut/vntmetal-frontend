"use client";
import Table from "../../order-module/table";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import TimePicker from "../../../components/base/timepicker.js";
import { columns } from "./data.js";
import { useState, useEffect } from "react";
import ProductionProductService from "../../../services/ProductionProductService";
import Action from "../../../components/base/action";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import useSWR from "swr";
export default function Page() {
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
  const { data1 } = useSWR(() => {
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
            ? isNaN(filters?.month?.$M + 1)
              ? undefined
              : filters?.month?.$M + 1
            : undefined,

        year:
          filters.year !== undefined && filters.year !== ""
            ? filters?.year?.$y
            : undefined,
      };

      ProductionProductService.getFilteredData(params)
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
                  status: <Chip label="Bekliyor" color="error" />,
                  options: [
                    <Action
                      key={index}
                      preference={{
                        name: "Düzenle",
                        action: [
                          {
                            name: "Ocak ve Döküm kayıtları",
                            pathname: "/production-module/production/products",
                            query: {
                              id: item.workorder_ID,
                              reference: item.reference + "REV" + item.revision,
                            },
                          },
                          {
                            name: "Görüntüle",
                            pathname: "/production-module/production/view",
                            query: {
                              id: item.workorder_ID,
                              type: item.quotationItem.itemType,
                            },
                          },
                        ],
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
    } else {
      ProductionProductService.getPage(page).then((res) => {
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
                status: <Chip label="Bekliyor" color="error" />,
                options: [
                  <Action
                    key={index}
                    preference={{
                      name: "Düzenle",
                      action: [
                        {
                          name: "Ocak ve Döküm kayıtları",
                          pathname: "/production-module/production/products",
                          query: {
                            id: item.workorder_ID,
                            reference: item.reference + "REV" + item.revision,
                          },
                        },
                        {
                          name: "Görüntüle",
                          pathname: "/production-module/production/view",
                          query: {
                            id: item.workorder_ID,
                            type: item.quotationItem.itemType,
                          },
                        },
                      ],
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
    }
  });
  const router = useRouter();
  return (
    <div className="w-full h-full space-y-10">
      <div>
        <p className="text-2xl flex text-center text-yellow-600 tracking widest font-roboto">
          Ocak ve Dökümhane
        </p>
      </div>
      <div className="lg:flex lg:gap-10 lg:items-center p-2 shadow-xl rounded-lg">
        <TextField
          label="İş Emri No."
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
          type="number"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon></SearchIcon>
              </InputAdornment>
            ),
          }}
          variant="standard"
          onChange={(e) => handleFilters("account_id", e)}
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
          count={data?.count}
          setNPage={setPage}
        />
      </div>
    </div>
  );
}
