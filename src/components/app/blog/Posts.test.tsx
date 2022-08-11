import { render, screen } from "@testing-library/preact";
import { test } from "vitest";
import Posts from "./Posts";

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
