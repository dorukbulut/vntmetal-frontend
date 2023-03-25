"use client";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import SaleConfirmationForm from "./form";
import OrderConfirmationService from "../../../../services/OrderConfirmationService/index";
import CustomerService from "../../../../services/CustomerService";
export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    if (type === "create") {
      CustomerService.getAllCustomers()
        .then((res) => {
          if (res.status === 200) {
            setCustomers(
              res.data.customers.map((customer) => {
                return {
                  title: `${customer.account_id}`,
                };
              })
            );
          }
        })
        .catch((err) => console.error);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <SaleConfirmationForm
        prevValue={{}}
        dispatch={dispatch}
        customers={customers}
        type={type}
        id={id}
      />
    </div>
  );
}
