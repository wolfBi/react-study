import React from "react";
import Loadable from "react-loadable";
import LoadingComp from "./LoadingComp";

const asyncLoading = (props) => {
    if (props.isLoading) {
        // While our other component is loading...
        if (props.timedOut) {
            // In case we've timed out loading our other component.
            return <div>Loader timed out!</div>;
        } else if (props.pastDelay) {
            // Display a loading screen after a set delay.
            return <LoadingComp/>
        } else {
            // Don't flash "Loading..." when we don't need to.
            return null;
        }
    } else if (props.error) {
        // If we aren't loading, maybe
        console.error(props.error)
        return <div>Error! Component failed to load</div>;
    } else {
        // This case shouldn't happen... but we'll return null anyways.
        return null;
    }
}

const AsyncComp = (loaderFunc) => {
    return Loadable({
        loader: loaderFunc,
        loading: asyncLoading/*,
         render: (loaded, props) => {
         return <loaded.default {...props}/>
         }*/
    });
}
export default AsyncComp;