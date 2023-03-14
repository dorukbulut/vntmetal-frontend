"use client";
import QuotationForm from "../form";
import CustomerService from "../../../../services/CustomerService";
import { useState, useEffect } from "react";
export default function FormPage() {
  // fetch customer data
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <div className="w-full h-full">
      <QuotationForm customers={customers} />
    </div>
  );
}
