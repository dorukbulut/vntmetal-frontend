import { useEffect, useState } from "react";

export default function Alert({message, renderOpen, setWarning}){
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={`fixed  inset-0 bg-gray-600 bg-opacity-40  right-0 z-50 ${renderOpen ? "" : "hidden"} p-4 `}
    >
      <div className="relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="animate-pulse mb-5 text-xl font-normal text-red-500 ">
                UYARI : {message} !
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => setWarning((old) => {
                return {
                  message : "",
                  clicked : old.clicked,
                  validity : false,
                }
              })}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              TAMAM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
