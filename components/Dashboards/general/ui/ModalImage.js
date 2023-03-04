"use client";
import { useState } from "react";

const ModalImage = ({ image }) => {
  const [visible, setVisible] = useState(true);
  const toogleModal = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="">
        <img
          className="w-full h-full object-cover cursor-pointer lg:max-w-[500px] lg:max-h-[400px]"
          src={image}
          alt="Flower"
          onClick={toogleModal}
        />
      </div>

      <div
        className={`${
          visible
            ? "hidden"
            : "fixed top-50 left-50 z-50 inset-0 w-full h-full bg-black/70 flex justify-center items-center"
        }`}
      >
        <a
          className="fixed z-90 top-6 hover:cursor-pointer right-8 text-white text-5xl font-bold"
          onClick={toogleModal}
        >
          &times;
        </a>
        <img
          src={image}
          className="lg:max-w-[500px] lg:max-h-[400px] w-200 h-200 object-cover"
        />
      </div>
    </div>
  );
};

export default ModalImage;
