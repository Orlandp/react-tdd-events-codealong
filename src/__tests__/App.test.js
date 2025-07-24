import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

// Code tests here
test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  expect(screen.getAllByRole("listitem").length).toBe(1);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

// Test the effect of clicking the checkbox
test("checkbox appears as checked when user clicks it", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await userEvent.click(addPepperoni);
  expect(screen.getAllByRole("listitem").length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

// Test the effect of clicking the checkbox a second time
test("selected topping disappears when checked a second time", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  await userEvent.click(addPepperoni); // check
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  await userEvent.click(addPepperoni); // uncheck
  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
