import React, { useState, useCallback, useEffect } from "react";
import CardEstimatePage1 from "components/Cards/CardEstimatePage1";
import CardEstimatePage2 from "components/Cards/CardEstimatePage2";
import CardEstimatePage3 from "components/Cards/CardEstimatePage3";

function EstimateForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [completedTabs, setCompletedTabs] = useState([false, false, false]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [estimates, setEstimates] = useState([]);
  const [formData, setFormData] = useState({
    estimateNo: "",
    revNo: "1",
    deptId: "52010",
    costCenter: "",
    warehouse: "",
    estimateDt: "",
    divSec: "",
    district: "",
    area: "",
    esName: "",
    descr: "",
    rejectReason: "",
    eCSC: "",
    catCd: "",
    stdCost: "",
    omsRefNo: "",
    fileRef: "",
    fundSource: "",
    fundId: "",
    pivDate: "",
    pivNumber: "",
    pivAmount: "",
    custContrib: "",
    entDt: new Date().toISOString().split("T")[0],
    confDt: new Date().toISOString().split("T")[0],
    aprDt1: new Date().toISOString().split("T")[0],
    aprDt2: new Date().toISOString().split("T")[0],
    aprDt3: new Date().toISOString().split("T")[0],
    heatingDt: new Date().toISOString().split("T")[0],
    aprDt4: new Date().toISOString().split("T")[0],
    aprDt5: new Date().toISOString().split("T")[0],
    rejctDt: new Date().toISOString().split("T")[0],
    reviseDt: new Date().toISOString().split("T")[0],
    partialPmt: "N",
    status: "0",
    partPcnt: "",
    partialAmt: "",
    taxPcnt: "",
    taxAmt: "",
    subCont: "",
    contNo: "",
    supCd: "",
    tmplId: "",
    label1: "",
    label2: "",
    label3: "",
    label4: "",
    label5: "",
    label6: "",
    label7: "",
    label8: "",
    label9: "",
    label10: "",
    actualUnits: "",
    controlled: "",
    priority: false,
    paidAmt: "",
    allocPaid: "",
    fundContrib: "",
    settledAmt: "",
    allocSettle: "",
    normDefault: false,
    logId: "",
    entBy: "",
    confBy: "",
    aprUid1: "",
    aprUid2: "",
    aprUid3: "",
    aprUid4: "",
    aprUid5: "",
    rejctUid: "",
    reviseEst: "",
    estType: "",
    reviseUid: "",
    revReason: "",
    prjAssDt: "",
    estimatedYear: "",
    estimatedyear: "",
    lbRateYear: "",
    fundCost: "",
    secDepYear: "",
    peggingSchedule: [], // Added to store pegging schedule data
  });
  const [errors, setErrors] = useState({});
  const [isPeggingScheduleFilled, setIsPeggingScheduleFilled] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  // Fetch estimates when entering Edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchEstimates = async () => {
        try {
          const response = await fetch(`${baseUrl}/SPS/api/pcesthtt/estimateNos`);
          if (!response.ok) {
            throw new Error(`Failed to fetch estimates: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setEstimates(data);
        } catch (error) {
          console.error("Failed to fetch estimates:", error.message);
          alert(`Failed to load estimates: ${error.message}`);
          setEstimates([]);
        }
      };
      fetchEstimates();
    }
  }, [isEditMode, baseUrl]);

  const handleFormDataChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleEstimateSelect = async (estimateNo) => {
    try {
      const encodedEstimateNo = encodeURIComponent(estimateNo);
      const response = await fetch(`${baseUrl}/SPS/api/pcesthtt/${encodedEstimateNo}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch estimate details: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        estimateNo: data.id.estimateNo,
        revNo: String(data.id.revNo),
        deptId: data.id.deptId,
        costCenter: data.projectNo || "",
        estimateDt: data.etimateDt || "",
        descr: data.descr || "",
        rejectReason: data.rejectReason || "",
        esName: data.clientNm || "",
        fileRef: data.fileRef || "",
        warehouse: data.warehouse || "",
        catCd: data.catCd || "",
        stdCost: data.stdCost ? String(data.stdCost) : "",
        omsRefNo: data.omsRefNo || "",
        fundSource: data.fundSource || "",
        fundId: data.fundId || "",
        pivDate: data.pivDate || "",
        pivNumber: data.pivNumber || "",
        pivAmount: data.pivAmount ? String(data.pivAmount) : "",
        custContrib: data.custContrib ? String(data.custContrib) : "",
        partialPmt: data.partialPmt || "N",
        partPcnt: data.partPcnt ? String(data.partPcnt) : "",
        partialAmt: data.partialAmt ? String(data.partialAmt) : "",
        taxPcnt: data.taxPcnt ? String(data.taxPcnt) : "",
        taxAmt: data.taxAmt ? String(data.taxAmt) : "",
        subCont: data.subCont || "",
        contNo: data.contNo || "",
        supCd: data.supCd || "",
        tmplId: data.tmplId || "",
        label1: data.label1 || "",
        label2: data.label2 || "",
        label3: data.label3 || "",
        label4: data.label4 || "",
        label5: data.label5 || "",
        label6: data.label6 || "",
        label7: data.label7 || "",
        label8: data.label8 || "",
        label9: data.label9 || "",
        label10: data.label10 || "",
        actualUnits: data.actualUnits ? String(data.actualUnits) : "",
        controlled: data.controlled || "",
        priority: data.priority || false,
        paidAmt: data.paidAmt ? String(data.paidAmt) : "",
        allocPaid: data.allocPaid ? String(data.allocPaid) : "",
        fundContrib: data.fundContrib ? String(data.fundContrib) : "",
        settledAmt: data.settledAmt ? String(data.settledAmt) : "",
        allocSettle: data.allocSettle ? String(data.allocSettle) : "",
        normDefault: data.normDefault || false,
        status: data.status ? String(data.status) : "0",
        logId: data.logId ? String(data.logId) : "",
        entBy: data.entBy || "",
        entDt: data.entDt || new Date().toISOString().split("T")[0],
        confBy: data.confBy || "",
        confDt: data.confDt || new Date().toISOString().split("T")[0],
        aprUid1: data.aprUid1 || "",
        aprDt1: data.aprDt1 || new Date().toISOString().split("T")[0],
        aprUid2: data.aprUid2 || "",
        aprDt2: data.aprDt2 || new Date().toISOString().split("T")[0],
        aprUid3: data.aprUid3 || "",
        aprDt3: data.aprDt3 || new Date().toISOString().split("T")[0],
        aprUid4: data.aprUid4 || "",
        aprDt4: data.aprDt4 || new Date().toISOString().split("T")[0],
        aprUid5: data.aprUid5 || "",
        aprDt5: data.aprDt5 || new Date().toISOString().split("T")[0],
        rejctUid: data.rejctUid || "",
        rejctDt: data.rejctDt || new Date().toISOString().split("T")[0],
        reviseEst: data.reviseEst ? String(data.reviseEst) : "",
        estType: data.estType || "",
        reviseUid: data.reviseUid || "",
        reviseDt: data.reviseDt || new Date().toISOString().split("T")[0],
        revReason: data.revReason || "",
        prjAssDt: data.prjAssDt || "",
        estimatedYear: data.estimatedYear || "",
        estimatedyear: data.estimatedyear || "",
        lbRateYear: data.lbRateYear || "",
        fundCost: data.fundCost ? String(data.fundCost) : "",
        secDepYear: data.secDepYear || "",
        peggingSchedule: data.peggingSchedule ? JSON.parse(data.peggingSchedule) : [],
      }));
      setIsPeggingScheduleFilled(!!data.peggingSchedule); // Mark as filled if data exists
    } catch (error) {
      console.error("Failed to fetch estimate details:", error.message);
      alert(`Failed to load estimate details: ${error.message}`);
    }
  };

  const validateForm = useCallback(
    (step) => {
      let isValid = true;
      let newErrors = {};

      const validationRules = {
        0: [
          { field: "estimateNo", message: "Estimate Number is required" },
          { field: "costCenter", message: "Cost Center is required" },
          { field: "estimateDt", message: "Estimate Date is required" },
          { field: "fileRef", message: "File Reference is required" },
        ],
        1: [
          { field: "stdCost", message: "Standard Cost is required" },
          { field: "pivDate", message: "PIV Date is required" },
          { field: "pivNumber", message: "PIV Number is required" },
          { field: "pivAmount", message: "PIV Amount is required" },
        ],
        2: [],
      };

      (validationRules[step] || []).forEach((rule) => {
        const value = formData[rule.field];
        if (!value || value.trim() === "") {
          newErrors[rule.field] = rule.message;
          isValid = false;
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));
      return isValid;
    },
    [formData]
  );

  const createEstimate = async (formData) => {
    const payload = {
      id: {
        estimateNo: formData.estimateNo,
        revNo: parseInt(formData.revNo),
        deptId: formData.deptId,
      },
      projectNo: formData.costCenter || null,
      catCd: formData.catCd || null,
      partialPmt: formData.partialPmt || "N",
      partPcnt: formData.partPcnt ? parseInt(formData.partPcnt) : null,
      partialAmt: formData.partialAmt ? parseInt(formData.partialAmt) : null,
      taxPcnt: formData.taxPcnt ? parseInt(formData.taxPcnt) : null,
      taxAmt: formData.taxAmt ? parseInt(formData.taxAmt) : null,
      subCont: formData.subCont || null,
      contNo: formData.contNo || null,
      supCd: formData.supCd || null,
      tmplId: formData.tmplId || null,
      label1: formData.label1 || null,
      label2: formData.label2 || null,
      label3: formData.label3 || null,
      label4: formData.label4 || null,
      label5: formData.label5 || null,
      label6: formData.label6 || null,
      label7: formData.label7 || null,
      label8: formData.label8 || null,
      label9: formData.label9 || null,
      label10: formData.label10 || null,
      etimateDt: formData.estimateDt || null,
      actualUnits: formData.actualUnits ? parseInt(formData.actualUnits) : null,
      fundSource: formData.fundSource || null,
      fundId: formData.fundId || null,
      stdCost: formData.stdCost ? parseInt(formData.stdCost) : null,
      controlled: formData.controlled || null,
      clientNm: formData.esName || null,
      priority: formData.priority || false,
      custContrib: formData.custContrib ? parseInt(formData.custContrib) : null,
      paidAmt: formData.paidAmt ? parseInt(formData.paidAmt) : null,
      allocPaid: formData.allocPaid ? parseInt(formData.allocPaid) : null,
      fundContrib: formData.fundContrib ? parseInt(formData.fundContrib) : null,
      settledAmt: formData.settledAmt ? parseInt(formData.settledAmt) : null,
      allocSettle: formData.allocSettle ? parseInt(formData.allocSettle) : null,
      normDefault: formData.normDefault || false,
      status: formData.status ? parseInt(formData.status) : 0,
      logId: formData.logId ? parseInt(formData.logId) : null,
      entBy: formData.entBy || null,
      entDt: formData.entDt || null,
      confBy: formData.confBy || null,
      confDt: formData.confDt || null,
      aprUid1: formData.aprUid1 || null,
      aprDt1: formData.aprDt1 || null,
      aprUid2: formData.aprUid2 || null,
      aprDt2: formData.aprDt2 || null,
      aprUid3: formData.aprUid3 || null,
      aprDt3: formData.aprDt3 || null,
      aprUid4: formData.aprUid4 || null,
      aprDt4: formData.aprDt4 || null,
      aprUid5: formData.aprUid5 || null,
      aprDt5: formData.aprDt5 || null,
      rejctUid: formData.rejctUid || null,
      rejctDt: formData.rejctDt || null,
      reviseEst: formData.reviseEst ? parseInt(formData.reviseEst) : null,
      estType: formData.estType || null,
      reviseUid: formData.reviseUid || null,
      reviseDt: formData.reviseDt || null,
      revReason: formData.revReason || null,
      descr: formData.descr || null,
      prjAssDt: formData.prjAssDt || null,
      rejectReason: formData.rejectReason || null,
      omsRefNo: formData.omsRefNo || null,
      estimatedYear: formData.estimatedYear || null,
      estimatedyear: formData.estimatedyear || null,
      lbRateYear: formData.lbRateYear || null,
      fundCost: formData.fundCost ? parseInt(formData.fundCost) : null,
      secDepYear: formData.secDepYear || null,
      peggingSchedule: formData.peggingSchedule ? JSON.stringify(formData.peggingSchedule) : null,
    };

    console.log("Sending payload to backend:", JSON.stringify(payload, null, 2));

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `${baseUrl}/SPS/api/pcesthtt/${encodeURIComponent(formData.estimateNo)}`
      : `${baseUrl}/SPS/api/pcesthtt`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  };

  const handleEdit = () => {
    setIsEditMode(true);
    alert("Edit mode activated. Please select an estimate to modify.");
  };

  const handleSubmit = async () => {
    const isValid = [0, 1].every((step) => validateForm(step));

    if (!isValid || !isPeggingScheduleFilled) {
      alert("Please fill in all required fields, including the Pegging Schedule, before submitting.");
      return;
    }

    try {
      const response = await createEstimate(formData);
      console.log(`${isEditMode ? "Estimate updated" : "Estimate created"} successfully:`, response);
      alert(`${isEditMode ? "Estimate updated" : "Estimate created"} successfully! Estimate Number: ${formData.estimateNo}`);

      // Reset form after submission
      setFormData({
        estimateNo: "",
        revNo: "1",
        deptId: "52010",
        costCenter: "",
        warehouse: "",
        estimateDt: "",
        divSec: "",
        district: "",
        area: "",
        esName: "",
        descr: "",
        rejectReason: "",
        eCSC: "",
        catCd: "",
        stdCost: "",
        omsRefNo: "",
        fileRef: "",
        fundSource: "",
        fundId: "",
        pivDate: "",
        pivNumber: "",
        pivAmount: "",
        custContrib: "",
        entDt: new Date().toISOString().split("T")[0],
        confDt: new Date().toISOString().split("T")[0],
        aprDt1: new Date().toISOString().split("T")[0],
        aprDt2: new Date().toISOString().split("T")[0],
        aprDt3: new Date().toISOString().split("T")[0],
        heatingDt: new Date().toISOString().split("T")[0],
        aprDt4: new Date().toISOString().split("T")[0],
        aprDt5: new Date().toISOString().split("T")[0],
        rejctDt: new Date().toISOString().split("T")[0],
        reviseDt: new Date().toISOString().split("T")[0],
        partialPmt: "N",
        status: "0",
        partPcnt: "",
        partialAmt: "",
        taxPcnt: "",
        taxAmt: "",
        subCont: "",
        contNo: "",
        supCd: "",
        tmplId: "",
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        label7: "",
        label8: "",
        label9: "",
        label10: "",
        actualUnits: "",
        controlled: "",
        priority: false,
        paidAmt: "",
        allocPaid: "",
        fundContrib: "",
        settledAmt: "",
        allocSettle: "",
        normDefault: false,
        logId: "",
        entBy: "",
        confBy: "",
        aprUid1: "",
        aprUid2: "",
        aprUid3: "",
        aprUid4: "",
        aprUid5: "",
        rejctUid: "",
        reviseEst: "",
        estType: "",
        reviseUid: "",
        revReason: "",
        prjAssDt: "",
        estimatedYear: "",
        estimatedyear: "",
        lbRateYear: "",
        fundCost: "",
        secDepYear: "",
        peggingSchedule: [],
      });
      setActiveTab(0);
      setCompletedTabs([false, false, false]);
      setErrors({});
      setIsPeggingScheduleFilled(false);
      setIsEditMode(false);
      setEstimates([]);
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} estimate:`, error);
      alert(`Failed to ${isEditMode ? "update" : "create"} estimate: ${error.message}. Check console for details.`);
    }
  };

  const handleNext = () => {
    if (validateForm(activeTab)) {
      setActiveTab((prev) => prev + 1);
      setCompletedTabs((prev) => {
        const newTabs = [...prev];
        newTabs[activeTab] = true;
        return newTabs;
      });
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handlePeggingScheduleInteraction = () => {
    setIsPeggingScheduleFilled(true);
  };

  const tabs = [
    {
      name: "General Information",
      content: (
        <div>
          <CardEstimatePage1
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
            onNext={handleNext}
            isEditMode={isEditMode}
            estimates={estimates}
            onEstimateSelect={handleEstimateSelect}
          />
        </div>
      ),
    },
    {
      name: "Cost & Measurement",
      content: (
        <CardEstimatePage2
          formData={formData}
          onChange={handleFormDataChange}
          errors={errors}
          onBack={handleBack}
          onNext={handleNext}
          isEditMode={isEditMode}
        />
      ),
    },
    {
      name: "Pegging Schedule",
      content: (
        <CardEstimatePage3
          formData={formData}
          errors={errors}
          onBack={handleBack}
          onSubmit={handleSubmit}
          onInteraction={handlePeggingScheduleInteraction}
          isEditMode={isEditMode}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl px-12 mt-6">
        <div className="relative flex flex-col w-full min-w-0 p-1 mb-6 break-words bg-white rounded shadow-lg">
          {/* Progress steps */}
          <div className="relative flex items-center justify-between w-full mt-4 mb-4">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center flex-1"
              >
                {index > 0 && (
                  <div
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 h-1 w-full ${
                      completedTabs[index - 1] ? "bg-emerald-400" : "bg-gray-300"
                    }`}
                    style={{ zIndex: -1 }}
                  ></div>
                )}
                <div
                  className="flex items-center justify-center w-10 h-10 transition-all border-2 rounded-full "
                  style={{
                    backgroundColor:
                      index < activeTab
                        ? "#34d399"
                        : index === activeTab
                        ? "#ffd800"
                        : "transparent",
                    borderColor:
                      index < activeTab
                        ? "#34d399"
                        : index === activeTab
                        ? "#ffd800"
                        : "#d1d5db",
                    color:
                      index < activeTab || index === activeTab
                        ? "white"
                        : "black",
                  }}
                  onClick={() => {
                    if (index < activeTab || completedTabs[index - 1] || index === 0) {
                      setActiveTab(index);
                    }
                  }}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm text-center">{tab.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-2 text-center">
            <h6 className="text-sm font-bold text-blueGray-700">
              {tabs[activeTab].name}
            </h6>
          </div>

          {/* Form content */}
          <div className="ml-0 bg-blueGray-100">
            <div className="pt-2 rounded">{tabs[activeTab].content}</div>
          </div>

          {/* Bottom navigation bar */}
          <div className="flex justify-between px-12 py-2 mb-0 bg-white rounded-t">
            <div>
              <button
                onClick={handleEdit}
                className="px-6 py-2 mt-2 mb-2 ml-3 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                style={{ backgroundColor: "#7c0000" }}
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-end ml-4">
              {activeTab > 0 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 mr-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 hover:shadow-md focus:outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              {activeTab < tabs.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 mt-2 mb-2 mr-4 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 active:bg-emerald-600 hover:shadow-md focus:outline-none"
                  style={{ backgroundColor: "#7c0000" }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-sm text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-400 hover:shadow-md focus:outline-none"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstimateForm;