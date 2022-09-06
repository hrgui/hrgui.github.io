describe("blog", () => {
  it("should be able to see the blog index and be able to click the latest blog post", () => {
    cy.visit("/posts");
    cy.viewport("macbook-16");
    const header = cy.findByRole("heading", { level: 1 });
    header.should("exist");
    header.contains("Blog");

    const firstBlogTitle = cy.findAllByRole("heading", { level: 2 }).first();
    firstBlogTitle.click();
  });
});
