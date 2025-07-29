import axios from 'axios';
import {createContext, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [receivedData, setReceivedData] = useState({});
    const [token,setToken] = useState(true);
    const [showLogin, setShowLogin] = useState(true);
    const [allCourses, setAllCourse] = useState([])
    const [selectCourse, setSelectCourse] = useState({})


    const getAllData = async ()=>{
        const response = await axios.get('http://localhost:3000/api/courses')
        setAllCourse(response.data.data)
    }

    const getSelectedCourse = async ()=>{
        const {topic} = useParams()
        const response = await axios.get(`http://localhost:3000/api/courses/${topic}`)
        console.log(typeof response.data)
        setSelectCourse(response.data.data)

    }


    const [selectedContent , setSelectedContent] = useState(null);
    const value = {
        receivedData,
        setReceivedData,
        token,
        setToken,
        showLogin,
        setShowLogin,
        selectedContent,
        setSelectedContent,
        getAllData,
        allCourses,
        selectCourse,
        getSelectedCourse,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider