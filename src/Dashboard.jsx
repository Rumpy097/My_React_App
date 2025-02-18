import { FaPlus } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';  // Material UI Dialog components
import "react-datepicker/dist/react-datepicker.css";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ReactTooltip from 'react-tooltip';  // Default import
// Import the specific icon from Font Awesome's free solid set
import { faRectangleXmark, faCalendarDays, faArrowsRotate, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// import { useState } from "react";
import { useState } from "react";


function Dashboard(){

	console.log("Dashboard component rendered at", new Date().toLocaleTimeString());

	// const ReactTooltip = require('react-tooltip').default;
	const [tasks,setTasks] = useState([]);
	const [taskTitle, setTaskTitle] = useState("");
	const [description,setDescription] = useState("");
	const [priority,setPriority] = useState("Low");
	const [status,setStatus] = useState("Incomplete");

	const getTodayDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
		const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits

		//alert('getdate '+ `${year}-${month}-${day}`);
		return `${year}-${month}-${day}`; // YYYY-MM-DD format
	};

	const [dueDate,setDueDate] = useState(() => getTodayDate() || "");
	const [selectedTask,setSelectedTask] =useState({});
	const [toDoTasks,setToDoTasks] = useState([]);
	const [progressTasks,setProgressTasks] = useState([]);
	const [completedTasks,setCompletedTasks] = useState([]);
	const [editedValues,setEditedValues] = useState({});
	const [isEditing,setIsEditing] = useState(false);
	const [editingField,setEditingField] = useState("");
	const [hasEdited,setHasEdited] = useState(false);
 
	const handleAddTask = () =>{
		if(taskTitle.trim() === '' || dueDate.trim() ===''){
			if(taskTitle.trim()==='' && dueDate.trim()===''){
				alert('please enter a task title and due date');
			}
			else{
				if(taskTitle.trim()===''){
					alert('please enter a task title');
				}
				else{
					if(dueDate ===''){alert('please enter due date');}
				}
			}
		
			return;
		}
		else{
			const newTask = {
				id: Date.now(),	
				title: taskTitle,
				description: description,
				priority: priority,
				status: status,
				dueDate: dueDate,
		  };

	
	  
		  // Add the new task to the tasks array
		  setTasks([...tasks, newTask]);
		  if(status=="Incomplete")
		  {
			setToDoTasks([...toDoTasks,newTask]);
		  }
		  
		  setTaskTitle("");
		  setDescription("");
		  setPriority('Low');
		  setStatus('Incomplete');
		  setDueDate(getTodayDate() || "");
		  setOpen(false); //close dialog after adding task
		  }

			 
		
	};


	const toInputDateFormat = (date) => {

		if(date!=''){
			const [month, day, year] = date.split('-');
			//alert('date '+ date +'input '+ `${year}-${month}-${day}`);
		     return `${year}-${month}-${day}`; // Format for HTML date input
		}
		
	};


/// add task dialog
	// State to control dialog visibility
	const [open,setOpen] = useState(false);

	// Function to handle opening the dialog
	const handleClickOpen = () => {
	setOpen(true);
	};
	
	// Function to handle closing the dialog
	const handleClose = () => {
	setOpen(false);
	};

	/// task dialog

	const [openTask,setOpenTask] =useState(false);
	const openTaskDialog= (task)=>{
	setSelectedTask(task);	
	setEditedValues({...task});
	setIsEditing(false);
	setEditingField("");
	setHasEdited(false);	
	taskClickOpen();
	}


	// Function to handle opening the dialog
	const taskClickOpen = () => {
	setOpenTask(true);
	};
	
	// Function to handle closing the dialog
	const taskClose = () => {
		setOpenTask(false);
	};

	//inProgressTasks[],ToDoTask[],CompletedTask[]
	const handleStartTask =(task)=>{
		//task.status="In Progress";
		setProgressTasks([...progressTasks,task]);
		
		const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
		const updatedToDoTasks = toDoTasks.filter ( t => t.id!== task.id);

		setTasks(updatedTasks);
		setToDoTasks(updatedToDoTasks);
		setIsEditing(false);
	    setEditingField("");
		setHasEdited(false);
		setOpenTask(false);
	
	};
	
	
	
	//handle start task should change status to in progress and the progress list should show it
	const handleTaskCompletion =(task)=>{
		//task.status="Complete";
		setCompletedTasks([...completedTasks,task]);
		console.log("completed :"+task.title);

	    const updatedTasks =	tasks.map(t => {

			console.log(" before update " + t.status);
			return t.id === task.id ? task : t;
		
		} ); //updates task in the tasks array


		const updatedToDoTasks= toDoTasks.filter( t => t.id !== task.id); //creates a new array , adds tasks that satisfies the conditions
		const updatedProgressTasks = progressTasks. filter( t => t.id !== task.id);

		setToDoTasks(updatedToDoTasks);
		setTasks(updatedTasks);
		setProgressTasks(updatedProgressTasks);

		


	};
	

	const startEditing = (field) =>{
		setIsEditing(true);
		setEditingField(field);
		setHasEdited(true);
		console.log("Field :"+ field);
	}

	const handleEditChange = (field,value) =>{
		setEditedValues((prev)=>({...prev,[field]:value}));	
	}

	const saveOnBlur = () =>{
		// setEditedValues((prev)=>({...prev,[field]:value}));
		setIsEditing(false);
		setEditingField("");
	}
	
	const handleSaveButton = () =>{
		

		setTasks((tasks) => tasks.map((task)=>
			{
				console.log("selected task id: "+selectedTask.id+" task id "+task.id);
				return (task.id === selectedTask.id ? editedValues : task);
			}

	));
		setToDoTasks((tasks) => tasks.map((task)=>(task.id === selectedTask.id ? editedValues : task)));
		setIsEditing(false);
	    setEditingField("");
		setHasEdited(false);
		setOpenTask(false);
		
		console.log("Save priority: "+editedValues.priority);
	}

	const handleDeleteTask =(task) =>{

		const updatedTasks = tasks.filter( t => t !== task);
		const updatedToDoTasks= toDoTasks.filter( t => t !== task); //creates a new array , adds tasks that satisfies the conditions
		const updatedProgressTasks = progressTasks. filter( t => t !== task);
		const updateCompletedTasks = completedTasks.filter( t => t !== task);

		setToDoTasks(updatedToDoTasks);
		setTasks(updatedTasks);
		setProgressTasks(updatedProgressTasks);
		setCompletedTasks(updateCompletedTasks);
		setOpenTask(false);
	}

	const handlePushBack = (task ) => {
		task.status="Incomplete"
		const updatedProgressTasks = progressTasks. filter( t => t.id !== task.id);
		setToDoTasks([...toDoTasks,task]);

		const updatedTasks = tasks.map( t => { t.id = task.id ? task : t});

		setProgressTasks(updatedProgressTasks);
		setTasks(updatedTasks);
		
		
	}
	
	const handleReopenTask = (task) => {

		task.status ="In Progress"
		const updatedCompletedTasks = completedTasks.filter( t =>t.id!=task.id);

		setCompletedTasks(updatedCompletedTasks);
		setProgressTasks([...progressTasks,task]);
		
		const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
		const updatedToDoTasks = toDoTasks.map(t => t.id === task.id ? task : t);

		setTasks(updatedTasks);
		setToDoTasks(updatedToDoTasks);
	}

	return(
		<div className="mainPage">
			{/* <img src={background}></img> */}
		    <h1 className="title">TASK MANAGEMENT</h1>

			<div className="container">
				
			<div className="toDo">
				<h2>TO DO</h2>
				<div  className="toDoBody">
					<ul>
						{toDoTasks.map((task,index) =>{
							//console.log(task.taskTitle);

							return(
								<li key={index} className="body1" onClick= {() => openTaskDialog(task)}> 
								<div className={`priority priority-${task.priority.toLowerCase()}`}> {task.priority}</div>
								Title: {task.title} <br/>
								{task.description && 
								<><span>Description: {task.description}</span><br /></>
								}
								
								{/* Due Date: {task.dueDate} <br/> */}
								{/* Status: {task.status}<br/> */}
								<FontAwesomeIcon icon={faCalendarDays} style={{color: "#a8a4a4",}}/> {task.dueDate} 
								</li>
							);
						}

						 )
						}
						
					</ul> 

					<Dialog open ={openTask} onClose={taskClose}>
						<DialogTitle>Task Details</DialogTitle>
						<DialogContent>
							<div className="taskDialog">
								
								<p onClick={() => {startEditing("title")}}> <strong> Task Title :</strong>
									
									{isEditing && editingField === "title"?
									(<input onChange={(e) => handleEditChange("title",e.target.value)}
									onBlur={saveOnBlur}
									onKeyDown={(e)=> e.key ==='Enter' && saveOnBlur}
									autoFocus
									/>) :
									(<span>{editedValues.title ?? "empty"}</span>)
									}
								</p>

								{/* {selectedTask.description !== "" && */}
								<p onClick={() => {startEditing("description")}}> <strong> Description :</strong>
									
								{isEditing && editingField === "description"?
								(<input onChange={(e) => handleEditChange("description",e.target.value)}
								onBlur={saveOnBlur}
								onKeyDown={(e)=> e.key ==='Enter' && saveOnBlur}
								autoFocus
								/>) :
								(<span>{editedValues.description ?? "empty"}</span>)
								}</p>


								 {/* } */}

								<p onClick={() => {startEditing("priority")}}> <strong> Priority :</strong>
							
									{isEditing && editingField === "priority"?
									(<select value={editedValues.priority} onChange={(e) => handleEditChange("priority",e.target.value)}
									onBlur={saveOnBlur}
									onKeyDown={(e)=> e.key ==='Enter' && saveOnBlur}
									autoFocus >
						
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>

								</select> 
									
								) :
									(<span>{editedValues.priority ?? "empty"}</span>)
									}</p>
							

								<p onClick={() => {startEditing("dueDate")}}> <strong> Due Date :</strong>
									
									{isEditing && editingField === "dueDate"?
									(<input 
										type="date"
										onChange={(e) => {
											const date = e.target.value;
											if(date!=''){
												const [year, month, day] = date.split('-');
												const formattedDate = `${month}-${day}-${year}`; // MM-DD-YYYY
												handleEditChange("dueDate",formattedDate);
											}	  
										}}
										value={toInputDateFormat(editedValues.dueDate)}   
										min={getTodayDate()}	
									onBlur={saveOnBlur}
									onKeyDown={(e)=> e.key ==='Enter' && saveOnBlur}
									autoFocus
									/>) :
									(<span>{editedValues.dueDate ?? "empty"}</span>)
									}
								</p>

							
							    <Button onClick={()=>{startEditing("status");
									setEditedValues((prev)=>({...prev,"status":"In Progress"}));	
									handleStartTask(editedValues);
								}}> Start Task
								
								 </Button>
								<Button onClick={()=>{handleDeleteTask(selectedTask)}}> Delete Task </Button>

								{hasEdited &&
								<Button onClick={()=>{
									console.log(" save click : "+ selectedTask.title);
									handleSaveButton();}}>Save</Button>
								}	

						
							  <FontAwesomeIcon icon={faRectangleXmark} style={{ fontSize: '30px', color: 'red' }}
							  onClick={taskClose}/>
							
							</div>


						</DialogContent>
					</Dialog>
					<button className="addTask" onClick={handleClickOpen} > Add Task
					<FaPlus/> 
					</button>
			
				</div>
			
				<Dialog open={open} onClose={handleClose}>

					<DialogTitle>ADD A NEW TASK</DialogTitle>
					<DialogContent>

						<div className="dialog">
							<div>
								<label>Task Title:
								<input
								type="text"
								value={taskTitle}
								onChange={(e) =>setTaskTitle(e.target.value)}
								placeholder="Enter Task Title" />
								</label>
								
								
							</div>	

							<div>
								<label>Task Description:
								<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter Task Description"
								/>
								</label>
							</div>	
							<div>
								<label> Task Priority:
								<select value={priority} onChange={(e) => setPriority(e.target.value)} >
						
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>

								</select>
								</label>
							</div> 	
							<div>
								<label>Due Date:
								

								<input 
								type="date" 
								
								onChange={(e) => {
									const date = e.target.value;
									alert(e.target.value);
									
									if(date!=''){
										const [year, month, day] = date.split('-');
									    const formattedDate = `${month}-${day}-${year}`; // MM-DD-YYYY
									    setDueDate(formattedDate); 
									}
									
								  }}
								
							    value={toInputDateFormat(dueDate)}   
								placeholder="Select a Date"
								
								min={getTodayDate()}
								/>


								</label>
							</div>
						</div>
						
					</DialogContent>
					<DialogActions>
						<button onClick={handleAddTask} >Add</button>
						<button onClick={handleClose} >Close</button>
					</DialogActions>
				</Dialog>	


			</div>
			<div className="inProgress">
				<h2>IN PROGRESS</h2>

				<div className="progressBody">
					
					<ul>
						{progressTasks.map((task,index) =>{
							//console.log(task.taskTitle);

							return(
								<li key={index} className="body1"> 
								<div className={`priority priority-${task.priority.toLowerCase()}`}> {task.priority}</div>
								Title: {task.title} <br/>
								{task.description && 
								<><span>Description: {task.description}</span> <br/></>}
								
								<FontAwesomeIcon icon={faCalendarDays} style={{color: "#a8a4a4",}}/> {task.dueDate} 
								

								<div className="change_status">
								
								<FontAwesomeIcon icon={faArrowsRotate} style={{color: "#bbbcbf",}} onClick={()=>{handlePushBack(task)}}/>
								<span className="tooltip">Return to To-Do list</span>
								
								</div>
								

								<div className="change_status">
								<FontAwesomeIcon icon={faCircleCheck}  onClick={()=>{handleTaskCompletion(task)}}/>
								<span className="tooltip">Mark task as completed</span>
								
								</div>
								
								
								{
								/* data-tip="Mark task as completed"<ReactTooltip place="top" effect="solid" /> */}

								</li>
							);
						}

						 )
						}
						
					</ul>
			
				</div>
				
			</div>

			<div className="done">
				<h2>DONE</h2>
				<ul>
						{completedTasks.map((task,index) =>{
							//console.log(task.taskTitle);

							return(
								<li key={index} className="body1"> 
								<div className={`priority priority-${task.priority.toLowerCase()}`}> {task.priority}</div>
								Title: {task.title} <br/>
								{task.description &&
								<><span>Description: {task.description}</span><br/></>}
							
							    <FontAwesomeIcon icon={faCalendarDays} style={{color: "#a8a4a4",}}/> {task.dueDate} 

								<div className="change_status">
								
								<FontAwesomeIcon icon={faArrowsRotate} style={{color: "#bbbcbf",}} onClick={()=>{handleReopenTask(task)}}/>
								<span className="tooltip">Reopen Task</span>
								
								</div>
								
								</li>
							);
						}

						 )
						}
						
					</ul>
			</div>

			</div>
			

			
	
		
		</div>
		
	

	
	
	
	)
}

export default Dashboard