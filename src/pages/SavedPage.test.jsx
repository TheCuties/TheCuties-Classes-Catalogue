import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import SavedPage from "./SavedPage";

// Tests whether a message shows up when there are no saved courses
test("shows a message when there are no saved courses", () => {

  render(
    <SavedPage
      courses={[]}
      onToggleFavourite={() => { }}
    />
  );

  // Assert
  expect(
    screen.getByText("No Saved Courses Yet")
  ).toBeInTheDocument();
});

// Tests saved courses are displayed
test("displays saved courses", () => {
  // Arrange
  const courses = [
    {
      id: 1,
      code: "CSCI 1010U",
      name: "Programming Fundamentals",
      description: "Test description",
      instructor: "Dr. Smith",
      schedule: ["Monday", "Wednesday"],
      time: "10:00 - 11:30",
      campus: "OT North Campus",
      isFavourite: true
    }
  ];

  render(
    <MemoryRouter>
    <SavedPage
      courses={courses}
      onToggleFavourite={() => {}}
    />
  </MemoryRouter>
  );

  // Assert
  expect(
    screen.getByText(
      "Programming Fundamentals"
    )
  ).toBeInTheDocument();
});