import { param } from "jquery";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllResultsByTeacher } from "../../../service/ApiService";

const ResultTeacher = ()=>{
    const params = useParams();
    useEffect(()=>{
        getRsTeacher()
    },[])
    const getRsTeacher  = async()=>{
        let response = await getAllResultsByTeacher(params.examId)
        console.log(response)
    }
    return(
        <div>
                rs ToastContainer
        </div>
    )
}
export default ResultTeacher