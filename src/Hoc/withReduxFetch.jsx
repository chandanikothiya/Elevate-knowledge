import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function withReduxFetch(WrappedComponent, action, selector) {
    return function ReduxFetchedComponenet(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(action())
        }, [])

        const { isLoading, error, ...data } = useSelector(selector)

        if(isLoading) {
            console.log("catloading","loading")
            return (
                <p>Loading...</p>
            )
        }

        if (error) {
            console.log("caterror1",error)
            return (
                <p>Loading....</p>
            )
        }

        console.log(data);

        return (<WrappedComponent {...data} {...props} />)
    }
}

export default withReduxFetch;