import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Header from "./components/header";
import BookComponent from "./pages/Book";
import HomeComponent from "./pages/Home";
import MarchingComponent from "./pages/Marching";
import notFoundPage from "./pages/notFoundPage";
import QuadtreesPage from "./pages/QuadtreesPage";

const Routes: React.FC = () => {
    return(
        <Router>
            <div className="bg-gray-200 h-screen">
                <Header />
                <Switch>
                    <Redirect exact={true} from="/" to="/home" />
                    <Route path="/home" component={HomeComponent} />
                    <Route path="/marching" component={MarchingComponent} />
                    <Route path="/quadtrees" component={QuadtreesPage} />
                    <Route path="/book" component={BookComponent} />
                    <Route component={notFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default Routes;