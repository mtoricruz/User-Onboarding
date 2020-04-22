import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form.js';
import User from './User'
import axios from 'axios';
import * as yup from 'yup'

// URL for our [GET] & [POST] requests
const url = 'https://reqres.in/api/users'

// the shape of  the state that drives the form
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  email: '',
  password: '',
  ///// CHECKBOX INPUTS /////
  termsofservice: false,
}

// the shape of the validation errors object
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  termsofservice: false,
}

// STEP 7 - BUILD A SCHEMA FOR VALIDATION

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must have at least 2 characters!')
    .required('Name is required!'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must have at least 8 characters!')
    .required('Password is required'),
})

function App() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  // STEP 1 - KEEP TRACK OF WHETHER SUBMIT BUTTON IS DISABLED!
  const [formDisabled, setFormDisabled] = useState(true)

  // STEP 2 - KEEP TRACK OF THE VALIDATION ERRORS!
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  {/* /////////////////// We don't need a get request ///////////// */}

  // const getUsers = () => {
  //   // STEP 3 - FETCH USERS FROM API
  //   // and set them in state
  //   axios.get(url)
  //     .then(res => {
  //       setUsers(res.data)
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       debugger
  //     })
  // }

  // useEffect(() => {
  //   // STEP 4 - AFTER FIRST DOM SURGERY WE NEED USERS FROM API
  //   getUsers()
  // }, [])

  const postUser = user => {
    // STEP 5 - FUNCTION TO POST A NEW USER TO THE API
    // and set the updated list of users in state
    // the endpoint respons (on success) with the new user (with id!!)
    axios.post(url, user)
      .then(res => {
        setUsers([...users, res.data])
        console.log(res)
      })
      .catch(err => {
        debugger
      })
  }

  useEffect(() => {
    // STEP 8 - IF FORM VALUES CHANGE, THIS WILL RUN VALIDATION
    // and use them to enable/disable submit button
    formSchema.isValid(formValues)
      .then(valid => { //either true or false
        setFormDisabled(!valid)
      })
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      termsofservice: formValues.termsofservice === true
    }

    // STEP 6 - POST OUR FRIEND TO API
    postUser(newUser)
    setFormValues(initialFormValues)
  }

  const onInputChange = evt => {
    // PULL THESE OUT AHEAD OF TIME
    const name = evt.target.name
    const value = evt.target.value

    // STEP 9 - IF THE FORM VALUES CHANGE, THIS WILL RUN VALIDATION
    // and update the form errors slice of state (so the form can display errors)
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        // CLEAR ERROR
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        // SET THE ERROR IN THE RIGHT PLACE
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const isChecked = evt.target.checked

    setFormValues({
      ...formValues,
      termsofservice: {
        [name]: isChecked,
      }
    })
  }

  return (
    <div className="App">
      <Form 
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        disabled={formDisabled}
        errors={formErrors}
      />

    {
      users.map(eachUser => {
        return (
          <User key={eachUser.id} details={eachUser} />
        )
      })
    }
    </div>
  );
}

export default App;
