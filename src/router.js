import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";

import App from "./components/App";
import Home from "./components/Home";
import Loader from "./components/loader/Loader"
import NotFound from "./components/NotFound";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route exact path="/analyzer" component={Home}/>
      <Route exact path="/loader" component={Loader}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// export
export { router };
