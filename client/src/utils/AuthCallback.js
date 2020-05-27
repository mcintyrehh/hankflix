import React from "react";
import AUTH from "./AUTH";


export default function AuthCallback() {
    const id = localStorage.getItem("id");
    AUTH.plexToken(id).then(response => {
        console.log(response.data);
    })
    return (<div></div>)
}