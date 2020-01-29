import React from "react";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import { getData as mockGetData } from "../api";

import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");
afterEach(() => cleanup);

const initialData = {
  next: "test next",
  prev: "test prev",
  results: [
    {
      name: "Luke Skywalker",
      url: "some url"
    }
  ]
};

const prevData = {
  next: "test next",
  prev: "test prev",
  results: [
    {
      name: "Jane Doe",
      url: "some url"
    }
  ]
};

const nextData = {
  next: "test next",
  prev: "test prev",
  results: [
    {
      name: "John Doe",
      url: "some url"
    }
  ]
};

test("renders the app with both buttons", () => {
  mockGetData.mockResolvedValueOnce(initialData);
  const { getByText } = render(<StarWarsCharacters />);

  getByText(/previous/i);
  getByText(/next/i);
});

test("renders a character", async () => {
  mockGetData.mockResolvedValueOnce({
    next: "test next",
    prev: "null",
    results: [
      {
        name: "Luke Skywalker",
        url: "some url"
      },
      {
        name: "john doe",
        url: "some other url"
      }
    ]
  });

  const { getByText } = render(<StarWarsCharacters />);

  // expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => getByText(/luke skywalker/i));
  await wait(() => getByText(/john doe/i));
});

test("next button works", async () => {
  mockGetData
    .mockResolvedValueOnce(initialData)
    .mockResolvedValueOnce(nextData);

  const { getByText } = render(<StarWarsCharacters />);
  // expect(mockGetData).toHaveBeenCalledTimes(1);

  const nextButton = getByText(/next/i);
  await wait(() => {
    fireEvent.click(nextButton);
    getByText(/john doe/i);
  });
  // expect(mockGetData).toHaveBeenCalledTimes(2);
});

test("previous button works", async () => {
  mockGetData
    .mockResolvedValueOnce(initialData)
    .mockResolvedValueOnce(prevData);
  const { getByText } = render(<StarWarsCharacters />);
  // expect(mockGetData).toHaveBeenCalledTimes(3);

  const prevButton = getByText(/previous/i);
  await wait(() => {
    fireEvent.click(prevButton);
    getByText(/jane doe/i);
  });
  // expect(mockGetData).toHaveBeenCalledTimes(4);
});
