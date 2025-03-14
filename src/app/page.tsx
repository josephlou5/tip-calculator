"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { makeClassName } from "../utils/className";
import { getCurrentVersion } from "./changelog/changelog";
import { TITLE } from "./metadata";

const MAX_AMOUNT = 100_000_000_00;

// The percentages that are always shown.
const PERCENTAGES = [15, 18, 20, 22, 25].sort((a, b) => a - b);
// The maximum number of rounded tips to give.
const MAX_NUM_ROUNDED_TIPS = 3;

/** Represents a tip. */
type Tip = {
  /** The percentage to display. If not given, it will be calculated. */
  percent?: string;
  /** The tip amount, in cents. */
  amount: number;
};

/** Tip calculator. */
export default function Page() {
  // The amount in cents.
  const [amount, setAmount] = useState(0);
  const [tips, setTips] = useState<Tip[]>([]);

  const defaultTips = [{ percent: "", amount: 0 }];

  function inputOnChange(event: ChangeEvent<HTMLInputElement>) {
    const newAmount = Math.min(getInts(event.target.value), MAX_AMOUNT);
    setAmount(newAmount);

    if (newAmount === 0) {
      setTips([]);
      return;
    }

    const newTips: Tip[] = [];
    let prevTip: number | null = null;
    for (const percent of PERCENTAGES) {
      const tip = (newAmount * percent) / 100;
      if (prevTip !== null) {
        const prevTotal = newAmount + prevTip;
        const currTotal = newAmount + tip;
        const step = (currTotal - prevTotal) / (MAX_NUM_ROUNDED_TIPS + 1);

        let prevRoundedTotal: number | null = null;
        let numRoundedTips = 0;
        for (
          let targetTotal = prevTotal + step;
          numRoundedTips < MAX_NUM_ROUNDED_TIPS && targetTotal < currTotal;
          targetTotal += step
        ) {
          const roundedTargetTotal = round(targetTotal, 100);
          if (
            prevTotal < roundedTargetTotal &&
            roundedTargetTotal < currTotal &&
            roundedTargetTotal !== prevRoundedTotal
          ) {
            newTips.push({ amount: roundedTargetTotal - newAmount });
            numRoundedTips++;
          }
          prevRoundedTotal = roundedTargetTotal;
        }
      }
      newTips.push({ percent: `${percent}%`, amount: tip });
      prevTip = tip;
    }

    setTips(newTips);
  }

  return (
    <>
      <div className="mb-2">
        <span className="h1">{TITLE}</span>
        <span className="h6 fst-italic text-secondary ms-3">
          (
          <Link href="/changelog" className="text-reset">
            {getCurrentVersion()}
          </Link>
          )
        </span>
      </div>

      <div className="row mb-2">
        <div className="col-auto">
          <label htmlFor="amount-input" className="col-form-label">
            Amount
          </label>
        </div>
        <div className="col-auto">
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="amount-input"
              type="text"
              inputMode="decimal"
              pattern="[0-9]"
              className="form-control dollar-input"
              value={formatCents(amount)}
              aria-label="Amount"
              onChange={inputOnChange}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive mb-2">
        <table className="table table-bordered align-middle w-auto">
          <thead>
            <tr>
              <th scope="col">Percentage</th>
              <th scope="col">Tip</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {(tips.length > 0 ? tips : defaultTips).map((tip, i) => (
              <tr
                key={i}
                className={makeClassName({ "table-active": !!tip.percent })}
              >
                <td>{tip.percent ?? formatPercent(tip.amount / amount)}</td>
                <td>{formatCents(tip.amount, { dollarSign: true })}</td>
                <td>
                  {formatCents(amount + tip.amount, { dollarSign: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Rounds the given number to an integer. */
function int(num: number): number {
  return Math.round(num);
}

/** Rounds the given number to a multiple of a number. */
function round(
  num: number,
  factor: number,
  method: "round" | "ceil" | "floor" = "round"
): number {
  if (factor === 0) throw new Error("round(): factor cannot be 0");
  return Math[method](num / factor) * factor;
}

/**
 * Strips out all the non-numeric values in the given string and returns the
 * resulting value as an integer.
 */
function getInts(str: string, defaultValue = 0): number {
  let sawDigit = false;
  let num = 0;
  for (const char of str) {
    const digit = parseInt(char);
    if (isNaN(digit)) continue;
    sawDigit = true;
    num = num * 10 + digit;
  }
  if (!sawDigit) return defaultValue;
  return num;
}

/** Adds a dot at the given index. */
function _addDot(str: string, index: number): string {
  return str.slice(0, index) + "." + str.slice(index);
}

/** Formats cents in the format "0.00" (no dollar). */
function formatCents(cents: number, { dollarSign = false } = {}): string {
  const centsStr = int(cents).toString().padStart(3, "0");
  const sign = dollarSign ? "$" : "";
  return sign + _addDot(centsStr, -2);
}

/** Formats a percentage with the given number of decimal places. */
function formatPercent(percent: number, { places = 1 } = {}): string {
  if (isNaN(percent)) return "-";
  places = Math.max(0, places);
  const percentStr = int(percent * Math.pow(10, 2 + places))
    .toString()
    .padStart(1 + places, "0");
  if (places === 0) {
    return percentStr + "%";
  }
  return _addDot(percentStr, -places) + "%";
}
