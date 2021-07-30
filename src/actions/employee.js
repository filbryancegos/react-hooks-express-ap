import {
	CREATE_EMPLOYEE,
	RETRIEVE_EMPLOYEES,
	UPDATE_EMPLOYEE,
	DELETE_EMPLOYEE,
	DELETE_ALL_EMPLOYEES
} from './type.js'

import EmployeeDataService from "../services/EmployeeServices";

export const createEmployee = (first, last, email, phone, location, hobby) => async (dispatch) => {
	try {
	  const res = await EmployeeDataService.create({ first, last, email, phone, location, hobby });
	
	  console.log(res)
	  dispatch({
		type: CREATE_EMPLOYEE,
		payload: res.data,
	  });
  
	  return Promise.resolve(res.data);
	} catch (err) {
	  return Promise.reject(err);
	}
  };
  
  export const retrieveEmployee = () => async (dispatch) => {
	  console.log(dispatch)
	try {
	  const res = await EmployeeDataService.getAll();
  
	  dispatch({
		type: RETRIEVE_EMPLOYEES,
		payload: res.data,
	  });
	} catch (err) {
	  console.log(err);
	}
  };
  
  export const updateEmployee = (id, data) => async (dispatch) => {
	try {
	  const res = await EmployeeDataService.update(id, data);

		console.log(res)
  
	  dispatch({
		type: UPDATE_EMPLOYEE,
		payload: data,
	  });
  
	  return Promise.resolve(res.data);
	} catch (err) {
	  return Promise.reject(err);
	}
  };
  
  export const deleteEmployee = (id) => async (dispatch) => {
	try {
	  await EmployeeDataService.remove(id);
  
	  dispatch({
		type: DELETE_EMPLOYEE,
		payload: { id },
	  });
	} catch (err) {
	  console.log(err);
	}
  };
  
  export const deleteAllEmployees = () => async (dispatch) => {
	try {
	  const res = await EmployeeDataService.removeAll();
  
	  dispatch({
		type: DELETE_ALL_EMPLOYEES,
		payload: res.data,
	  });
  
	  return Promise.resolve(res.data);
	} catch (err) {
	  return Promise.reject(err);
	}
  };
  
  export const findEmployeeByTitle = (title) => async (dispatch) => {
	try {
	  const res = await EmployeeDataService.findByTitle(title);
  
	  dispatch({
		type: RETRIEVE_EMPLOYEES,
		payload: res.data,
	  });
	} catch (err) {
	  console.log(err);
	}
  };