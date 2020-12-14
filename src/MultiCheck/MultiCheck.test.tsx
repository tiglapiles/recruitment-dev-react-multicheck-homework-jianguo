import "@testing-library/jest-dom";

import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { fpMap, pipe } from "../utils";
import MultiCheck from "./MultiCheck";

describe("MultiCheck", () => {
  describe("initialize", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<MultiCheck options={[]} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("renders the label if label provided", () => {
      const label = "jest test";
      render(<MultiCheck options={[]} label={label} />);

      expect(screen.queryByLabelText(label)).toBeDefined();
    });

    it("render and click checkbox", () => {
      const options = [{ label: "test", value: "test", checked: false }];
      render(<MultiCheck options={options} />);

      expect(screen.queryByLabelText(/test/i)).not.toBeChecked();

      // simulate user click checkbox
      fireEvent.click(screen.getByLabelText(/test/i));

      expect(screen.queryByLabelText(/test/i)).toBeChecked();
    });
  });

  describe("utils", () => {
    it("fpMap", () => {
      let arr = [1, 2, 3];
      let add1 = (o: number) => o + 1;

      expect(fpMap(add1)(arr)).toEqual([2, 3, 4]);
    });

    it("pipe", () => {
      let arr = [1, 2, 3];
      let add1Each = (i: []) => i.map(o => o + 1);
      let prod2Each = (i: []) => i.map(o => o * 2);

      expect(pipe(add1Each, prod2Each)(arr)).toEqual([4, 6, 8]);
    });
  });
});
