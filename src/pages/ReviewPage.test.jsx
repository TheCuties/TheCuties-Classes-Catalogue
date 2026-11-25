import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import ReviewPage from "./ReviewPage";

// Tests whether a validation message shows when user submits an empty review
test("submitting an empty review shows a validation message", async () => {

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
      campus: "OT North Campus"
    }
  ];

  render(
    <MemoryRouter initialEntries={["/reviews/1"]}>
      <Routes>
        <Route
          path="/reviews/:id"
          element={<ReviewPage courses={courses} />}
        />
      </Routes>
    </MemoryRouter>
  );

  // Act
  await userEvent.click(
    screen.getByRole("button", {
      name: "Add Review"
    })
  );

  // Assert
  expect(
    screen.getByText(
      "Please write a review and select a rating"
    )
  ).toBeInTheDocument();
});

// Tests whether the average rating updates once a new review is added
test("average rating updates after new review is added", async () => {

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
      campus: "OT North Campus"
    }
  ];

  render(
    <MemoryRouter initialEntries={["/reviews/1"]}>
      <Routes>
        <Route
          path="/reviews/:id"
          element={<ReviewPage courses={courses} />}
        />
      </Routes>
    </MemoryRouter>
  );

  // Act
  await userEvent.type(
    screen.getByPlaceholderText("Write a review..."),
    "Great course"
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: "5 out of 5 stars"
    })
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: "Add Review"
    })
  );

  // Assert
  expect(
    screen.getByText(
      "5.0"
    )
  ).toBeInTheDocument();
});

// Tests whether the added review is displayed
test("adding a review, gets displayed ", async () => {

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
      campus: "OT North Campus"
    }
  ];

  render(
    <MemoryRouter initialEntries={["/reviews/1"]}>
      <Routes>
        <Route
          path="/reviews/:id"
          element={<ReviewPage courses={courses} />}
        />
      </Routes>
    </MemoryRouter>
  );

  // Act
  await userEvent.type(
    screen.getByPlaceholderText("Write a review..."),
    "Great course!"
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: "5 out of 5 stars"
    })
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: "Add Review"
    })
  );

  // Assert
  expect(
    screen.getByText(
      "Great course!"
    )
  ).toBeInTheDocument();
});

