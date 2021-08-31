import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Header from "./components/header";
import AlgorithmsComponent from "./pages/book/Algorithms";
import IntroCppComponent from "./pages/book/IntroCpp";
import QuadtreesPage from "./pages/QuadtreesPage";
import notFoundPage from "./pages/notFoundPage";

const Routes: React.FC = () => {
    return(
        <Router>
            <div className="bg-blue-600 h-screen">
                <Header />
                <Switch>
                    <Redirect exact={true} from="/" to="/intro" />
                    <Route path="/intro" component={IntroCppComponent} />
                    <Route path="/algo" component={AlgorithmsComponent} />
                    <Route path="/quadtrees" component={QuadtreesPage} />
                    <Route component={notFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default Routes;