import { Route, Routes } from "react-router-dom";
import { CharacterDetail } from "routes/characters/detail";

const SWAPIBaseUrl = "https://swapi.dev/api/";
describe("CharacterDetail.cy.js", () => {
  it("load character info", () => {
    cy.intercept(SWAPIBaseUrl + "people/4", { fixture: "character" }).as(
      "getCharacter"
    );
    cy.mount(
      <Routes>
        <Route path="characters/:id" element={<CharacterDetail />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: ["/characters/4"],
        },
      }
    );
    cy.wait("@getCharacter");

    cy.findByText("Darth Vader").should("exist");
    cy.findByText("136").should("exist");
  });
});
