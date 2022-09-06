describe("home", () => {
  it("should be able to see homw page", () => {
    cy.visit("/");
    cy.viewport("macbook-16");
    cy.findByTestId("section-hero").should("exist");
    cy.findByTestId("section-three-sell-points").should("exist");
    cy.findByTestId("section-three-sell-points").scrollIntoView();
    cy.findByTestId("section-technical-skills").should("exist");
    cy.findByTestId("section-technical-skills").scrollIntoView();
    cy.findByTestId("section-education").should("exist");
    cy.findByTestId("section-education").scrollIntoView();
    cy.findByTestId("section-portfolio").should("exist");
    cy.findByTestId("section-portfolio").scrollIntoView();
  });
});
