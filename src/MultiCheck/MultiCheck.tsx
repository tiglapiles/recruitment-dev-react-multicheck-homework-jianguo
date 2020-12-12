import React, { useState, useEffect, FunctionComponent } from "react";
import { fpMap, pipe } from "../utils";
import "./MultiCheck.css";

export type Option = {
  label: string;
  value: string;
  checked: boolean;
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
  onChange?: (options: Option[]) => void;
};

const selectAll = { label: "Select All", value: "Select All", checked: false };

const MultiCheck: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { label = "", onChange = () => {} } = props;
  const [value, setValue] = useState({});
  const [options, setOptions] = useState<Option[]>([
    selectAll,
    ...props.options
  ]);

  const removeSelectAll = (o: Option[]) =>
    o.filter(i => i.value !== selectAll.value);

  function _handleClick(o: Option): void {
    setOptions(prev =>
      fpMap(i => {
        if (i.value === o.value) {
          return { ...i, checked: !i.checked };
        }
        return i;
      })(prev)
    );
    setValue(o);
  }

  function _getColumns(n: number): number {
    return n > 0 ? Math.ceil(options.length / n) : 1;
  }

  useEffect(() => {
    onChange(pipe(removeSelectAll)(options));
  }, [value]);

  return (
    <div className="multi-check-container">
      <div className="multi-check">
        <div className="multi-check-label">
          <label>{label}</label>
        </div>
        <div
          className="multi-check-items"
          style={{
            gridTemplateRows: `repeat(${_getColumns(props.columns || 1)},auto)`
          }}
        >
          {fpMap(o => (
            <label className="multi-check-item" key={o.value}>
              <input
                type="checkbox"
                value={o.value}
                checked={o.checked}
                onChange={() => _handleClick(o)}
              />
              <span></span>
              <div>{o.label}</div>
            </label>
          ))(options)}
        </div>
      </div>
    </div>
  );
};

export default MultiCheck;
