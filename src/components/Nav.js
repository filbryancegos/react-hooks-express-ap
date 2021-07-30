
import React from 'react'
import { NavLink } from 'react-router-dom';
export default function Nav() {
	return (
		<header className="bg-black">
			<div className="container m-auto">
				<ul className="text-white flex">
					<NavLink to='/'>
						<li className="p-4">Home</li>
					</NavLink>
					<NavLink to='/employee'>
						<li className="p-4">Employee</li>
					</NavLink>
				</ul>
			</div>
		</header>
	)
}


