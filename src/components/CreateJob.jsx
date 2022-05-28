import { Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import JobContext from "../contexts/JobContext";
import Button from "@mui/material/Button";


function CreateJob() {

	const { allJobs, setAllJobs} = useContext(JobContext);


	// *********** Yup Validation ***********
	const validation = Yup.object({
		name: Yup.string()
			.max(255, "Max 255 characters")
			.required("Ürün adı zorunlu"),
		category: Yup.string()
			.typeError("Katagori seçiniz")
			.required("Katagori zorunlu"),
	});
	// ************************************** 



	const addTodo = (values) => {

		const newTodos = [values, ...allJobs ];

		setAllJobs(newTodos);
		
		localStorage.setItem("jobs", JSON.stringify(newTodos));

	};


	// const editTodo = (id) => {

	// 	const data = allJobs.filter(job => job.id === id);

	// 	data[0].name = "emre";


	// 	const ayniolmayan = allJobs.filter(job => job.id !== id);

	// 	const newData = [...data, ...ayniolmayan];

	// 	setAllJobs(newData);

	// 	localStorage.setItem("jobs", JSON.stringify(newData));

	// 	console.log(data);

		
	// };

	





	return (<>
		<div className="add-job-title"><h2>Create New Job</h2></div>
		<div className="create-job">
		
			<Formik
				initialValues={{
					name: "",
					category: "",
					id: "",
				}}
				validationSchema={validation}
				onSubmit={(values, {resetForm}) => {

					const data = {name: values.name, category: values.category, id: allJobs.length + 1};

					addTodo(data);
					
					setTimeout(() => {resetForm();}, 100);
				}}
			>
				{({
					values,
					handleChange,
					handleSubmit,
				
				}) => (
					<>
						<form className="form" onSubmit={handleSubmit}>

							<div className="job-name">
								<label htmlFor="name">Job Name</label>
								<input type="text" id="name" name="name" className="job-input" value={values.name} onChange={handleChange}/>
							</div>

							<div className="job-priority">
								<label htmlFor="category">Job Priority</label>
								<select name="category"
									value={values.category}
									onChange={handleChange}>
                                        
									<option label="Choose" disabled/>
									<option label="Urgent" value="urgent"/>
									<option label="Regular" value="regular"/>
									<option label="Trivial" value="trivial"/>
								</select>
							</div>

							
							<div className="submit-btn">
								<label htmlFor="">x</label>
								<Button type="submit" variant="contained">Create</Button>
							</div>

                            
						</form>
					</>
				)}
			</Formik>


            

			{/* {allJobs.map((item,index) => {
				return (
					<div onClick={() => {editTodo(item.id);}} key={index}>{item.name} | {item.category} | {item.id}</div>
				);
			})} */}

		</div>

	</>
	);
}

export default CreateJob;