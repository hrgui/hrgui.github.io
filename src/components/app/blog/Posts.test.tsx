import { render, screen } from "@testing-library/preact";
import { test, vi, afterEach } from "vitest";

import Posts from "./Posts";

afterEach(() => {
  vi.useRealTimers();
});

test("shows the New badge when the featured post was published within the last 24 hours", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
  render(
    <Posts
      posts={[
        {
          title: "Brand New Post",
          slug: "brand-new",
          date: "2026-03-27T10:00:00Z",
        },
      ]}
    />
  );
  expect(screen.getByText("New")).toBeInTheDocument();
});

test("does not show the New badge when the featured post is older than 24 hours", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-03-27T12:00:00Z"));
  render(
    <Posts
      posts={[
        {
          title: "Old Post",
          slug: "old-post",
          date: "2026-03-25",
        },
      ]}
    />
  );
  expect(screen.queryByText("New")).not.toBeInTheDocument();
});

test("should be able to render no posts without crashing", () => {
  render(<Posts posts={[]} />);
  expect(screen.getByText(/No posts available/)).toBeInTheDocument();
});

test("should be able to render some posts without crashing", () => {
  render(
    <Posts
      posts={[
        {
          title: "Hello World",
          slug: "hello-world",
          excerpt: "This is a hello world post.",
        },
        {
          title: "Post 2",
          slug: "post-2",
          excerpt: "This is post 2.",
        },
      ]}
    />
  );
  expect(screen.getByTestId("posts-hello-world")).toBeInTheDocument();
  expect(screen.getByTestId("posts-post-2")).toBeInTheDocument();
});
