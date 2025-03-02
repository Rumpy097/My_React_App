import { useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc,doc, getDocs, updateDoc, deleteDoc, orderBy, Timestamp } from "firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';  // Material UI Dialog components
import "react-datepicker/dist/react-datepicker.css";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ReactTooltip from 'react-tooltip';  // Default import
// Import the specific icon from Font Awesome's free solid set
import { faRectangleXmark, faCalendarDays, faArrowsRotate, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// import { useState } from "react";
import { useEffect, useState } from "react";

function CompletedTasksPage(){
    const navigate = useNavigate();
    const [completedTasks, setCompletedTasks] = useState([]);



    const fetchTasks = async () =>{
		try{
			
			
			const querySnapShot = await getDocs(collection(db,"tasks"), orderBy("createdAt","desc"));

			const taskArray = querySnapShot.docs.map((doc)=>({id:doc.id,...doc.data()}));

			setCompletedTasks(taskArray.filter(task=>task.status==="Complete"));
            console.log("new page check ");
            console.log(" check ");
		}

		catch(e){
			console.log("fetching error "+ e);
            console.log("fetching error "+ e);
            console.log("fetching error "+ e);
            console.log("fetching error "+ e);

		}
        
    
	}
    useEffect(()=>{
        fetchTasks();
        
    },[]);



    return(
    
   
    <div>
         <h1>Completed Tasks Page</h1>
         
			<div className="done">
				

							
                                <><table>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Priority</th>
                                        <th>Start Date</th>
                                        <th>Completion Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {completedTasks.map((task)=>(
                                            <tr key={task.id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>{task.priority}</td>
                                                <td>{task.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                                <td>{task.completedAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                    

                                </table><>
                                
                                
                                
                                    </></>
							
					
					<div>
				</div>
			</div>

    </div>



)
}
export default CompletedTasksPage