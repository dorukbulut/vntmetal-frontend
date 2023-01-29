import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {useRouter} from "next/router";
import Dropdown from "../../Common/Dropdown";
import SetItem from "./SetQuotationItem";
import { useStepContext } from "@mui/material";

const INCOTERMS_EXTRA = [
  {
    key : "EXW",
    value : "EXW",

  },
  {
    key : "FCA",
    value : "FCA",

  },
  {
    key : "FAS",
    value : "FAS",

  },
  {
    key : "FOB",
    value : "FOB",

  },
  {
    key : "CFR",
    value : "CFR",

  },
  {
    key : "CIF",
    value : "CIF",

  },
  {
    key : "CPT",
    value : "CPT",

  },
  {
    key : "CIP",
    value : "CIP",

  },
  {
    key : "DAP",
    value : "DAP",

  },
  {
    key : "DPU",
    value : "DPU",

  },
  {
    key : "DDP",
    value : "DDP",

  },
]

const INCOTERMS_INTRA = [
  {
    key : "VNTFT",
    value : "VNTFT",

  },
  {
    key : "MT",
    value : "MT",

  },
  {
    key : "ARAS",
    value : "ARAS",

  },

  {
    key : "UPS",
    value : "UPS",

  },
]


export default function CreateQuotationForm({customers}) {
  const CUSTOMER = customers.map((customer) => {
    return {
      key: customer.account_id,
      value: customer.account_id,
    };
  });
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  const [createErr, setCreateErr] = useState(false);
  const [fields, setFields] = useState({
    options : {
      customerInquiryNum : '',
      grand_total : '',
      validityOfOffer : '',
      IncotermType : '',
      PaymentTerms: '',
      extraDetails : '',
      preparedBy : '',
      approvedBy : '',

    },
    area : {
      name : ''
    },
    delivery_type: {
        name:  '',
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
        currencyType : "",
        description : '',
    },

    all : []
  });

  const [currErrors, setCurrErrors] = useState({
    Customer_ID : {
      Customer_ID  : ''
    },
    all : {
      all : '',
    },
    options : {
      customerInquiryNum : '',
      grand_total : '',
      validityOfOffer : '',
      IncotermType : '',
      PaymentTerms: '',
      extraDetails : '',
      preparedBy : '',
      approvedBy : '',

    },
    area : {
      name : ''
    },
    delivery_type: {
        name:  '',
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
        currencyType : "",
        description : '',
    },

    
  });

  const [Customer_ID, setCustomer] = useState({
    options : {
      Customer_ID : ''
    }
  })
  
  


  const [all, setAll] = useState([]);
  const router = useRouter();

  
  const [setting, setSetting] = useState('');
  const handleChange = (field, area, e) => {
    let new_fields = fields
    new_fields[field][area] = e.target.value
    setFields(new_fields);
    setSetting(fields.area.name)
    
  };
  

  const handleChangeCustomer = (field, area, e) => {
    setCustomer((old) => {
      return {
        ...old,
        [field]: {
          [area] : e.target.value
        }
      }
    })
  }

  
  const handleValidation = () => {
    let check_fields = fields;
    let errors = currErrors;
    let isValid = true;
     
     //customerInquiery
     if (check_fields.options.customerInquiryNum === '') {
      isValid = false
      errors.options.customerInquiryNum = "Müşteri Referans Numarası Boş bırakalamaz !"
     } else  {
      errors.options.customerInquiryNum = ""
     }

     //account_id
     if (Customer_ID.options.Customer_ID === '') {
      isValid = false
      errors.Customer_ID.Customer_ID = "Müşteri Cari Kodu Boş bırakalamaz !"
     } else  {
      errors.Customer_ID.Customer_ID = ""
     }

     //preparedBy
     if (check_fields.options.preparedBy === '') {
      isValid = false
      errors.options.preparedBy = "Hazırlayan Kişi Boş bırakılamaz !"
     } else  {
      errors.options.preparedBy = ""
     }

     //approvedBy
     if (check_fields.options.approvedBy === '') {
      isValid = false
      errors.options.approvedBy = "Onaylayan Kişi Boş bırakılamaz !"
     } else  {
      errors.options.approvedBy = ""
     }

     //delivery_type name !
     if (check_fields.delivery_type.name === '') {
      isValid = false
      errors.delivery_type.name = "Teslimat Şekli boş bırakalamaz !"
     } else  {
      errors.delivery_type.name = ""
     }

     //deliveryCurrency
     if(check_fields.delivery_type.currencyType === '') {
      isValid = false;
      errors.delivery_type.currencyType = "Döviz Tipi boş bırakılamaz"
     } else {
      errors.delivery_type.currencyType = ""
     }

     //deliveryCurrency
     if(check_fields.delivery_type.currencyVal === '') {
      isValid = false;
      errors.delivery_type.currencyVal = "Döviz Kuru boş bırakılamaz"
     } else {
      errors.delivery_type.currencyVal = ""
     }

     //items!
     const undeF = all.filter(item => item!=undefined);
     if (undeF.length === 0 ) {
      isValid = false
      errors.all.all = "En az 1 adet ürün seçilmeli !"
     } else  {
        errors.all.all = ""
      }
    
      //every checked item
    if(undeF.length !== 0) {
      const check = undeF.map(item => {
        if(item.description === "" || item.deliveryTime === "" ) return item
      }).filter(item => item!=undefined);

      if(check.length !== 0) {
        isValid = false
        errors.all.all = "Ürün Açıklamaları ve Teslimat süreleri boş bırakılamaz!"
      }

      else {
        const check = undeF.map(item => {
          if(item.currency !== undeF[0].currency) return item
        }).filter(item => item!=undefined);
  
        if(check.length !== 0) {
          isValid = false
          errors.all.currency = "Seçilen Ürünlerin para birimleri aynı olmalıdır !"
        }
        else {
          if (check_fields.delivery_type.currencyType !== undeF[0].currency) {
            isValid = false
            errors.delivery_type.currencyType = "Teslimat Kuru, seçilen ürünlerin para birimleriyle aynı olmalıdır !"
          }
          errors.all.currency = ""
        }
        errors.all.all = ""
      }
    }
    


     
    
     setCurrErrors(errors)
     return isValid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
    let data = {
      options : {
        ...fields.options,
        Customer_ID : Customer_ID.options.Customer_ID,
        grand_total : all.filter(item => item!=undefined).reduce((prev ,val) => {
          console.log()
          return prev + parseFloat((val.total_price).split(" ")[0])
        }, 0)
      },

      delivery_type : {
        ...fields.delivery_type,
        total : parseFloat(fields.delivery_type.package_fee) + parseFloat(fields.delivery_type.loading_fee) + 
        parseFloat(fields.delivery_type.delivery_fee) + parseFloat(fields.delivery_type.export_fee) + parseFloat(fields.delivery_type.terminal_fee_exit) +
        parseFloat(fields.delivery_type.vehicleLoading_fee) + parseFloat(fields.delivery_type.transport_fee) +
        parseFloat(fields.delivery_type.insurance_fee) + parseFloat(fields.delivery_type.terminal_fee_entry) + 
        parseFloat(fields.delivery_type.import_fee)
      },

      all : all.filter(item => item!=undefined).map((item) => {
        return {
          item_id : item.item_id, 
          description : item.description, 
          deliveryTime : parseInt(item.deliveryTime)
        }
      })
    }
    
    
      try{
        const res = await axios({ 
          method : "post",
          data: data , 
          url : `${process.env.NEXT_PUBLIC_BACKEND}/api/quotation-form/create`,
          withCredentials : true});
          if(res.status === 200) {
            setSubmit(true);
            setIsvalid(true);
          } 
      }
      catch(err) {
        setSubmit(false);
        setCreateErr(true);
      }
      

      
      
    } else {
      setIsvalid(false);
    }
  };

  
  const toggleCreate = () => {
    setCreate(!create);
  };
  return (
    <div>
      <button
        className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleCreate}
      >
        + Form Oluştur 
      </button>

      <div
        className={`${
          create ? "visible scale-100" : "invisible transform scale-0 h-0"
        } fixed z-50 inset-0 bg-gray-600 bg-opacity-40 overflow-y-auto lg:p-10  h-full w-full transition duration-500 ease-in-out origin-center`}
      >
        <div className="relative lg:top-3 top-20 mx-auto p-5 border shadow-lg lg:w-full lg:w-full rounded-md bg-white p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 relative top-0 left-0 hover:cursor-pointer"
            onClick={() => {toggleCreate() 
              router.reload(window.location.pathname);}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <div
            className={`${
              !submit && isValid && !createErr ? "visible scale-100" : "invisible scale-0 h-0"
            } flex flex-col space-y-10`}
          >
            <p className="text-center font-poppins tracking-wide lg:text-lg text-sm text-green-600">
              Yeni Teklif Formu
            </p>
            <form className="grid grid-cols-1 space-y-5 lg:grid-cols-1 ">
              {/*Customer info*/}
              <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Form  Bilgileri
                  </p>
                  <hr />
                </div>

                <div className="space-y-5 lg:grid lg:grid-cols-3 lg:items-end lg:gap-3 ">
                <div className="flex flex-col space-y-3 ">
                              <label
                                htmlFor="small-input"
                                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                              >
                                Cari Kod *
                              </label>
                              <Dropdown
                                label="Cari Kod"
                                field="options"
                                area="Customer_ID"
                                items={CUSTOMER}
                                fields={Customer_ID}
                                handleChange={handleChangeCustomer}
                              />
                            </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Müşteri Referans Numarası *
                    </label>
                    <input
                      type="text"
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100  relative  block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) =>
                        handleChange("options", "customerInquiryNum", e)
                      }
                    />
                  </div>

                  

                  
                </div>
              </div>

              {/*Tax Info*/}
              <div className="m-0 space-y-7 lg:flex lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Teklif Kalemleri
                  </p>
                  <hr />
                </div>

                <div className="space-y-5 lg:grid lg:place-items-center">
                  <SetItem fields={Customer_ID} setAll={setAll} />
                </div>
              </div>

              {/*Tax Info*/}
              <div className="m-0 space-y-7 lg:flex lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Incoterm Detayları
                  </p>
                  <hr />
                </div>

                <div className="space-y-5 lg:grid lg:grid-cols-3 lg:place-items-center">
                <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Döviz Kuru (TL ise 1 Girininiz)
                    </label>
                    <input
                      type="number"
                      step={"any"}
                      
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) => handleChange("delivery_type", "currencyVal", e)}
                    />
                  </div>
                  <div className="flex flex-col space-y-3 ">
                                <label
                                  htmlFor="small-input"
                                  className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                                >
                                  Döviz Tipi
                                </label>
                                <Dropdown
                                  label="Teslimat"
                                  field="delivery_type"
                                  area="currencyType"
                                  items={[{key : "₺", value: "₺"},{key:"$", value : "$"}, {key:"€", value : "€"}]}
                                  fields={fields}
                                  handleChange={handleChange}
                                />
                  </div>
                <div className="flex flex-col space-y-3 ">
                                <label
                                  htmlFor="small-input"
                                  className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                                >
                                  Teslimat Şekli *
                                </label>
                                <Dropdown
                                  label="Teslimat"
                                  field="area"
                                  area="name"
                                  items={[{key : "Yurt İçi", value: "intra"},{key:"Yurt Dışı", value : "extra"}]}
                                  fields={fields}
                                  handleChange={handleChange}
                                />
                  </div>

                  <div className="flex flex-col space-y-3 ">
                                <label
                                  htmlFor="small-input"
                                  className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                                >
                                  Teslimat Tipi *
                                </label>
                                <Dropdown
                                  label="Teslimat Tipi"
                                  field="delivery_type"
                                  area="name"
                                  items={setting === "extra" ? INCOTERMS_EXTRA : INCOTERMS_INTRA }
                                  fields={fields}
                                  handleChange={handleChange}
                                />
                  </div>

                 
                  

                  <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Paketleme *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "package_fee", e)}
              />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Yükleme Ücreti *
                    </label>
                    <input
                      type="number"
                      step={"any"}
                      
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) => handleChange("delivery_type", "loading_fee", e)}
                    />
                  </div>
                  {setting === 'extra' ? <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Liman veya Belirlenen Yerde teslim *
                    </label>
                    <input
                      type="number"
                      step={"any"}
                      
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) => handleChange("delivery_type", "delivery_fee", e)}
                    />
                  </div> : '' }
                  
            {setting === "extra" ?  <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                İhracat Prosedürleri *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "export_fee", e)}
              />
            </div> : ''}   
           
            {setting === "extra" ? <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Çıkış terminali ücretleri *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "terminal_fee_exit", e)}
              />
            </div> : ''}
            
            {setting === "extra" ?  <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Araca Yükleme *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "vehicleLoading_fee", e)}
              />
            </div> : ''}
           
            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Taşıma masrafları *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "transport_fee", e)}
              />
            </div>
            {setting === "extra" ? <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Sigorta *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "insurance_fee", e)}
              />
            </div> : ''}
            
            {setting === "extra" ? <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                Varış Terminali Ücretleri *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "terminal_fee_entry", e)}
              />
            </div> : ''}
            
            {setting === "extra" ? <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
              >
                İthalat Prosedürleri *
              </label>
              <input
                type="number"
                step={"any"}
                
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                onChange={(e) => handleChange("delivery_type", "import_fee", e)}
              />
            </div>: ''}
            

            <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Açıklama
                    </label>
                    <textarea
                      type="text"
                      className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      onChange={(e) =>
                        handleChange("delivery_type", "description", e)
                      }
                    />
            </div>
           
           

                </div>
              </div>

              {/*Address Info*/}
              <div className=" m-0 lg:flex  space-y-5 lg:flex-col lg:items-center">
                <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Teklif Detayları
                  </p>
                  <hr />
                </div>

                <div className="space-y-2 lg:grid lg:grid-cols-1 lg:w-1/3 lg:items-end lg:gap-3 ">
                
                  
                  <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Geçerlilik Süresi
                    </label>
                    <textarea
                      type="text"
                      className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      onChange={(e) =>
                        handleChange("options", "validityOfOffer", e)
                      }
                    />
                  </div>
                  
                  <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Incoterm Açıklama
                    </label>
                    <textarea
                      type="text"
                      className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      onChange={(e) =>
                        handleChange("options", "IncotermType", e)
                      }
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Ödeme Şekli
                    </label>
                    <textarea
                      type="text"
                      className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      onChange={(e) =>
                        handleChange("options", "PaymentTerms", e)
                      }
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Ekstra Açıklama
                    </label>
                    <textarea
                      type="text"
                      className="pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      onChange={(e) =>
                        handleChange("options", "extraDetails", e)
                      }
                      
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Hazırlayan *
                    </label>
                    <input
                      type="text"
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) =>
                        handleChange("options", "preparedBy", e)
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="small-input"
                      className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 "
                    >
                      Onaylayan *
                    </label>
                    <input
                      type="text"
                      className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                      placeholder=""
                      required
                      onChange={(e) =>
                        handleChange("options", "approvedBy", e)
                      }
                    />
                  </div>

                  
                </div>
              </div>
            </form>

            {/*Buttons*/}
            <div className="flex justify-end space-x-3">
              <button
                className="bg-green-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={handleSubmit}
              >
                Oluştur
              </button>
              <button
                className="bg-red-600 text-white active:bg-sky-500 font-bold font-poppins uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={toggleCreate}
              >
                İptal
              </button>
            </div>
          </div>

          <div
            className={`${
              submit && isValid ? "visible scale-100" : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Başarılı!
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Teklif Formu Başarıyla Kaydedildi!
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  toggleCreate();
                  setSubmit(false);
                  router.reload(window.location.pathname);
                  
                }}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Tamam
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && !isValid
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>

            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Eksik Bilgi girdiniz !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>

              <div className="text-justify font-poppins italic w-full space-y-1">
              {!submit && !isValid ? Object.entries(currErrors).map(heading => {
                return Object.entries(heading[1]).map((err, index) => {
                  if(err[1] !==0) {
                    return <p key={index} className="text-sm text-red-600">{err[1]}</p>
                  }
                })
              }) : ""}
              </div>
              
              
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setIsvalid(true);
                  
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>

          <div
            className={`${
              !submit && createErr
                ? "visible scale-100"
                : "invisible scale-0 h-0"
            } mt-3 text-center transition duration-500 ease-out`}
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>

            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Böyle bir müşteri zaten mecvut !
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Lütfen formu kontrol edin!
              </p>  
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={() => {
                  setSubmit(false);
                  setCreateErr(false);
                  
                }}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
