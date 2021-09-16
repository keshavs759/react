import {React, useContext} from 'react'
import '../css/style.css'
import { UserContext } from '../UserContext';
export default function Body(){
    const { user } = useContext(UserContext);

    return(
        <>
        <div className="container">
        {JSON.stringify(user,null,2)}

        </div></>
    )
}