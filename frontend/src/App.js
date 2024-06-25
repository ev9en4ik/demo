import AppRoute from "./appRoute";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCountries} from "./store/reducers/countrySlice";
import {fetchNews} from "./store/reducers/newsSlice";

function App() {
    const countryStatus = useSelector(state=> state.country.status)
    const newsStatus = useSelector(state=> state.news.status)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCountries())
        dispatch(fetchNews())
    }, [dispatch])
    
    return (
        <div className="bg-zinc-800 w-screen min-h-screen text-gray-300">
            {countryStatus === 'resolved' && newsStatus && 'resolved' && <AppRoute/> }
            {/*<AppRoute/>*/}
        </div>
      );
}

export default App;
