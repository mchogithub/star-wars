import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CharacterIndexPage from "routes/characters";
import {
  CharacterDetail,
  DialogCharacterDetail,
} from "routes/characters/detail";

function App() {
  let location = useLocation();
  let state = location.state;
  return (
    <div className="container m-10 mx-auto rounded-xl border bg-gray-200 p-8 shadow">
      <p className="mb-5 text-center text-3xl font-bold text-gray-700">
        Star Wars
      </p>

      <Routes location={state?.backgroundLocation || location}>
        <Route index element={<CharacterIndexPage />} />
        <Route path="characters" element={<CharacterIndexPage />} />
        <Route path="characters/:id" element={<CharacterDetail />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="characters/:id" element={<DialogCharacterDetail />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
