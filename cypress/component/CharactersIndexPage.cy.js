import CharactersIndexPage from "routes/characters/index";

const SWAPIBaseUrl = "https://swapi.dev/api/";
describe("CharactersIndexPage.cy.js", () => {
  it("load characters list on first and second page", () => {
    cy.intercept(SWAPIBaseUrl + "people?page=1", { fixture: "people" }).as(
      "getPeople"
    );
    cy.mount(<CharactersIndexPage />);
    cy.wait("@getPeople");

    cy.findByRole("list").should("contain", "Luke Skywalker");
    cy.findByRole("list").should("contain", "male");
    cy.findByRole("button", { name: /next/i }).click();
    cy.findByRole("list").should("contain", "Yoda");
    cy.findByRole("list").should("contain", "hermaphrodite");
    cy.findByRole("button", { name: /previous/i }).click();
    cy.findByRole("list").should("contain", "R2-D2");
  });
});
