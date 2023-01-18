import ModalImage from "../../../ui/ModalImage";
export default function DoubleBracketBush ({handleChange, fields, calcs}) {
    const calcWeigth = (A8, B8, C8, D8, E8, F8, G8) => {
      return ((A8/2)*(A8/2)*3.14*8.6*D8-(C8/2)*(C8/2)*3.14*8.6*D8)/1000000+((B8/2)*(B8/2)*3.14*8.6*F8-(C8/2)*(C8/2)*3.14*8.6*F8)/1000000+((A8/2)*(A8/2)*3.14*8.6*E8-(C8/2)*(C8/2)*3.14*8.6*E8)/1000000
    }
    
    return (
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
            <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Çift Flanşlı Burç Ölçüleri
                  </p>
                  <hr />
            </div>
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Büyük Çap *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["bigger_diameter"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "bigger_diameter",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                 Body Çap *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["body_diameter"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "body_diameter",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                İç Çap  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["inner_diameter"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "inner_diameter",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Flanş Boyu L1 *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["bracket_l1"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "bracket_l1",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Flanş Boyu L2  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["bracket_l2"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "bracket_l2",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Ara Boy L3  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["bracket_l3"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "bracket_l3",e);
                  calcs.setCalcW(calcWeigth(fields["doublebracket_bush"]["bigger_diameter"],
                              fields["doublebracket_bush"]["body_diameter"],
                              fields["doublebracket_bush"]["inner_diameter"],
                              fields["doublebracket_bush"]["bracket_l1"],
                              fields["doublebracket_bush"]["bracket_l2"],
                              fields["doublebracket_bush"]["bracket_l3"]
                              ));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Tam Boy L  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["doublebracket_bush"]["bracket_full"]}
                onChange={(e) => {
                  handleChange("doublebracket_bush", "bracket_full",e)
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
              <ModalImage image={'/doublebracket.png'} />
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