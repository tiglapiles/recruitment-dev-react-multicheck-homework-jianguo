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

const selectAll = (c = false) => ({
  label: "Select All",
  value: "Select All",
  checked: c
});

const MultiCheck: FunctionComponent<Props> = (props): JSX.Element => {
  const { label = "", columns = 1, onChange = () => {} } = props;
  const [value, setValue] = useState({}); // for call props.onChange
  const [options, setOptions] = useState<Option[]>([
    /* if original options all checked */
    selectAll(!hasUnchecked(props.options)),
    ...props.options
  ]);

  function hasUnchecked(o: Option[]) {
    return o.filter(o => o.value !== selectAll().value).some(o => !o.checked);
  }

  function _handleClick(o: Option): void {
    const convertCheck = fpMap(i => {
      if (i.value === o.value) {
        return { ...i, checked: !o.checked };
      }
      return i;
    });
    const convertSelectAll = fpMap(i => {
      if (selectAll().value === o.value) {
        return { ...i, checked: !o.checked };
      }
      return i;
    });
    const isAllChecked = (o: Option[]) => {
      return fpMap(i => {
        if (i.value === selectAll().value) {
          return { ...i, checked: !hasUnchecked(o) };
        }
        return i;
      })(o);
    };

    setOptions(prev =>
      pipe(convertCheck, convertSelectAll, isAllChecked)(prev)
    );
    setValue(o);
  }

  function _getColumns(n: number): number {
    return n > 0 ? Math.ceil(options.length / n) : 1;
  }

  useEffect(() => {
    /* selectAll option can not be pass outside */
    onChange(options.filter(i => i.value !== selectAll().value));
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
            gridTemplateRows: `repeat(${_getColumns(columns)},auto)`
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
