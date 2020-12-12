import React, { useState, useEffect } from "react";
import MultiCheck, { Option } from "./MultiCheck/MultiCheck";

const options: Option[] = [
  { label: "New (NEW)", value: "New (NEW)", checked: false },
  { label: "Active (ACT)", value: "Active (ACT)", checked: false },
  { label: "Price Change (PCG)", value: "Price Change (PCG)", checked: false },
  {
    label: "Back on Market (BOM)",
    value: "Back on Market (BOM)",
    checked: false
  },
  { label: "Extended (EXT)", value: "Extended (EXT)", checked: false },
  { label: "Reactivated (RAC)", value: "Reactivated (RAC)", checked: false },
  { label: "Contingent (CTG)", value: "Contingent (CTG)", checked: false },
  { label: "Under Agreement", value: "Under Agreement", checked: false },
  { label: "Sold (SLD)", value: "Sold (SLD)", checked: true },
  {
    label: "Temporarily Withdrawn (WDN)",
    value: "Temporarily Withdrawn (WDN)",
    checked: false
  },
  { label: "Expired (EXP)", value: "Expired (EXP)", checked: false },
  { label: "Cancele (CAN)", value: "Cancele (CAN)", checked: true },
  {
    label: "Comming Soon (CSO)",
    value: "Comming Soon (CSO)",
    checked: false
  }
];

const App: React.FunctionComponent = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  function onSelectedOptionsChange(options: Option[]): void {
    setSelectedValues(options.filter(o => o.checked).map(o => o.value));
  }

  useEffect(() => {
    setSelectedValues(options.filter(o => o.checked).map(o => o.value));
  }, []);

  return (
    <div>
      <h1>Multi Check Component</h1>
      <MultiCheck
        label="Status"
        options={options}
        onChange={onSelectedOptionsChange}
        columns={2}
      />
      <div>
        <h2>Current selected values:</h2>
        <div>{selectedValues.join(",")}</div>
      </div>
    </div>
  );
};

export default App;
