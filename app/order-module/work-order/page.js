"use client";
import Table from "../table";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TimePicker from "../../../components/base/timepicker.js";
import Action from "../../../components/base/action";
import WorkOrderService from "../../../services/WorkOrderService";
import Alert from "../../../components/base/alert";
import Select from "@mui/material/Select";
import { columns } from "./data";
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
  const [error, setError] = useState({
    isOpen: false,
    type: "info",
    message: "neden",
    title: "",
  });
  const handleproduct = async (workorder_id) => {
    try {
      const res = await WorkOrderService.settoTrue(workorder_id);
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Dökümhaneye Gönderildi !",
          title: "Başarılı",
        });
      }
    } catch (err) {
      setError({
        isOpen: true,
        type: "error",
        message: "Gönderilemedi !",
        title: "Hata",
      });
    }
  };
  const handleretake = async (workorder_id) => {
    try {
      const res = await WorkOrderService.settoFalse(workorder_id);
      if (res.status === 200) {
        setError({
          isOpen: true,
          type: "success",
          message: "Dökümhaneden Çekildi !",
          title: "Başarılı",
        });
      }
    } catch (err) {
      setError({
        isOpen: true,
        type: "error",
        message: "Hata !",
        title: "Hata",
      });
    }
  };
  useEffect(() => {
    WorkOrderService.getDefaultData().then((res) => {
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
              isProduct: (
                <div className="">
                  <FormControl variant="standard" fullWidth>
                    <InputLabel>İşlem</InputLabel>
                    <Select sx={{ padding: "2px" }}>
                      <div className="p-2">
                        <Button
                          onClick={(e, id = item.workorder_ID) =>
                            handleproduct(id)
                          }
                          variant="outlined"
                          color={"warning"}
                        >
                          Dökümhaneye Gönder
                        </Button>
                      </div>
                      <div className="p-2">
                        <Button
                          onClick={(e, id = item.workorder_ID) =>
                            handleretake(id)
                          }
                          variant="outlined"
                          color={"error"}
                        >
                          Geri Çek
                        </Button>
                      </div>
                    </Select>
                  </FormControl>
                </div>
              ),
              options: [
                <Action
                  key={index}
                  preference={{
                    name: "Düzenle",
                    action: [
                      {
                        name: "İş Emrini Düzenle",
                        pathname: "/order-module/work-order/form",
                        query: {
                          type: "update",
                          id: item.workorder_ID,
                        },
                      },
                      {
                        name: "Görüntüle",
                        pathname: "/order-module/work-order/view",
                        query: {
                          id: item.workorder_ID,
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
            ? isNaN(filters?.month?.$M + 1)
              ? undefined
              : filters?.month?.$M + 1
            : undefined,

        year:
          filters.year !== undefined && filters.year !== ""
            ? filters?.year?.$y
            : undefined,
      };

      WorkOrderService.getFilteredData(params)
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
                  isProduct: (
                    <div className="">
                      <FormControl variant="standard" fullWidth>
                        <InputLabel>İşlem</InputLabel>
                        <Select sx={{ padding: "2px" }}>
                          <div className="p-2">
                            <Button
                              onClick={(e, id = item.workorder_ID) =>
                                handleproduct(id)
                              }
                              variant="outlined"
                              color={"warning"}
                            >
                              Dökümhaneye Gönder
                            </Button>
                          </div>
                          <div className="p-2">
                            <Button
                              onClick={(e, id = item.workorder_ID) =>
                                handleretake(id)
                              }
                              variant="outlined"
                              color={"error"}
                            >
                              Geri Çek
                            </Button>
                          </div>
                        </Select>
                      </FormControl>
                    </div>
                  ),
                  options: [
                    <Action
                      key={index}
                      preference={{
                        name: "Düzenle",
                        action: [
                          {
                            name: "İş Emrini Düzenle",
                            pathname: "/order-module/work-order/form",
                            query: {
                              type: "update",
                              id: item.workorder_ID,
                            },
                          },
                          {
                            name: "Görüntüle",
                            pathname: "/order-module/work-order/view",
                            query: {
                              id: item.workorder_ID,
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
    }
  }, [filters]);

  useEffect(() => {
    WorkOrderService.getPage(parseInt(page))
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
                isProduct: (
                  <div className="">
                    <FormControl variant="standard" fullWidth>
                      <InputLabel>İşlem</InputLabel>
                      <Select sx={{ padding: "2px" }}>
                        <div className="p-2">
                          <Button
                            onClick={(e, id = item.workorder_ID) =>
                              handleproduct(id)
                            }
                            variant="outlined"
                            color={"warning"}
                          >
                            Dökümhaneye Gönder
                          </Button>
                        </div>
                        <div className="p-2">
                          <Button
                            onClick={(e, id = item.workorder_ID) =>
                              handleretake(id)
                            }
                            variant="outlined"
                            color={"error"}
                          >
                            Geri Çek
                          </Button>
                        </div>
                      </Select>
                    </FormControl>
                  </div>
                ),
                options: [
                  <Action
                    key={index}
                    preference={{
                      name: "Düzenle",
                      action: [
                        {
                          name: "İş Emrini Düzenle",
                          pathname: "/order-module/work-order/form",
                          query: {
                            type: "update",
                            id: item.workorder_ID,
                          },
                        },
                        {
                          name: "Görüntüle",
                          pathname: "/order-module/work-order/view",
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
      .catch((err) => console.log(err));
  }, [page]);
  return (
    <div className="w-full h-full space-y-10">
      <Alert error={error} />
      <div>
        <p className="text-2xl flex text-center text-red-600 tracking widest font-roboto">
          İş Emirlerim
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
              Yeni İş Emri
            </Button>
          </Link>
        </div>
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
          type="number"
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
