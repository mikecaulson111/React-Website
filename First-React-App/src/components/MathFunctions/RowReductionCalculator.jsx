import { useState } from "react";

// ---------- linear algebra helpers ----------

function createMatrix(rows, cols, fill = "") {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
}

function cloneMatrix(m) {
  return m.map((row) => row.slice());
}

// Reduced row echelon form via Gauss-Jordan elimination with partial pivoting.
function rref(matrix) {
  const m = cloneMatrix(matrix);
  const rows = m.length;
  const cols = m[0].length;
  let lead = 0;

  for (let r = 0; r < rows; r++) {
    if (lead >= cols) break;

    let i = r;
    while (Math.abs(m[i][lead]) < 1e-9) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols) return m;
      }
    }

    const tmp = m[i];
    m[i] = m[r];
    m[r] = tmp;

    const lv = m[r][lead];
    for (let j = 0; j < cols; j++) m[r][j] /= lv;

    for (let i2 = 0; i2 < rows; i2++) {
      if (i2 === r) continue;
      const factor = m[i2][lead];
      if (factor !== 0) {
        for (let j = 0; j < cols; j++) m[i2][j] -= factor * m[r][j];
      }
    }
    lead++;
  }
  return m;
}

function formatNum(x) {
  if (Math.abs(x) < 1e-9) x = 0;
  const rounded = Math.round(x * 10000) / 10000;
  if (Number.isInteger(rounded)) return rounded.toString();
  return rounded.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

// ---------- matrix input grid ----------

function MatrixGrid({ matrix, onChange, rows, cols, augmented }) {
  return (
    <div className="bracket-wrap">
      <div className="bracket bracket-left" />
      <div
        className="grid-inputs"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              inputMode="decimal"
              value={val}
              onChange={(e) => onChange(i, j, e.target.value)}
              className={`cell-input ${augmented && j === cols - 1 && cols > 1 ? "aug-col" : ""}`}
            />
          ))
        )}
      </div>
      <div className="bracket bracket-right" />
    </div>
  );
}

function MatrixDisplay({ matrix, rows, cols, augmented }) {
  return (
    <div className="bracket-wrap">
      <div className="bracket bracket-left result-bracket" />
      <div
        className="grid-inputs result-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell-result ${augmented && j === cols - 1 && cols > 1 ? "aug-col" : ""}`}
            >
              {formatNum(val)}
            </div>
          ))
        )}
      </div>
      <div className="bracket bracket-right result-bracket" />
    </div>
  );
}

// ---------- main component ----------

