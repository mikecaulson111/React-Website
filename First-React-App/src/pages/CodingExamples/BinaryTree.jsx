// Written with the help of an AI agent
import React, { useState, useRef, useEffect } from "react";

// --- Recursive Tree Node Component ---
function TreeNodeVisual({ node, registerNodePosition, id = "root" }) {
  const nodeRef = useRef(null);

  // Measure the coordinates of this node after it renders
  useEffect(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      registerNodePosition(id, rect);
    }
  }); // Run on every render to adapt to window resizing

  if (!node) {
    // Invisible placeholder to keep structural symmetry
    return <div style={{ width: "35px", visibility: "hidden" }} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 10px" }}>
      {/* Node Circle */}
      <div 
        ref={nodeRef}
        id={id}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: node.isNew ? "#2ecc71" : "#4A90E2",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "12px",
          transition: "background-color 0.3s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          zIndex: 2 // Sits on top of the SVG lines
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
  const [lines, setLines] = useState([]); // Stores SVG line coordinates
  
  const currentIndexRef = useRef(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const nodePositionsRef = useRef({});

  // 1. Tracks exact pixel positions of nodes relative to the wrapper container
  const registerNodePosition = (id, rect) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Store center coordinates of the node
    nodePositionsRef.current[id] = {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  };

  // 2. Traverses the tree structure to calculate where lines should be drawn
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

  // Trigger a line recalculation right after React updates the DOM nodes
  useEffect(() => {
    if (treeRoot) {
      // Small timeout ensures DOM elements have calculated their bounding boxes
      const timeout = setTimeout(() => updateLines(treeRoot), 50);
      return () => clearTimeout(timeout);
    } else {
      setLines([]);
    }
  }, [treeRoot]);

  // Recalculate if window resizes
  useEffect(() => {
    const handleResize = () => treeRoot && updateLines(treeRoot);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [treeRoot]);

  // 3. Generate 20 Random Values
  const generateRandomNumbers = () => {
    clearInterval(timerRef.current);
    setIsSorting(false);
    currentIndexRef.current = 0;
    nodePositionsRef.current = {};
    setLines([]);
    setTreeRoot(null);

    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 20) {
      uniqueNumbers.add(Math.floor(Math.random() * 100) + 1);
    }
    setUnsortedPool(Array.from(uniqueNumbers));
  };

  // 4. Immutable Tree Insertion Logic
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
      if (!node) return { value: val, left: null, right: null, isNew: true };
      if (val < node.value) {
        node.left = recursiveInsert(node.left, val);
      } else {
        node.right = recursiveInsert(node.right, val);
      }
      return node;
    };

    return recursiveInsert(cleanedRoot, value);
  };

  // 5. Sorting Animation Step Function
  const startSorting = () => {
    if (unsortedPool.length === 0 || isSorting) return;
    setIsSorting(true);

    timerRef.current = setInterval(() => {
      const idx = currentIndexRef.current;
      
      if (idx >= unsortedPool.length) {
        clearInterval(timerRef.current);
        setIsSorting(false);
        return;
      }

      const nextValue = unsortedPool[idx];
      setTreeRoot((prevRoot) => insertNode(prevRoot, nextValue));
      currentIndexRef.current += 1;
    }, 700);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h2>Binary Search Tree Sort Visualizer</h2>
      <h3>NOTE: Written with the help of an AI agent</h3>

      {/* Control Panel */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={generateRandomNumbers} style={{ padding: "10px 15px", marginRight: "10px", cursor: "pointer" }}>
          Generate 20 Random Nodes
        </button>
        <button 
          onClick={startSorting} 
          disabled={isSorting || unsortedPool.length === 0}
          style={{ 
            padding: "10px 15px", 
            cursor: isSorting || unsortedPool.length === 0 ? "not-allowed" : "pointer",
            backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: "4px"
          }}
        >
          {isSorting ? "Sorting..." : "Begin Sorting"}
        </button>
      </div>

      {/* Array Pool */}
      <div style={{ marginBottom: "30px", minHeight: "40px" }}>
        <strong>Remaining to Sort:</strong>
        <div style={{ display: "flex", justifyContent: "center", gap: "5px", flexWrap: "wrap", marginTop: "5px" }}>
          {unsortedPool.map((num, i) => (
            <span key={i} style={{
              padding: "4px 8px",
              backgroundColor: i >= currentIndexRef.current ? "#eee" : "#2ecc71",
              color: i >= currentIndexRef.current ? "#333" : "white",
              borderRadius: "4px",
              textDecoration: i < currentIndexRef.current ? "line-through" : "none"
            }}>
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div 
        ref={containerRef}
        style={{ 
          position: "relative", // Crucial for positioning the SVG overlay lines
          display: "flex", 
          justifyContent: "center", 
          overflow: "auto", 
          padding: "4px", 
          border: "1px solid #ddd", 
          borderRadius: "8px",
          minHeight: "450px",
          backgroundColor: "#fefefe"
        }}
      >
        {/* SVG Overlay for Connection Lines */}
        <svg style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none" // Ensures users can still interact with elements underneath if needed
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
              strokeDasharray="4,4" // Makes the lines look sleek and dashed
              style={{ transition: "all 0.3s" }}
            />
          ))}
        </svg>

        {treeRoot ? (
          <TreeNodeVisual node={treeRoot} registerNodePosition={registerNodePosition} />
        ) : (
          <p style={{ color: "#aaa", marginTop: "150px" }}>Click "Generate" then "Begin Sorting" to see the connected tree.</p>
        )}
      </div>
    </div>
  );
}
