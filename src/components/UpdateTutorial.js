import { NavLink } from 'react-router-dom';

export default function UpdateTutorial() {
	return (
		<>
			<h1 className="text-left uppercase font-bold">Update Tutorial</h1>

			<div className="grid grid-cols-2 pt-6">
				<form>
					<div className="form-group mb-12">
						<div className="text-left">
							<label htmlFor="title" className="uppercase">Title</label>
						</div>
						<input className="w-full border border-gray-400	rounded-sm h-12 mt-2" type="text"/>
					</div>

					<div className="form-group mb-12">
						<div className="text-left">
							<label htmlFor="title" className="uppercase">Description</label>
						</div>
						<textarea name="description" className="w-full border border-gray-400 rounded-sm mt-2" cols="30" rows="5"></textarea>
					</div>

					<div className="flex justify-end">
						<button className="bg-green-500 text-white px-12 py-2 rounded-md hover:bg-green-600">Update</button>
					</div>
					
				</form>
			</div>
		</>
	)
}


