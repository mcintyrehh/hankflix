import React, {useContext} from "react";
import { RootContext } from '../utils/RootContext';
import AUTH from "./AUTH";


export default function AuthCallback() {
    const id = localStorage.getItem("id");
    const { setAuthenticated, setAuthBody } = useContext(RootContext)
    AUTH.plexToken(id).then(response => {
        console.log(response.data);
        //TODO: save some of this response data to localstorage
        AUTH.plexUserInfo(response.data.authToken).then(response => {
            console.log(response.data);
            const sevenDaysFromNow = Math.floor(Date.now() / 1000 + (60*60*24*7))
            console.log(sevenDaysFromNow)
            localStorage.setItem("exp", sevenDaysFromNow)
            setAuthenticated(true);
            setAuthBody(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user))
            window.location.href=("http://localhost:3000")
        })
    })
    return (<div></div>)
}