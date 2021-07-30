import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";

export default function Home (props) {
	const [tutorials, setTutorials] = useState([]);
	const [currentTutorial, setCurrentTutorial] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");

	useEffect(() => {
		retrieveTutorials();
	}, []);

	const onChangeSearchTitle = e => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	  const retrieveTutorials = () => {
		TutorialDataService.getAll()
		  .then(response => {
			setTutorials(response.data);
			console.log(response.data);
		  })
		  .catch(e => {
			console.log(e);
		  });
	  };

	  const findByTitle = () => {
		TutorialDataService.findByTitle(searchTitle)
		.then(response => {
		  setTutorials(response.data);
		  console.log(response.data);
		})
		.catch(e => {
		  console.log(e);
		});
	  }

	  const deleteTutorial = (id) => {
		TutorialDataService.remove(id)
		.then(response => {
			retrieveTutorials();
			props.history.push("/");
		  })
		  .catch(e => {
			console.log(e);
		  });
	  }
	return (
		<>
			<div className="">
				<div className="grid grid-cols-2">
					<h1 className="uppercase text-left font-bold">Todo List</h1>
					
					<div className="flex space-x-2 w-full">
						<div className="flex space-x-2 w-full">
							<input 
								className="w-full border border-gray-400 rounded-md w-full  px-2" 
								type="text"
								value={searchTitle}
								onChange={onChangeSearchTitle}
								name="search"
							/>
							<button onClick={findByTitle} className="bg-red-500 text-white px-12 py-2 rounded-md hover:bg-red-600">search</button>
						</div>
						<NavLink to='/create'>
							<button className="bg-green-500 text-white px-12 py-2 rounded-md hover:bg-green-600">Create</button>
						</NavLink>
					</div>

				</div>
				
				<div className="pt-6">
					<table className="table-auto w-full text-left">
						<thead className="bg-blue-400 text-white">
							<tr>
								<th className="p-4">Title</th>
								<th className="p-4">Description</th>
								<th className="p-4 text-right">Action</th>
							</tr>
						</thead>
						<tbody>
							{
								tutorials && tutorials.map(item => 
									<tr key={item.id} className="border-b-2 border-gray-200">
										<td className="p-4">{item.title}</td>
										<td className="p-4">{item.description}</td>
										<td className="p-4">
											<div className="flex justify-end space-x-6">
												<button className="bg-yellow-300 text-white px-6 py-2 rounded-md hover:bg-yellow-500">Edit</button>
												<button onClick={() => deleteTutorial(item.id)} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700">Delete</button>
											</div>
										</td>
									</tr>
								)
							}
						
						
							
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

