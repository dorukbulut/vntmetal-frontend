"use client";
import { useRouter } from "next/router";
import Link from "next/link";
const mapper = {
  admin: "Ana Sayfa",
  customers: "Müşterilerim",
  make: "Teklif Hazırlama",
  form: "Teklif Oluşturma",
  quotation: "Teklif",
  "sale-confirmation": "Sipariş Onay",
  "wor-order": "İş Emirleri",
};

export default function BreadCrumbs() {
  const router = useRouter();
  const allPaths = router.pathname.split("/").slice(1);

  return (
    <nav className="flex p-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {allPaths.map((item, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  href={`/${allPaths.slice(0, index + 1).join("/")}`}
                  passHref
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 "
                >
                  {mapper[item]}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
