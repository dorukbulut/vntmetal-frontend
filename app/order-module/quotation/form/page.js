"use client";
import QuotationForm from "../form";
import CustomerService from "../../../../services/CustomerService";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function FormPage() {
  const fields = useSelector((state) => state.quotation.fields);
  const dispatch = useDispatch();
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
      <QuotationForm
        prevValue={{ fields }}
        dispatch={dispatch}
        customers={customers}
      />
    </div>
  );
}
