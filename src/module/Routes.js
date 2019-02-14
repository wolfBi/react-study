import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import {Header, Navigation} from "../component";
import "./Routes.css";

export default class Routes extends Component {
    render() {
        let {history, store, routes} = this.props;
        return (
            <div className="routes_container">
                <Header push={history.push}/>
                <Navigation push={history.push} initPath={history.location.pathname}/>
                <div className="routes_content">
                    <div id="routes_second_part" className={"second_part"}>
                        <Switch>
                            {routes.map((route, index) => {
                                let dom = "";
                                if (route.component) {
                                    dom =  <Route key={index} path={route.path}
                                                  exact={route.exact === undefined ? true : route.exact}
                                                  render={props => {
                                                      if (route.interceptor) {
                                                          route.interceptor(this.props);
                                                      }
                                                      return <route.component {...props} store={store}
                                                                              push={history.push}/>
                                                  }} strict={true}/>
                                } else if (route.render) {
                                    dom =  <Route key={index} path={route.path}
                                                  exact={route.exact === undefined ? true : route.exact}
                                                  render={props => {
                                                      if (route.interceptor) {
                                                          route.interceptor(this.props)
                                                      }
                                                      return route.render(props)
                                                  }} strict={true}/>
                                }
                                return dom;
                            })}
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

    static propTypes = {
        routes: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string.isRequired,
            component: PropTypes.func,
            render: PropTypes.func,
            exact: PropTypes.bool,
            interceptor: PropTypes.func
        })),
        history: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    }
}