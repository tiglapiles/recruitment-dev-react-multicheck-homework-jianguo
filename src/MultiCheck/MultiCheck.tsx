import React from "react";
import { fpMap } from "../utils";
import "./MultiCheck.css";

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <div className="multi-check-container">
      <div className="multi-check">
        <div className="multi-check-label">
          <label>{props.label}</label>
        </div>
        <div
          className="multi-check-items"
          style={{
            gridTemplateRows: `repeat(${Math.ceil(
              props.options.length / (props.columns || 1)
            )},auto)`
          }}
        >
          {fpMap(o => (
            <label className="multi-check-item">
              <input type="checkbox" value={o.value} />
              <span></span>
              <div>{o.label}</div>
            </label>
          ))(props.options)}
        </div>
      </div>
    </div>
  );
};

export default MultiCheck;
