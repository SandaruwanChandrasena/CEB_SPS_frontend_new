import React, { useState, useEffect, useRef} from "react";
import _ from "lodash";

// Disable session check for development
const disableSessionCheck = true;
const TreeNode = ({ node, onNodeClick, parentName, grandParentName }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleNodeClick = () => {
    if (!hasChildren) {
      onNodeClick(node.id, node.name, parentName, grandParentName);
    }
  };

  return (
    <li className={`tree-node ${expanded ? "expanded" : ""} ${hasChildren ? "folder" : "file"}`}>
      <span
        onClick={() => {
          if (hasChildren) {
            setExpanded(!expanded);
          } else {
            handleNodeClick();
          }
        }}
        className={`cursor-pointer text-blueGray-submitted600 hover:text-lightBlue-500 ${hasChildren ? "font-bold" : ""}`}
      >
        {hasChildren && (
          <i className={`fas fa-${expanded ? "minus" : "plus"}-square mr-2`}></i>
        )}
        {node.name}
      </span>
      {hasChildren && expanded && (
        <ul className="pl-6 mt-2">
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              onNodeClick={onNodeClick}
              parentName={node.name}
              grandParentName={parentName}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ onInteraction, onAddEstimate }) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNodeName, setSelectedNodeName] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [showTableButton, setShowTableButton] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [parentName, setParentName] = useState(null);
  const [grandParentName, setGrandParentName] = useState(null);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

useEffect(() => {
  const fetchData = async () => {
    try {
      const username = "user";
      const password = "admin123";
      const response = await fetch(`${baseUrl}/api/sppeg`, {
        method: "GET",
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password), // 🔑 Basic Auth
          "Content-Type": "application/json",
        },
        credentials: "omit", 
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tree data: " + response.statusText);
      }
      const data = await response.json();
      const filteredData = data.filter((item) => item.deptId === "4");
      const tree = buildTree(filteredData);
      setTreeData(tree);
      setLoading(false);
      if (onInteraction) onInteraction();
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };
  fetchData();
}, [onInteraction, baseUrl]);


  const buildTree = (data) => {
    const nodeMap = new Map();
    data.forEach((item) => {
      nodeMap.set(item.id, {
        id: item.id,
        name: item.name,
        parentId: item.parentId,
        children: [],
      });
    });

    const tree = [];
    nodeMap.forEach((node) => {
      if (node.parentId === "1") {
        tree.push(node);
      } else if (nodeMap.has(node.parentId)) {
        nodeMap.get(node.parentId).children.push(node);
      }
    });

    return tree;
  };

  const fetchTableData = async (lineSectionTypeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/api/spPeggingDmt/lineSectionType/${lineSectionTypeId}`,
        {
          method: "GET",
          headers: {
            "Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          credentials: disableSessionCheck ? "omit" : "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch table data: ${response.statusText}`);
      }

      const data = await response.json();
      const processedData = data.map((item) => ({
        resType: item.resType,
        resCd: item.id?.resCd || item.resCd,
        resName: item.resName,
        estimateQty: item.estimateQty,
        uom: item.uom,
      }));

      setTableData(processedData);
      setLoading(false);
    } catch (err) {
      console.error("Table fetch error:", err);
      setTableData([]);
      setLoading(false);
    }
  };

  const handleNodeClick = (lineSectionTypeId, nodeName, parent, grandParent) => {
    setTableData([]);
    setIsTableVisible(false);
    setShowInputField(false);
    setInputValue("");
    setSelectedNodeId(lineSectionTypeId);
    setSelectedNodeName(nodeName);
    setParentName(parent);
    setGrandParentName(grandParent);
    setShowTableButton(true);
    if (parent === "LINE POLE" && grandParent === "MATERIAL") {
      setShowInputField(true);
    } else {
      setShowInputField(false);
    }
  };

  // const handleShowTable = useCallback(
  //   _.debounce((event) => {
  //     event.preventDefault();
  //     if (tableData.length === 0) {
  //       fetchTableData(selectedNodeId);
  //     }
  //     setIsTableVisible(true);
  //   }, 300),
  //   [selectedNodeId, tableData]
  // );
