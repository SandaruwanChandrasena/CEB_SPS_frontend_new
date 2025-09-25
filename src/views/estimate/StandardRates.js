import { useEffect, useState } from "react";

export default function StandardRates({ color }) {
  const [rates, setRates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedCost, setUpdatedCost] = useState({});
  const [newRate, setNewRate] = useState({
    standardCost: "",
    uom: "",
    description: "",
    lineParentId: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/standard-rates`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRates(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [baseUrl]);

  const handleEdit = (id, currentCost) => {
    setEditingId(id);
    setUpdatedCost({ ...updatedCost, [id]: currentCost });
  };

  const handleChange = (id, field, value) => {
    setUpdatedCost({
      ...updatedCost,
      [id]: { ...updatedCost[id], [field]: value },
    });
  };

  const handleNewRateChange = (field, value) => {
    setNewRate({ ...newRate, [field]: value });
  };

  const handleUpdate = (id) => {
    const updatedRate = { standardCost: updatedCost[id]?.standardCost };

    fetch(`${baseUrl}/api/standard-rates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update");
        }
        return response.json();
      })
      .then((data) => {
        setRates((prevRates) =>
          prevRates.map((rate) =>
            rate.lineSectionTypeId === id
              ? { ...rate, standardCost: data.standardCost }
              : rate
          )
        );
        setEditingId(null);
      })
      .catch((error) => console.error("Error updating standard cost:", error));
  };

  const handleAddRow = () => {
    setIsAdding(true);
  };

  const handleSaveNewRow = () => {
    fetch(`${baseUrl}/api/standard-rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new rate");
        }
        return response.json();
      })
      .then((data) => {
        setRates([...rates, data]); // update state with newly saved data
        setNewRate({
          standardCost: "",
          uom: "",
          description: "",
          lineParentId: "",
        });
        setIsAdding(false);
      })
      .catch((error) => console.error("Error adding new rate:", error));
  };

  const totalPages = Math.ceil(rates.length / rowsPerPage);
  const currentData = rates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl px-12">
        <div className="relative flex flex-col w-full min-w-0 px-6 mt-6 mb-6 break-words bg-white rounded shadow-lg">
          <div className="flex justify-between px-6 mt-6">
            <h3 className={"font-bold text-sm " + color}>Standard Rates</h3>
            <button
              onClick={handleAddRow}
              style={{ backgroundColor: "#7c0000" }}
              className="px-3 py-2 text-sm text-white rounded focus:outline-none"
            >
              Add New
            </button>
          </div>
          <div className="block w-full mt-4 overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 mr-4 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    ID
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    UOM
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Standard Cost
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Description
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Parent ID
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                  {/* <th className="px-6 py-3 text-xs font-semibold text-left uppercase">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {currentData.map((rate) => (
                  <tr key={rate.lineSectionTypeId}>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {rate.lineSectionTypeId}
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {rate.uom}
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {editingId === rate.lineSectionTypeId ? (
                        <input
                          type="number"
                          value={
                            updatedCost[rate.lineSectionTypeId]?.standardCost ||
                            ""
                          }
                          onChange={(e) =>
                            handleChange(
                              rate.lineSectionTypeId,
                              "standardCost",
                              e.target.value
                            )
                          }
                          className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      ) : (
                        rate.standardCost
                      )}
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {rate.description}
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {rate.lineParentId}
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      {editingId === rate.lineSectionTypeId ? (
                        <button
                          onClick={() => handleUpdate(rate.lineSectionTypeId)}
                          className="px-6 py-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 bg-green hover:shadow-md focus:outline-none"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleEdit(
                              rate.lineSectionTypeId,
                              rate.standardCost
                            )
                          }
                          style={{ backgroundColor: "#7c0000" }}
                          className="px-3 py-2 text-sm text-white rounded "
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {isAdding && (
                  <tr>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3">
                            <input
                              type="text"
                              className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={(e) =>
                                handleNewRateChange(
                                  "lineSectionTypeId",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3">
                            <input
                              type="text"
                              className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={(e) =>
                                handleNewRateChange("uom", e.target.value)
                              }
                            />
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3">
                            <input
                              type="number"
                              className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={(e) =>
                                handleNewRateChange(
                                  "standardCost",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3">
                            <input
                              type="text"
                              className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={(e) =>
                                handleNewRateChange(
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3">
                            <input
                              type="text"
                              className="border-0 px-3 h-0.5 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              onChange={(e) =>
                                handleNewRateChange(
                                  "lineParentId",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                    <td className="p-4 px-6 text-sm border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                      <div className="flex">
                        {/* edit */}
                        <div className="w-full">
                          <div className="relative w-full mb-3 ml-4">
                            <button
                              onClick={handleSaveNewRow}
                              className="px-6 py-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 bg-green hover:shadow-md focus:outline-none"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                        {/* edit end */}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end px-6 pb-2 mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={{ backgroundColor: "#7c0000" }}
              className="px-3 py-2 text-sm text-white rounded "
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              style={{ backgroundColor: "#7c0000" }}
              className="px-3 py-2 text-sm text-white rounded "
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
