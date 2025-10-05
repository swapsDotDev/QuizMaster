import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuizPage from "./pages/QuizPage";

test("renders question and allows option selection", async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ id: 1, text: "Test?", options: ["A", "B"] }]),
    })
  );

  render(
    <MemoryRouter initialEntries={["/quiz"]}>
      <QuizPage />
    </MemoryRouter>
  );

  // Wait for question to load
  expect(await screen.findByText("Test?")).toBeInTheDocument();

  // Select an option
  fireEvent.click(screen.getByLabelText("A"));
  expect(screen.getByLabelText("A")).toBeChecked();
});