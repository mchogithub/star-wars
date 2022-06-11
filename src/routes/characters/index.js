import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CharactersIndexPage() {
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: characters, error } = useSWR(
    `https://swapi.dev/api/people?page=${currentPage}`,
    fetcher
  );

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  if (error) return <div>failed to load</div>;
  if (!characters) return <div>Loading ...</div>;

  const pages = Math.ceil(Number(characters.count) / 10);

  const genders = {
    none: "bg-gray-100",
    male: "bg-green-100",
    female: "bg-red-100",
    "n/a": "bg-indigo-100",
    hermaphrodite: "bg-purple-100",
  };

  return (
    <>
      <div>
        <nav>
          <ul className="divide-y divide-gray-200">
            {characters.results.map((item, index) => (
              <li key={index + 1}>
                <Link
                  key={index + 1}
                  to={`/characters/${index + 1}`}
                  state={{ backgroundLocation: location, characterInfo: item }}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div
                        arial-label="name"
                        className="truncate text-sm font-medium text-indigo-600"
                      >
                        {item.name}
                      </div>
                      <div
                        arial-label="gender"
                        className="ml-2 flex flex-shrink-0"
                      >
                        <span
                          className={`inline-flex rounded-full ${
                            genders[item.gender]
                          } px-2 text-xs font-semibold leading-5 text-green-800`}
                        >
                          {item.gender}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            name="previous"
            onClick={goToPreviousPage}
            disabled={currentPage === 1 ? true : false}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            name="next"
            onClick={goToNextPage}
            disabled={currentPage === pages ? true : false}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{currentPage}</span> to{" "}
              <span className="font-medium">{pages}</span> of{" "}
              <span className="font-medium">{characters.count}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 ? true : false}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pages ? true : false}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
