import React, { useState, useEffect } from "react";
import "./TreeView.css";

const TreeNode = ({ node, onSelect }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    } else {
      onSelect(node);
    }
  };

  return (
    <li className={hasChildren ? (expanded ? "expanded" : "") : "file"}>
      <span onClick={handleClick}>{node.description}</span>
      {hasChildren && (
        <ul style={{ display: expanded ? "block" : "none" }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.sectionTypeId}
              node={child}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/spnormsgroup")
      .then((res) => res.json())
      .then((data) => setTreeData(buildTree(data)))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const buildTree = (data) => {
    const map = new Map();
    const roots = [];
    data.forEach((item) =>
      map.set(item.sectionTypeId, { ...item, children: [] })
    );
    data.forEach((item) => {
      if (item.lineParentId) {
        const parent = map.get(item.lineParentId);
        if (parent) parent.children.push(map.get(item.sectionTypeId));
      } else {
        roots.push(map.get(item.sectionTypeId));
      }
    });
    return roots;
  };

  const handleSelect = (node) => {
    setSelectedNode(node);
    fetch(
      `http://localhost:8081/api/standard-rates-by-parent?lineParentId=${node.sectionTypeId}`
    )
      .then((res) => res.json())
      .then((data) => setTableData(data))
      .catch((err) => console.error("table fetch error:", err));
  };

  const handleCheckboxChange = (item, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((i) => i.lineSectionTypeId !== item.lineSectionTypeId)
      );
    }
  };

  const getTotalCost = () => {
    return selectedItems.reduce(
      (sum, item) => sum + parseFloat(item.standardCost || 0),
      0
    );
  };

  return (
    <div
      className="tree-table-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div className="tree-container">
        <ul className="tree">
          {treeData.map((node) => (
            <TreeNode
              key={node.sectionTypeId}
              node={node}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </div>

      <div className="table-container">
        {selectedNode && (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th />
                  <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
                    Line ID
                  </th>
                  <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
                    UOM
                  </th>
                  <th style={{ fontWeight: "bold", paddingRight: "30px" }}>
                    Description
                  </th>
                  <th style={{ fontWeight: "bold" }}>
                    Standard Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => {
                  const isSelected = selectedItems.some(
                    (item) => item.lineSectionTypeId === row.lineSectionTypeId
                  );
                  return (
                    <tr key={idx}>
                      <td style={{ paddingRight: "20px" }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) =>
                            handleCheckboxChange(row, e.target.checked)
                          }
                        />
                      </td>
                      <td style={{ paddingRight: "20px" }}>
                        {row.lineSectionTypeId}
                      </td>
                      <td style={{ paddingRight: "20px" }}>{row.uom}</td>
                      <td style={{ paddingRight: "20px" }}>
                        {row.description}
                      </td>
                      <td>{row.standardCost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {selectedItems.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h4 style={{ fontWeight: "bold" }}>Selected Items</h4>

                <div style={{ paddingLeft: '40px' }}>
                <table border="1">
                  <thead>
                    <tr>
                      <th style={{ paddingRight: "30px" }}>Line ID</th>
                      <th style={{ paddingRight: "30px" }}>UOM</th>
                      <th style={{ paddingRight: "30px" }}>Description</th>
                      <th>Standard Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ paddingRight: "20px" }}>
                          {item.lineSectionTypeId}
                        </td>
                        <td style={{ paddingRight: "20px" }}>
                          {item.uom}
                        </td>
                        <td style={{ paddingRight: "20px" }}>
                          {item.description}
                        </td>
                        <td>{item.standardCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                  Total Cost: {getTotalCost().toFixed(2)}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TreeView;
