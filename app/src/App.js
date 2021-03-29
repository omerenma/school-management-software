import logo from "./logo.svg";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import "./Apps.css";
// import "./components/Dashboard/dashboard.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./store";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./components/404";
import Landing from "./components/Landing/Landing";
import { Loader, Dimmer } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={Loader} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
