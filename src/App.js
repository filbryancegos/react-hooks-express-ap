import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Employee from './pages/Employee';
import AddEmployee from './components/Employee/AddEmployee';
import UpdateEmployee from './components/Employee/UpdateEmployee';
import AddTutorial from './components/AddTutorial';
import UpdateTutorial from './components/UpdateTutorial';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
	<Router>
		<div className="App">
			<Nav />
			<div className="container m-auto pt-8">
				<Switch>
					<Route path="/" exact component={Home}></Route>
					<Route path="/create" exact component={AddTutorial}></Route>
					<Route path="/edit/:id" component={UpdateTutorial} />
					<Route path="/employee" exact component={Employee} />
					<Route path="/employee/create" exact component={AddEmployee} />
					<Route path="/employee/:id" component={UpdateEmployee} />
				</Switch>
			</div>
		</div>
	</Router>
  );
}

export default App;
