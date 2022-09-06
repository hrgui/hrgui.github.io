describe("portfolio", () => {
  it("should be able to see the portfolio index and be able to hit chord-charts, a github portfolio item", () => {
    cy.visit("/portfolio");
    cy.viewport("macbook-16");
    const header = cy.findByRole("heading", { level: 1 });
    header.should("exist");
    header.contains("Portfolio");

    const testPortfolioItem = cy.findByText("chord-charts");
    testPortfolioItem.click();

    cy.findByText("What I Did").should("exist");
    cy.findByText("Technologies Used").should("exist");
    cy.findByText("About").should("exist");
  });

  it("should be able to see the portfolio index and be able to hit VKEY, a portfolio item with a slider", () => {
    cy.visit("/portfolio");
    cy.viewport("macbook-16");
    const header = cy.findByRole("heading", { level: 1 });
    header.should("exist");
    header.contains("Portfolio");

    const testPortfolioItem = cy.findByText("VKEY");
    testPortfolioItem.click();

    cy.findByText("What I Did").should("exist");
    cy.findByText("Technologies Used").should("exist");
    cy.findByText("About").should("exist");

    // test the next button is clickable
    const next = cy.findByText("Next");
    next.parent().click();
  });
});