const debouncedShowTable = useRef(
  _.debounce((event, selectedNodeId, tableData) => {
    event.preventDefault();
    if (tableData.length === 0) {
      fetchTableData(selectedNodeId);
    }
    setIsTableVisible(true);
  }, 300)
).current;
const handleShowTable = (event) => {
  debouncedShowTable(event, selectedNodeId, tableData);
};

  const handleAddOption = async () => {
    if (inputValue.trim() && parentName === "LINE POLE" && grandParentName === "MATERIAL") {
      try {
        const response = await fetch(`${baseUrl}/api/pcestdtt/add-for-node`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:3000",
          },
          credentials: disableSessionCheck ? "omit" : "include",
          body: JSON.stringify({
            resCd: selectedNodeId,
            deptId: "4",
            inputValue: inputValue,
            estimateNo: "DEFAULT_EST",
            revNo: "1",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save to backend");
        }

        const savedData = await response.json();
        const newEstimate = {
          resCd: savedData.resCd,
          resType: savedData.resType || "LINE_POLE",
          uom: savedData.uom || "UNIT",
          unitPrice: savedData.unitPrice || "0",
          estimateQty: savedData.estimateQty || inputValue,
          estimateCost: savedData.estimateCost || "0",
          returnedQty: savedData.returnedQty || "0",
          returnedCost: savedData.returnedCost || "0",
          approvedQty: savedData.approvedQty || "0",
          damageQty: savedData.damageQty || "0",
          estimateNo: savedData.estimateNo || "DEFAULT_EST",
          revNo: savedData.revNo || "1",
          deptId: savedData.deptId || "4",
        };

        onAddEstimate(newEstimate);
        setInputValue("");
        console.log(`Added option for ${selectedNodeName}: ${inputValue}`);
      } catch (err) {
        console.error("Error saving to backend:", err);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="tree-table-wrapper">
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md tree-container">
        <h2 className="mb-4 text-xl font-bold">Material List</h2>
        <ul className="list-none tree">
          {treeData.map((node, index) => (
            <TreeNode
              key={index}
              node={node}
              onNodeClick={handleNodeClick}
              parentName={null}
              grandParentName={null}
            />
          ))}
        </ul>
      </div>

      {showTableButton && selectedNodeName && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-bold">View Details {selectedNodeName}</h3>
          <button
            type="button"
            onClick={handleShowTable}
            disabled={loading}
            className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#7c0000" }}
          >
            Click
          </button>
        </div>
      )}

      {showInputField && selectedNodeName && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-2 text-lg font-bold">Add for {selectedNodeName}</h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              style={{ backgroundColor: "#7c0000" }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {isTableVisible && tableData.length > 0 && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md table-container">
          <h3 className="mb-2 text-lg font-bold">Details for {selectedNodeName}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-3 py-2 border border-gray-300">Res Type</th>
                  <th className="px-3 py-2 border border-gray-300">Res CD</th>
                  <th className="px-3 py-2 border border-gray-300">Res Name</th>
                  <th className="px-3 py-2 border border-gray-300">Estimated Quantity</th>
                  <th className="px-3 py-2 border border-gray-300">UOM</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-3 py-2 border border-gray-300">{row.resType}</td>
                    <td className="px-3 py-2 border border-gray-300">{row.resCd}</td>
                    <td className="px-3 py-2 border border-gray-300">{row.resName}</td>
                    <td className="px-3 py-2 border border-gray-300">{row.estimateQty}</td>
                    <td className="px-3 py-2 border border-gray-300">{row.uom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isTableVisible && tableData.length === 0 && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
          <p>No data available for {selectedNodeName}</p>
        </div>
      )}
    </div>
  );
};

export default TreeView;