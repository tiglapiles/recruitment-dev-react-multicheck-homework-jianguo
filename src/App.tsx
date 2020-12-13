import React, { useState, useEffect } from "react";
import MultiCheck, { Option } from "./MultiCheck/MultiCheck";
import options from "./options.json";

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
