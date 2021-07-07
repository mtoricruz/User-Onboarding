import React from 'react';

function Form(props){
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        disabled,
        errors,
    } = props


    return (
        <form className='user container'>
            <h2>User OnBoarding Form</h2>
            {/* STEP 10 - SHOW ERRORS */}
            <div className='errors'>
                {errors.name}
                {errors.email}
                {errors.password}
            </div>
            {/*///////////////// TEXT INPUTS //////////// */}
            <label>Name:&nbsp;
            <input
                value={values.name}
                onChange={onInputChange}
                name='name'
                type='text'
            /></label>
            <label>Email:&nbsp;
                <input 
                    value={values.email}
                    onChange={onInputChange}
                    name='email'
                    type='text'            
            /></label>
            <label>Password:&nbsp;
                <input 
                    value={values.password}
                    onChange={onInputChange}
                    name='password'
                    type='text'            
            /></label>
            {/*///////////////// CHECKBOXES //////////// */}
            <label><input 
                checked={values.termsofservice}
                onChange={onCheckboxChange}
                name='termsofservice'
                type='checkbox'/> Terms of Service</label>
            {/* ///// DISABLED PROP FROM Adv Form Lesson */}
            <button onClick={onSubmit} disabled={disabled}>Submit</button>
        </form>
    )
} 

export default Form