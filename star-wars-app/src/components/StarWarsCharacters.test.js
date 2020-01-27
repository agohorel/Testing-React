import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";

import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test("renders the app with both buttons", () => {
  const { getByText } = render(<StarWarsCharacters />);

  getByText(/previous/i);
  getByText(/next/i);
});
