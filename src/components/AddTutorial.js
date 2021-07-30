import { NavLink } from 'react-router-dom';
import React, {useState} from 'react'

import TutorialDataService from "../services/TutorialService";

export default function AddTutorial() {

	const initialTutorialState = {
		id: null,
		title: "",
		description: "",
		published: false
	};

	const [tutorial, setTutorial] = useState(initialTutorialState);
  	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setTutorial({ ...tutorial, [name]: value });

		console.log(tutorial)
	};

	const saveTutorial = (e) => {
		e.preventDefault();

		const data = {
		title: tutorial.title,
		description: tutorial.description
		};

		console.log(data)

		TutorialDataService.create(data)
		.then(response => {
			setTutorial({
			id: response.data.id,
			title: response.data.title,
			description: response.data.description,
			published: response.data.published
			});
			setSubmitted(true);
			console.log(response.data);
		})
		.catch(e => {
			console.log(e);
		});
	};

	const newTutorial = () => {
		setTutorial(initialTutorialState);
		setSubmitted(false);
	};

	return (
		<>
			<h1 className="text-left uppercase font-bold">Create Tutorial</h1>

			<div className="grid grid-cols-2 pt-6">
				<div>
					{ submitted ?
						<div className="flex mb-6 justify-between items-center space-x-10">
						<div className="bg-yellow-400 rounded-sm w-full">
							<p className="text-left px-4 py-2 text-white">You submitted successfully!</p>
						</div>
						<button onClick={newTutorial} className="bg-red-500 text-white px-12 py-2 rounded-sm hover:bg-red-600">Add</button>
					</div>
					:
					<form onSubmit={saveTutorial}>
						<div className="form-group mb-12">
							<div className="text-left">
								<label htmlFor="title" className="uppercase">Title</label>
							</div>
							<input 
							className="w-full border border-gray-400 rounded-sm h-12 mt-2 px-2" 
							type="text"
							value={tutorial.title}
							onChange={handleInputChange}
							name="title"
							/>
						</div>

						<div className="form-group mb-12">
							<div className="text-left">
								<label htmlFor="title" className="uppercase">Description</label>
							</div>
							<textarea 
							name="description" 
							className="w-full border border-gray-400 rounded-sm mt-2 px-2" 
							cols="30" 
							rows="5"
							value={tutorial.description}
							onChange={handleInputChange}
							name="description"
							></textarea>
						</div>

						<div className="flex justify-end space-x-2">
							<NavLink to='/'>
								<button type="submit" className="bg-blue-500 text-white px-12 py-2 rounded-md hover:bg-blue-600">Back</button>
							</NavLink>
							<button type="submit" className="bg-green-500 text-white px-12 py-2 rounded-md hover:bg-green-600">Create</button>
						</div>
					</form>
					}
				</div>
			</div>
		</>
	)
}