export default function RowReductionCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [augmented, setAugmented] = useState(true);
  const [matrix, setMatrix] = useState(createMatrix(3, 4, ""));
  const [result, setResult] = useState(null);

  function resize(newRows, newCols) {
    setRows(newRows);
    setCols(newCols);
    setMatrix(createMatrix(newRows, newCols, ""));
    setResult(null);
  }

  function updateCell(i, j, value) {
    setMatrix((prev) => {
      const next = cloneMatrix(prev);
      next[i][j] = value;
      return next;
    });
    setResult(null);
  }

  function toNumericMatrix(m) {
    return m.map((row) => row.map((v) => (v === "" || v === undefined ? 0 : parseFloat(v))));
  }

  function compute() {
    const numeric = toNumericMatrix(matrix);
    setResult(rref(numeric));
  }

  function reset() {
    setMatrix(createMatrix(rows, cols, ""));
    setResult(null);
  }

  return (
    <div className="rr-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .rr-root {
          --ink: #0f1a2b;
          --panel: #16233a;
          --panel-line: #223252;
          --paper-text: #eee9db;
          --muted: #8ea0bf;
          --brass: #c98a4b;
          --brass-soft: rgba(201, 138, 75, 0.18);
          --danger: #d97a6c;
          font-family: 'JetBrains Mono', monospace;
          background:
            linear-gradient(var(--panel-line) 1px, transparent 1px) 0 0 / 100% 28px,
            linear-gradient(90deg, var(--panel-line) 1px, transparent 1px) 0 0 / 28px 100%,
            var(--ink);
          background-blend-mode: overlay, overlay, normal;
          opacity: 0.98;
          color: var(--paper-text);
          padding: 40px 24px;
          border-radius: 4px;
          max-width: 900px;
          margin: 0 auto;
        }

        .rr-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .rr-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 32px;
          letter-spacing: 0.01em;
          margin: 0 0 8px 0;
          color: var(--paper-text);
        }

        .rr-title .accent {
          color: var(--brass);
          font-style: italic;
        }

        .rr-sub {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto;
        }

        .rr-sub code {
          color: var(--brass);
          font-weight: 500;
        }

        .controls-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin: 24px 0;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .control-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .size-btn {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          border: 1px solid var(--panel-line);
          background: var(--panel);
          color: var(--paper-text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .size-btn:hover {
          border-color: var(--brass);
          color: var(--brass);
        }

        .size-btn.active {
          background: var(--brass-soft);
          border-color: var(--brass);
          color: var(--brass);
        }

        .toggle-btn {
          display: flex;
          border-radius: 3px;
          overflow: hidden;
          border: 1px solid var(--panel-line);
        }

        .toggle-option {
          padding: 7px 14px;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          background: var(--panel);
          color: var(--muted);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .toggle-option.active {
          background: var(--brass-soft);
          color: var(--brass);
        }

        .matrix-row {
          display: flex;
          justify-content: center;
          margin-bottom: 26px;
        }

        .bracket-wrap {
          display: flex;
          align-items: stretch;
        }

        .bracket {
          width: 10px;
          border: 2px solid var(--muted);
        }

        .bracket-left {
          border-right: none;
          border-radius: 6px 0 0 6px;
        }

        .bracket-right {
          border-left: none;
          border-radius: 0 6px 6px 0;
        }

        .result-bracket {
          border-color: var(--brass);
        }

        .grid-inputs, .result-grid {
          display: grid;
          gap: 6px;
          padding: 10px 8px;
        }

        .cell-input {
          width: 52px;
          height: 36px;
          text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--panel-line);
          border-radius: 3px;
          color: var(--paper-text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          -moz-appearance: textfield;
        }

        .cell-input::-webkit-outer-spin-button,
        .cell-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .cell-input::placeholder {
          color: var(--muted);
          opacity: 0.5;
        }

        .cell-input:focus {
          outline: none;
          border-color: var(--brass);
          background: rgba(201, 138, 75, 0.08);
        }

        .cell-input.aug-col, .cell-result.aug-col {
          border-left: 2px solid var(--brass);
          margin-left: 6px;
        }

        .cell-result {
          width: 52px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--brass);
        }

        .action-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 12px 22px;
          border-radius: 3px;
          cursor: pointer;
          transition: transform 0.1s ease, opacity 0.15s ease;
        }

        .btn:active {
          transform: scale(0.97);
        }

        .btn-primary {
          background: var(--brass);
          border: 1px solid var(--brass);
          color: var(--ink);
          font-weight: 600;
        }

        .btn-primary:hover {
          opacity: 0.88;
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid var(--panel-line);
          color: var(--muted);
        }

        .btn-ghost:hover {
          border-color: var(--muted);
          color: var(--paper-text);
        }

        .result-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding-top: 12px;
          border-top: 1px dashed var(--panel-line);
        }

        .result-heading {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          color: var(--muted);
          text-align: center;
        }

        .result-heading .formula {
          color: var(--brass);
          font-family: 'JetBrains Mono', monospace;
          font-style: normal;
        }

        @media (max-width: 560px) {
          .cell-input, .cell-result {
            width: 38px;
            height: 32px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="rr-header">
        <h1 className="rr-title">
          Row <span className="accent">Reduction</span>
        </h1>
        <p className="rr-sub">
          Enter a matrix and reduce it to <code>RREF</code> — reduced row
          echelon form. Toggle "augmented" if the last column represents the
          constants of a linear system, to see it set off with a divider.
        </p>
      </div>

      <div className="controls-row">
        <div className="control-group">
          <span className="control-label">Rows</span>
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <button
              key={r}
              className={`size-btn ${r === rows ? "active" : ""}`}
              onClick={() => resize(r, cols)}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="control-group">
          <span className="control-label">Cols</span>
          {[2, 3, 4, 5, 6, 7, 8].map((c) => (
            <button
              key={c}
              className={`size-btn ${c === cols ? "active" : ""}`}
              onClick={() => resize(rows, c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="control-group">
          <span className="control-label">Augmented</span>
          <div className="toggle-btn">
            <div
              className={`toggle-option ${augmented ? "active" : ""}`}
              onClick={() => setAugmented(true)}
            >
              Yes
            </div>
            <div
              className={`toggle-option ${!augmented ? "active" : ""}`}
              onClick={() => setAugmented(false)}
            >
              No
            </div>
          </div>
        </div>
      </div>

      <div className="matrix-row">
        <MatrixGrid
          matrix={matrix}
          onChange={updateCell}
          rows={rows}
          cols={cols}
          augmented={augmented}
        />
      </div>

      <div className="action-row">
        <button className="btn btn-primary" onClick={compute}>
          Reduce
        </button>
        <button className="btn btn-ghost" onClick={reset}>
          Clear
        </button>
      </div>

      {result && (
        <div className="result-row">
          <div className="result-heading">
            reduced row echelon form &nbsp;
            <span className="formula">RREF</span>
          </div>
          <MatrixDisplay
            matrix={result}
            rows={rows}
            cols={cols}
            augmented={augmented}
          />
        </div>
      )}
    </div>
  );
}
