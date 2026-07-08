import { useState } from "react";

// ---------- linear algebra helpers ----------

function createMatrix(n, fill = 0) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => fill));
}

function cloneMatrix(m) {
  return m.map((row) => row.slice());
}

// Gauss-Jordan inversion with partial pivoting. Returns null if singular.
function invert(matrix) {
  const n = matrix.length;
  const aug = matrix.map((row, i) => [
    ...row.slice(),
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  for (let col = 0; col < n; col++) {
    let pivotRow = col;
    let maxVal = Math.abs(aug[col][col]);
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(aug[r][col]) > maxVal) {
        maxVal = Math.abs(aug[r][col]);
        pivotRow = r;
      }
    }
    if (maxVal < 1e-9) return null;
    if (pivotRow !== col) {
      const tmp = aug[col];
      aug[col] = aug[pivotRow];
      aug[pivotRow] = tmp;
    }
    const pivotVal = aug[col][col];
    for (let k = 0; k < 2 * n; k++) aug[col][k] /= pivotVal;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = aug[r][col];
      if (factor !== 0) {
        for (let k = 0; k < 2 * n; k++) {
          aug[r][k] -= factor * aug[col][k];
        }
      }
    }
  }
  return aug.map((row) => row.slice(n));
}

function multiplySquare(a, b, n) {
  const result = createMatrix(n, 0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) sum += a[i][k] * b[k][j];
      result[i][j] = sum;
    }
  }
  return result;
}

function formatNum(x) {
  if (Math.abs(x) < 1e-9) x = 0;
  const rounded = Math.round(x * 10000) / 10000;
  if (Number.isInteger(rounded)) return rounded.toString();
  return rounded.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

// ---------- matrix input grid ----------

function MatrixGrid({ label, symbol, matrix, onChange, n }) {
  return (
    <div className="matrix-panel">
      <div className="matrix-panel-label">
        {label} <span className="symbol">({symbol})</span>
      </div>
      <div className="bracket-wrap">
        <div className="bracket bracket-left" />
        <div
          className="grid-inputs"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
        >
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                inputMode="decimal"
                value={val}
                onChange={(e) => onChange(i, j, e.target.value)}
                className="cell-input"
              />
            ))
          )}
        </div>
        <div className="bracket bracket-right" />
      </div>
    </div>
  );
}

function MatrixDisplay({ label, symbol, matrix, n }) {
  return (
    <div className="matrix-panel">
      <div className="matrix-panel-label">
        {label} <span className="symbol">({symbol})</span>
      </div>
      <div className="bracket-wrap">
        <div className="bracket bracket-left result-bracket" />
        <div
          className="grid-inputs result-grid"
          style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
        >
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <div key={`${i}-${j}`} className="cell-result">
                {formatNum(val)}
              </div>
            ))
          )}
        </div>
        <div className="bracket bracket-right result-bracket" />
      </div>
    </div>
  );
}

// ---------- main component ----------

export default function ChangeOfBasisCalculator() {
  const [n, setN] = useState(3);
  const [beta, setBeta] = useState(createMatrix(3, ""));
  const [gamma, setGamma] = useState(createMatrix(3, ""));
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function resize(newN) {
    setN(newN);
    setBeta(createMatrix(newN, ""));
    setGamma(createMatrix(newN, ""));
    setResult(null);
    setError("");
  }

  function updateCell(setter) {
    return (i, j, value) => {
      setter((prev) => {
        const next = cloneMatrix(prev);
        next[i][j] = value;
        return next;
      });
      setResult(null);
      setError("");
    };
  }

  function toNumericMatrix(m) {
    return m.map((row) => row.map((v) => (v === "" || v === undefined ? 0 : parseFloat(v))));
  }

  function compute() {
    const betaNum = toNumericMatrix(beta);
    const gammaNum = toNumericMatrix(gamma);
    const gammaInv = invert(gammaNum);
    if (!gammaInv) {
      setError("The γ (gamma) matrix is singular — it has no inverse, so a change-of-basis matrix doesn't exist for this input.");
      setResult(null);
      return;
    }
    const product = multiplySquare(gammaInv, betaNum, n);
    setResult(product);
    setError("");
  }

  function reset() {
    setBeta(createMatrix(n, ""));
    setGamma(createMatrix(n, ""));
    setResult(null);
    setError("");
  }

  return (
    <div className="cob-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .cob-root {
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

        .cob-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .cob-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 32px;
          letter-spacing: 0.01em;
          margin: 0 0 8px 0;
          color: var(--paper-text);
        }

        .cob-title .accent {
          color: var(--brass);
          font-style: italic;
        }

        .cob-sub {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto;
        }

        .cob-sub code {
          color: var(--brass);
          font-weight: 500;
        }

        .size-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 28px 0;
        }

        .size-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .size-btn {
          width: 32px;
          height: 32px;
          border-radius: 3px;
          border: 1px solid var(--panel-line);
          background: var(--panel);
          color: var(--paper-text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
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

        .matrices-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .matrix-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .matrix-panel-label {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          color: var(--paper-text);
        }

        .matrix-panel-label .symbol {
          color: var(--brass);
          font-style: italic;
          font-family: 'JetBrains Mono', monospace;
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

        .error-box {
          max-width: 460px;
          margin: 0 auto 24px auto;
          padding: 12px 16px;
          border-radius: 3px;
          border: 1px solid var(--danger);
          background: rgba(217, 122, 108, 0.1);
          color: var(--danger);
          font-size: 13px;
          text-align: center;
          line-height: 1.5;
        }

        .result-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding-top: 8px;
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
            width: 40px;
            height: 32px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="cob-header">
        <h1 className="cob-title">
          Change of <span className="accent">Basis</span>
        </h1>
        <p className="cob-sub">
          Enter two bases for R<sup>n</sup> as matrices whose columns are the basis
          vectors — <code>β</code> (beta) and <code>γ</code> (gamma) — and get the
          matrix that converts β‑coordinates into γ‑coordinates.
        </p>
      </div>

      <div className="size-row">
        <span className="size-label">Size n</span>
        {[2, 3, 4, 5, 6].map((size) => (
          <button
            key={size}
            className={`size-btn ${size === n ? "active" : ""}`}
            onClick={() => resize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="matrices-row">
        <MatrixGrid
          label="Beta"
          symbol="β"
          matrix={beta}
          onChange={updateCell(setBeta)}
          n={n}
        />
        <MatrixGrid
          label="Gamma"
          symbol="γ"
          matrix={gamma}
          onChange={updateCell(setGamma)}
          n={n}
        />
      </div>

      <div className="action-row">
        <button className="btn btn-primary" onClick={compute}>
          Compute
        </button>
        <button className="btn btn-ghost" onClick={reset}>
          Clear
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {result && !error && (
        <div className="result-row">
          <div className="result-heading">
            change of coordinates matrix &nbsp;
            <span className="formula">[I]γ←β = γ⁻¹β</span>
          </div>
          <MatrixDisplay
            label="Result"
            symbol="γ←β"
            matrix={result}
            n={n}
          />
        </div>
      )}
    </div>
  );
}
