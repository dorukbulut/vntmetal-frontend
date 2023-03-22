"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    options: {
      customerInquiryNum: "",
      grand_total: "",
      validityOfOffer: "",
      reference: "",
      IncotermType: "",
      PaymentTerms: "",
      extraDetails: "",
      preparedBy: "",
      approvedBy: "",
      language: "",
      company: "",
    },
    area: {
      name: "",
    },
    delivery_type: {
      name: "",
      package_fee: 0,
      loading_fee: 0,
      delivery_fee: 0,
      export_fee: 0,
      terminal_fee_exit: 0,
      vehicleLoading_fee: 0,
      transport_fee: 0,
      insurance_fee: 0,
      terminal_fee_entry: 0,
      import_fee: 0,
      currencyVal: "",
      currencyType: "",
      description: "",
    },

    all: [],
  },
  customer: "",
};

export const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.fields = action.payload;
    },
    setCust: (state, action) => {
      state.customer = action.payload;
    },

    clearResults: (state) => {
      state.fields = initialState.fields;
      state.customer = "";
    },
  },
});

export const { setValues, clearResults, setCust } = quotationSlice.actions;
const quotationReducer = quotationSlice.reducer;
export default quotationReducer;
