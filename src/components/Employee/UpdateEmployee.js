import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import EmployeeServices from "../../services/EmployeeServices";
import { updateEmployee } from "../../actions/employee";

export default function UpdateEmployee(props) {
	const initialEmployeeState = {
		first: '',
		last: '',
		email: '',
		phone: '',
		location: '',
		hobby: ''
	}


	const [selectedEmployee, setSelectedEmployee] = useState(initialEmployeeState)
	const [message, setMessage] = useState(false);

	const dispatch = useDispatch();

	const getEmployee = id => {
		EmployeeServices.get(id)
		  .then(response => {
			setSelectedEmployee(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };

	const history = useHistory();
	const currentUserId = props.match.params.id;

	useEffect(() => {
		getEmployee(currentUserId);
		return () => {
			getEmployee(currentUserId)
		}
	}, [currentUserId]);

	
	const onChange = (e) => {
		const { name,value} = e.target
		setSelectedEmployee({ ...selectedEmployee, [name]: value })
	}
	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(updateEmployee(selectedEmployee.id, selectedEmployee))
		  .then(response => {
			setSelectedEmployee(initialEmployeeState)
			setMessage(true);
			  setTimeout( ()=> {
				setMessage(false);
			  },2000)
		  })
		  .catch(e => {
		  });
	  };

	return (
		<>
			{ message && 
				<div className="flex mb-6 justify-between items-center space-x-10">
					<div className="bg-green-400 rounded-sm w-full">
					<p className="text-left px-4 py-2 text-white">succesfully updated</p>
					</div>
				</div>
			}
				<div className="flex justify-start">
					<NavLink to='/employee'>
						<button type="submit" className="bg-red-500 text-white px-6 py-2  hover:bg-green-700 inline">cancel</button>
					</NavLink>
				</div>
				
				<div className="mt-8">
					<form onSubmit={onSubmit}>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">Frist Name</label>
								</div>
								<input
								value={selectedEmployee.first} 
								onChange={onChange}
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="text"
								name="first"
								/>
							</div>
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">Last Name</label>
								</div>
								<input 
								value={selectedEmployee.last} 
								onChange={onChange}
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="text"
								name="last"
								/>
							</div>
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">Email</label>
								</div>
								<input
								value={selectedEmployee.email} 
								onChange={onChange} 
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="email"
								name="email"
								/>
							</div>
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">phone</label>
								</div>
								<input
								value={selectedEmployee.phone} 
								onChange={onChange}
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="text"
								name="phone"
								/>
							</div>
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">Location</label>
								</div>
								<input
								value={selectedEmployee.location} 
								onChange={onChange}
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="text"
								name="location"
								/>
							</div>
							<div className="form-group mb-12">
								<div className="text-left">
									<label htmlFor="title" className="uppercase">Hobby</label>
								</div>
								<input
								value={selectedEmployee.hobby}  
								onChange={onChange}
								className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
								type="text"
								name="hobby"
								/>
							</div>
						</div>
						<div className="flex justify-center mt-8">
							<button type="submit" className="bg-green-500 text-white px-6 py-2  hover:bg-green-700 inline">Update Employee</button>
						</div>
					</form>
				
				</div>			
		</>
	)
}