// Written with the help of an AI agent

import React, { useState, useRef, useEffect } from "react";

// --- Recursive Tree Node Component ---
function TreeNodeVisual({ node, registerNodePosition, id = "root" }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      registerNodePosition(id, rect);
    }
  });

  if (!node) {
    return <div style={{ width: "32px", visibility: "hidden" }} />;
  }

  // Determine background color based on node state
  let nodeColor = "#4A90E2"; // Default Blue
  if (node.isHighlighted) {
    nodeColor = "#00ffff"; // Completed Cyan
  } else if (node.isNew) {
    nodeColor = "#2ecc71"; // Active Insertion Green
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 8px" }}>
      {/* Node Circle */}
      <div 
        ref={nodeRef}
        id={id}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: nodeColor,
          color: node.isHighlighted ? "#333" : "white", // Dark text on cyan for readability
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "12px",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          zIndex: 2
        }}
      >
        {node.value}
      </div>

      {/* Children Rows */}
      {(node.left || node.right) && (
        <div style={{ display: "flex", marginTop: "25px" }}>
          <TreeNodeVisual 
            node={node.left} 
            registerNodePosition={registerNodePosition} 
            id={`${id}-l`} 
          />
          <TreeNodeVisual 
            node={node.right} 
            registerNodePosition={registerNodePosition} 
            id={`${id}-r`} 
          />
        </div>
      )}
    </div>
  );
}

