
import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Modal  from "../components/Modal";
import { IS_LOGGED_MODAL } from '../actions/type.js'
import { retrieveEmployee } from "../actions/employee";

export default function Employee() {

	const [employeeID, setemployeeID] = useState(null)
	const employees = useSelector(state => state.employees);
	const modal = useSelector(state => state.modal);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(retrieveEmployee());
	  }, []);

	  const deleteEmployee = (id) => {
		dispatch({
			type: IS_LOGGED_MODAL,
	 	 });
		  setemployeeID(id)
	  }

	return (
		<>
		<Modal employeeID={employeeID}  />
			
			<div className="grid grid-cols-2">
				<div className="flex justify-start">
					<NavLink to='/employee/create'>
						<button className="bg-yellow-500 text-white px-6 py-2  hover:bg-yellow-700">Add Employee</button>
					</NavLink>
				</div>

				<div className="flex space-x-2 w-full">
					<input 
						className="w-full border border-gray-400 px-2" 
						type="text"
						name="search"
					/>
					<button className="bg-green-500 text-white px-12 py-2 hover:bg-green-600">search</button>
				</div>
				
			</div>
			<div className="pt-6">
				<table className="table-auto w-full text-left">
					<thead className="bg-blue-400 text-white">
						<tr>
							<th className="p-4">First</th>
							<th className="p-4">Last</th>
							<th className="p-4">Email</th>
							<th className="p-4">Phone</th>
							<th className="p-4">Location</th>
							<th className="p-4">Hobby</th>
							<th className="p-4 text-right">Action</th>
						</tr>
					</thead>
					<tbody>
						{
							employees && employees.map(employee =>
								<tr key={employee.id} className="border-b-2 border-gray-200">
									<td className="p-4">{employee.first}</td>
									<td className="p-4">{employee.last}</td>
									<td className="p-4">{employee.email}</td>
									<td className="p-4">{employee.phone}</td>
									<td className="p-4">{employee.location}</td>
									<td className="p-4">{employee.hobby}</td>
									<td className="p-4">
										<div className="flex justify-end space-x-2">
											<NavLink to={`employee/${employee.id}`}>
												<button className="bg-yellow-300 text-black px-6 py-2  hover:bg-yellow-500">Edit</button>
											</NavLink>
											<button onClick={() => deleteEmployee(employee.id)} className="bg-red-500 text-white px-6 py-2  hover:bg-red-700">Delete</button>
										</div>
									</td>
								</tr>
							)
						}
						
					</tbody>
				</table>
			</div>
			
		</>
	)
}
