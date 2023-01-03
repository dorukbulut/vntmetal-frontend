import ModalImage from "../ui/ModalImage";
export default function MiddleBracketBush ({handleChange, fields, calcs}) {
    const calcaWeigth  = (A8, B8, C8, D8, E8, F8, G8, H8) => {
      return ((A8/2)*(A8/2)*3.14*8.6*E8-(B8/2)*(B8/2)*3.14*8.6*E8)/1000000+((A8/2)*(A8/2)*3.14*8.6*G8-(C8/2)*(C8/2)*3.14*8.6*G8)/1000000+((A8/2)*(A8/2)*3.14*8.6*F8-(D8/2)*(D8/2)*3.14*8.6*F8)/1000000
    }
    
    return (
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
            <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Ortadan Flanşlı Burç Ölçüleri
                  </p>
                  <hr />
            </div>
            <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-end lg:gap-3 space-x1-10">
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Q1 *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["middlebracket_bush"]["bracket_q1"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q1",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

                              ));
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                 Q2 *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["middlebracket_bush"]["bracket_q2"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q2",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

                              ));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Q3 *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["middlebracket_bush"]["bracket_q3"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q3",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

                              ));
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Q4 *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["middlebracket_bush"]["bracket_q4"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_q4",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

                              ));
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                 L1  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["middlebracket_bush"]["bracket_l1"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l1",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

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
                defaultValue={fields["middlebracket_bush"]["bracket_l2"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l2",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

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
                defaultValue={fields["middlebracket_bush"]["bracket_l3"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_l3",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

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
                defaultValue={fields["middlebracket_bush"]["bracket_full"]}
                onChange={(e) => {
                  handleChange("middlebracket_bush", "bracket_full",e);
                  calcs.setCalcW(calcaWeigth(fields["middlebracket_bush"]["bracket_q1"],
                              fields["middlebracket_bush"]["bracket_q3"],
                              fields["middlebracket_bush"]["bracket_q2"],
                              fields["middlebracket_bush"]["bracket_q4"],
                              fields["middlebracket_bush"]["bracket_l1"],
                              fields["middlebracket_bush"]["bracket_l2"],
                              fields["middlebracket_bush"]["bracket_l3"],
                              fields["middlebracket_bush"]["bracket_full"]

                              ));
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
              <ModalImage image={'/middlebracket.png'} />
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