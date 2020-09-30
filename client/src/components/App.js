import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Input from "../pages/Input";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/types" component={Input} />
        <Route component={NotFound} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
