import ModalImage from "../ui/ModalImage";
export default function PlateStrip ({handleChange, fields, calcs}) {
    const calcWeigth = (A8, B8, C8) => {
      return A8*B8*C8*8.6/1000000
    }
    return (
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
            <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Plaka Ölçüleri
                  </p>
                  <hr />
            </div>
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                En  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["plate_strip"]["width"]}
                onChange={(e) => {
                  handleChange("plate_strip", "width",e);
                  calcs.setCalcW(calcWeigth(fields["plate_strip"]["width"],fields["plate_strip"]["length"],fields["plate_strip"]["thickness"] ));
                }
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
               Boy *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["plate_strip"]["length"]}
                onChange={(e) => {
                  handleChange("plate_strip", "length",e);
                  calcs.setCalcW(calcWeigth(fields["plate_strip"]["width"],fields["plate_strip"]["length"],fields["plate_strip"]["thickness"] ))
              }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Kalınlık  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["plate_strip"]["thickness"]}
                onChange={(e) => {
                  handleChange("plate_strip", "thickness",e);
                  calcs.setCalcW(calcWeigth(fields["plate_strip"]["width"],fields["plate_strip"]["length"],fields["plate_strip"]["thickness"] ))
              }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Hesaplanan Ağırlık
              </label>
              <p className="font-poppins text-red-700">{calcs.calcW}</p>
            </div>
            </div>

            <div className="flex flex-col">
              <ModalImage image={"/platestrip.png"} />
            </div>

            <div className="flex flex-col">
              <p className="font-poppins text-red-700">UYARI: PAYLI/PAYSIZ ÖLÇÜ GİRİŞİNE DİKKAT EDİNİZ !</p>
            </div>
            {calcs.calcW < 1 ? <div className="flex flex-col">
              <p className="font-poppins text-red-700">UYARI: 1 kg. altı ÜRÜN</p>
            </div>: "" }
            
        </div>
    );
}