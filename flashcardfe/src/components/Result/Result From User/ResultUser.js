import { useEffect } from "react";
import { getAllResultsByUser } from "../../../service/ApiService";

const ResultUser = () =>{
useEffect(()=>{
    getResultOfUser()
},[])
    const getResultOfUser = async() =>{
        let response = await getAllResultsByUser()
        console.log(response)
    }
    return(
        <>
            rj
        </>
    )
}
export default ResultUser