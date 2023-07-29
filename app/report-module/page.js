"use client";
import Line from "../../components/charts/line";
import PieChart from "../../components/charts/pie";
import BarChart from "../../components/charts/bar";
import Scatter from "../../components/charts/scatter";
export default function Page() {
  return (
    <div className="w-full h-full space-y-5">
      <div>
        <p className="text-2xl flex text-center text-green-600 tracking widest font-roboto">
          Özet
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-3 w-full space-x-3 space-y-3">
        <div className="rounded-lg shadow-xl p-0.25 col-span-2">
          <div className="bg-white rounded-lg p-5">
            <Line />
          </div>
        </div>
        <div className="rounded-lg shadow-xl p-0.25 col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <PieChart />
          </div>
        </div>
        <div className="rounded-lg shadow-xl p-0.25 col-span-1">
          <div className="bg-white rounded-lg p-5">
            <BarChart />
          </div>
        </div>
        <div className="rounded-lg shadow-xl p-0.25 col-span-2">
          <div className="bg-white rounded-lg p-5">
            <Scatter />
          </div>
        </div>
      </div>
    </div>
  );
}