// --- Main Visualizer Component ---
export default function BinaryTreeSorter() {
  const [unsortedPool, setUnsortedPool] = useState([]);
  const [treeRoot, setTreeRoot] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [statusText, setStatusText] = useState("Ready");
  const [lines, setLines] = useState([]); 
  const [maxNodes, setMaxNodes] = useState(20);
  
  const currentIndexRef = useRef(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const nodePositionsRef = useRef({});

  // Detect device screen width on mount & resize
  useEffect(() => {
    const handleDeviceDetection = () => {
      if (window.innerWidth < 768) {
        setMaxNodes(8);
      } else {
        setMaxNodes(20);
      }
    };
    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);
    return () => window.removeEventListener("resize", handleDeviceDetection);
  }, []);

  // Tracks exact pixel positions of nodes relative to viewport
  const registerNodePosition = (id, rect) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    nodePositionsRef.current[id] = {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  };

  // Traverses tree to calculate line coordinates
  const updateLines = (node, id = "root") => {
    const newLines = [];
    const traverse = (currentNode, currentId) => {
      if (!currentNode) return;
      const parentPos = nodePositionsRef.current[currentId];
      if (!parentPos) return;

      if (currentNode.left) {
        const leftId = `${currentId}-l`;
        const childPos = nodePositionsRef.current[leftId];
        if (childPos) newLines.push({ x1: parentPos.x, y1: parentPos.y, x2: childPos.x, y2: childPos.y });
        traverse(currentNode.left, leftId);
      }
      if (currentNode.right) {
        const rightId = `${currentId}-r`;
        const childPos = nodePositionsRef.current[rightId];
        if (childPos) newLines.push({ x1: parentPos.x, y1: parentPos.y, x2: childPos.x, y2: childPos.y });
        traverse(currentNode.right, rightId);
      }
    };
    traverse(node, id);
    setLines(newLines);
  };

  useEffect(() => {
    if (treeRoot) {
      const timeout = setTimeout(() => updateLines(treeRoot), 50);
      return () => clearTimeout(timeout);
    } else {
      setLines([]);
    }
  }, [treeRoot]);

  // Generate Random Unique Values
  const generateRandomNumbers = () => {
    clearInterval(timerRef.current);
    setIsSorting(false);
    // setStatusText("Ready");
    setStatusText("Ready");
    currentIndexRef.current = 0;
    nodePositionsRef.current = {};
    setLines([]);
    setTreeRoot(null);
    console.log(isSorting, statusText);

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < maxNodes) {
      uniqueNumbers.add(Math.floor(Math.random() * 100) + 1);
    }
    setUnsortedPool(Array.from(uniqueNumbers));
  };

  // Immutable Tree Insertion Core
  const insertNode = (root, value) => {
    const clearHighlight = (node) => {
      if (!node) return null;
      return {
        ...node,
        isNew: false,
        left: clearHighlight(node.left),
        right: clearHighlight(node.right)
      };
    };

    const cleanedRoot = clearHighlight(root);

    const recursiveInsert = (node, val) => {
      if (!node) return { value: val, left: null, right: null, isNew: true, isHighlighted: false };
      if (val < node.value) {
        node.left = recursiveInsert(node.left, val);
      } else {
        node.right = recursiveInsert(node.right, val);
      }
      return node;
    };

    return recursiveInsert(cleanedRoot, value);
  };

  // Traverses tree in-order to change target node highlight status
  const highlightNodeWithValue = (root, targetValue) => {
    if (!root) return null;
    
    // Deep clone paths while flipping the flag when matching value is found
    return {
      ...root,
      isHighlighted: root.value === targetValue ? true : root.isHighlighted,
      left: highlightNodeWithValue(root.left, targetValue),
      right: highlightNodeWithValue(root.right, targetValue)
    };
  };

  // 1. Gathers sorted values via In-Order Traversal (Left -> Root -> Right)
  const getInOrderValues = (node) => {
    const values = [];
    const traverse = (n) => {
      if (!n) return;
      traverse(n.left);
      values.push(n.value);
      traverse(n.right);
    };
    traverse(node);
    return values;
  };

  // 2. Triggers final ordered coloring sequence loop
  const triggerCompletionAnimation = (finalTree) => {
    setStatusText("Finalizing Sorted Tree...");
    const sortedValues = getInOrderValues(finalTree);
    let currentHighlightIdx = 0;

    timerRef.current = setInterval(() => {
      if (currentHighlightIdx >= sortedValues.length) {
        clearInterval(timerRef.current);
        setIsSorting(false);
        setStatusText("Complete!");
        return;
      }

      const valueToHighlight = sortedValues[currentHighlightIdx];
      setTreeRoot((prevTree) => highlightNodeWithValue(prevTree, valueToHighlight));
      currentHighlightIdx++;
    }, 300); // Transitions to Cyan rapidly (every 300ms)
  };

  // Loop Animation Step Dispatcher
  const startSorting = () => {
    if (unsortedPool.length === 0 || isSorting) return;
    setIsSorting(true);
    setStatusText("Building Tree...");

    timerRef.current = setInterval(() => {
      const idx = currentIndexRef.current;
      
      if (idx >= unsortedPool.length) {
        clearInterval(timerRef.current);
        
        // Pass the updated tree state directly into the next animation chain
        setTreeRoot((currentRoot) => {
          triggerCompletionAnimation(currentRoot);
          return currentRoot;
        });
        return;
      }

      const nextValue = unsortedPool[idx];
      setTreeRoot((prevRoot) => insertNode(prevRoot, nextValue));
      currentIndexRef.current += 1;
    }, 700);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ padding: "15px", fontFamily: "sans-serif", textAlign: "center", maxWidth: "100%", boxSizing: "border-box" }}>
      <h2>Responsive BST Sort Visualizer</h2>
      <h3>NOTE: Written with the help of an AI agent</h3>
      <h3>NOTE2: after you run it once, you will have to refresh the page to get it to run again</h3>
      <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
        Target Node Count: <strong>{maxNodes}</strong> {maxNodes === 8 ? "(Mobile Mode)" : "(Desktop Mode)"}
      </p>
      <p style={{ fontSize: "15px", fontWeight: "bold", color: statusText === "Complete!" ? "#2ecc71" : "#e67e22" }}>
        Status: {statusText}
      </p>

      {/* Control Configuration Panel */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button 
          onClick={generateRandomNumbers} 
          disabled={isSorting && statusText !== "Ready"}
          style={{ padding: "10px 14px", cursor: "pointer", fontWeight: "bold", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
        >
          Generate Numbers
        </button>
        <button 
          onClick={startSorting} 
          disabled={isSorting || unsortedPool.length === 0}
          style={{ 
            padding: "10px 14px", 
            fontWeight: "bold",
            cursor: isSorting || unsortedPool.length === 0 ? "not-allowed" : "pointer",
            backgroundColor: isSorting || unsortedPool.length === 0 ? "#95a5a6" : "#2ecc71", 
            color: "white", 
            border: "none", 
            borderRadius: "4px"
          }}
        >
          {isSorting ? "Processing..." : "Begin Sorting"}
        </button>
      </div>

      {/* Numerical Values Queue */}
      <div style={{ marginBottom: "25px", minHeight: "40px" }}>
        <strong style={{ fontSize: "14px" }}>Pool Remaining:</strong>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
          {unsortedPool.map((num, i) => (
            <span key={i} style={{
              padding: "4px 8px",
              fontSize: "12px",
              backgroundColor: i >= currentIndexRef.current ? "#eee" : "#2ecc71",
              color: i >= currentIndexRef.current ? "#333" : "white",
              borderRadius: "4px",
              textDecoration: i < currentIndexRef.current ? "line-through" : "none",
              transition: "all 0.3s ease"
            }}>
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Simulation Viewport Canvas */}
      <div 
        ref={containerRef}
        style={{ 
          position: "relative",
          display: "flex", 
          justifyContent: "center", 
          overflowX: "auto", 
          WebkitOverflowScrolling: "touch", 
          padding: "30px 10px", 
          border: "1px solid #ddd", 
          borderRadius: "8px",
          minHeight: "420px",
          backgroundColor: "#fcfcfc"
        }}
      >
        <svg style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}>
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#bdc3c7"
              strokeWidth="2"
              strokeDasharray="4,3"
              style={{ transition: "all 0.2s" }}
            />
          ))}
        </svg>

        {treeRoot ? (
          <TreeNodeVisual node={treeRoot} registerNodePosition={registerNodePosition} />
        ) : (
          <p style={{ color: "#aaa", marginTop: "140px", fontSize: "14px" }}>
            Click "Generate Numbers" to populate the pool queue.
          </p>
        )}
      </div>
    </div>
  );
}
