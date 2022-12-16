export default function BracketBush ({handleChange, fields, calcs}) {
    const calcWeigth = (A8, B8, C8, D8, E8) => {
      return ((A8/2)*(A8/2)*3.14*D8*8.6-(B8/2)*(B8/2)*3.14*D8*8.6)/1000000+((B8/2)*(B8/2)*3.14*E8*8.6-(C8/2)*(C8/2)*3.14*E8*8.6)/1000000
    }
    
    return (
        <div className="mt-5 space-y-2 lg:flex lg:flex-col lg:items-center ">
            <div className="space-y-2 lg:w-1/2">
                  <p className="text-center font-poppins text-gray-500 font-medium text-sm ">
                    Flanşlı Burç Ölçüleri
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
                defaultValue={fields["bracket_bush"]["bigger_diameter"]}
                onChange={(e) => {
                  handleChange("bracket_bush", "bigger_diameter",e);
                  calcs.setCalcW(calcWeigth(fields["bracket_bush"]["bigger_diameter"],fields["bracket_bush"]["body_diameter"],
    fields["bracket_bush"]["inner_diameter"],fields["bracket_bush"]["bush_length"], fields["bracket_bush"]["bracket_length"]));
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
                defaultValue={fields["bracket_bush"]["body_diameter"]}
                required
                onChange={(e) => {
                  handleChange("bracket_bush", "body_diameter",e)
                  calcs.setCalcW(calcWeigth(fields["bracket_bush"]["bigger_diameter"],fields["bracket_bush"]["body_diameter"],
    fields["bracket_bush"]["inner_diameter"],fields["bracket_bush"]["bush_length"], fields["bracket_bush"]["bracket_length"]))
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Flanş Boyu  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["bracket_bush"]["bush_length"]}
                onChange={(e) => {
                  handleChange("bracket_bush", "bush_length",e);
                  calcs.setCalcW(calcWeigth(fields["bracket_bush"]["bigger_diameter"],fields["bracket_bush"]["body_diameter"],
    fields["bracket_bush"]["inner_diameter"],fields["bracket_bush"]["bush_length"], fields["bracket_bush"]["bracket_length"]))
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium font-poppins italic text-sky-600 text-gray-900 dark:text-gray-300"
              >
                Boy  *
              </label>
              <input
                type="number"
                step={"any"}
                className="invalid:border-red-500 valid:border-green-500 pl-5 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-sky-600 focus:outline-none focus:transition-shadow"
                placeholder=""
                required
                defaultValue={fields["bracket_bush"]["bracket_length"]}
                onChange={(e) => {
                  handleChange("bracket_bush", "bracket_length",e);
                  calcs.setCalcW(calcWeigth(fields["bracket_bush"]["bigger_diameter"],fields["bracket_bush"]["body_diameter"],
    fields["bracket_bush"]["inner_diameter"],fields["bracket_bush"]["bush_length"], fields["bracket_bush"]["bracket_length"]))
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
                defaultValue={fields["bracket_bush"]["inner_diameter"]}
                onChange={(e) => {
                  handleChange("bracket_bush", "inner_diameter",e)
                  calcs.setCalcW(calcWeigth(fields["bracket_bush"]["bigger_diameter"],fields["bracket_bush"]["body_diameter"],
    fields["bracket_bush"]["inner_diameter"],fields["bracket_bush"]["bush_length"], fields["bracket_bush"]["bracket_length"]))
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

            
        </div>
    );
}