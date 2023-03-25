"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import WorkOrderForm from "./form";
import CustomerService from "../../../../services/CustomerService";
export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

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
      <WorkOrderForm customers={customers} type={type} id={id} />
    </div>
  );
}
