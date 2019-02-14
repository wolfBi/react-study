import React, {Component} from "react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {loadReducer as homeLoadReducer} from "../home";
import {AsyncComp} from "../../component";
import createHistory from "history/createHashHistory";
import Routes from "../Routes";

class App extends Component {
    defaultRoutes = [
        {
            path: "/",
            component: AsyncComp(() => import('../home/view/Home')),
            interceptor: props => this.initHomeModule(props)
        }
    ]

    initHomeModule = (props) => {
        homeLoadReducer(props.store);
    }

    shouldComponentUpdate() {
        return false
    }


    render() {
        let history = createHistory({basename: window.global['ROUTE_BASENAME']})
        let {store} = this.props;
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Routes history={history} store={store} routes={this.defaultRoutes}/>
                </Router>
            </Provider>
        );
    }
}

export default App;
