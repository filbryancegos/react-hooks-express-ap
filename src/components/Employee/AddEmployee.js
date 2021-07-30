import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { createEmployee } from "../../actions/employee";
import { NavLink } from 'react-router-dom';
import Modal  from "../../components/Modal";

export default function AddEmployee() {

	const initialEmployeeState = {
		id: null,
		first: "",
		last: "",
		email:"",
		phone:"",
		location:"",
		hobby:"",
		published: false
	  };

	  const errorMessages = {
		first: "",
		last: "",
		email:"",
		phone:"",
		location:"",
		hobby:"",
	  }

	  const [employee, setEmployee] = useState(initialEmployeeState);
	  const [error, setError] = useState(errorMessages);
	  const [submitted, setSubmitted] = useState(false);

	  const dispatch = useDispatch();
	  const handleInputChange = event => {
		const { name, value } = event.target;
		setEmployee({ ...employee, [name]: value });
	  };
	  const saveTutorial = (e) => {
		  e.preventDefault()
		  
		const { first, last, email, phone, location, hobby } = employee;
	
		dispatch(createEmployee(first, last, email, phone, location, hobby))
		  .then(data => {
			setEmployee({
			  id: data.id,
			  first: data.first,
			  last: data.last,
			  email: data.email,
			  phone: data.phone,
			  location: data.location,
			  hobby: data.hobby,
			  published: data.published
			});
			setSubmitted(true);
			
	
		  })
		  .catch(e => {
			const errorsMsg = e.response.data.errors;
			errorsMsg.map(error => {
				errorMessages[error.param] = error.msg
			  })
			setError({...errorMessages})

		  });
	  };

	  const newEmployee = () => {
		setEmployee(initialEmployeeState);
		setError({errorMessages})
		setSubmitted(false);
	  };
	return (
		<>	
			
			<div>
				<div className="flex justify-start">
					<NavLink to='/employee'>
						<button type="submit" className="bg-red-500 text-white px-6 py-2  hover:bg-green-700 inline">cancel</button>
					</NavLink>
				</div>
				<Modal />
				<div className="mt-8">
					{	submitted ?

						<div className="flex mb-6 justify-between items-center space-x-10">
							<div className="bg-green-400 rounded-sm w-full">
							<p className="text-left px-4 py-2 text-white">You submitted successfully!</p>
							</div>
							<button onClick={newEmployee} className="bg-blue-500 text-white px-12 py-2 rounded-sm hover:bg-blue-600">Add</button>
						</div>
						:
						<form onSubmit={saveTutorial}>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">Frist Name</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="text"
									name="first"
									value={employee.first}
									onChange={handleInputChange}
									/>
									{
										error.first && <div className="text-red-500 text-base text-left">{error.first}</div>
									}
									
								</div>
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">Last Name</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="text"
									name="last"
									value={employee.last}
									onChange={handleInputChange}
									/>
									{
										error.last && <div className="text-red-500 text-base text-left">{error.last}</div>
									}
								</div>
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">Email</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="email"
									name="email"
									value={employee.email}
									onChange={handleInputChange}
									/>
									{
										error.email && <div className="text-red-500 text-base text-left">{error.email}</div>
									}
								</div>
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">phone</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="text"
									name="phone"
									value={employee.phone}
									onChange={handleInputChange}
									/>
									{
										error.phone && <div className="text-red-500 text-base text-left">{error.phone}</div>
									}
								</div>
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">Location</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="text"
									name="location"
									value={employee.location}
									onChange={handleInputChange}
									/>
									{
										error.location && <div className="text-red-500 text-base text-left">{error.location}</div>
									}
								</div>
								<div className="form-group mb-12">
									<div className="text-left">
										<label htmlFor="title" className="uppercase">Hobby</label>
									</div>
									<input 
									className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
									type="text"
									name="hobby"
									value={employee.hobby}
									onChange={handleInputChange}
									/>
									{
										error.hobby && <div className="text-red-500 text-base text-left">{error.hobby}</div>
									}
								</div>
							</div>
							<div className="flex justify-center mt-12">
								<button type="submit" className="bg-blue-500 text-white px-6 py-2  hover:bg-blue-700 inline">Add Employee</button>
							</div>
						</form>
					}
				</div>
			</div>
		</>
	)
}