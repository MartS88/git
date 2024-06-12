import React from 'react';
import { IUser } from '../../types';
import classes from '../../User.module.scss';
import Skills from '../skills/Skills';


const User:React.FC<IUser> = ({name,age}) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <div className={classes.user}>

      <form>

        <h1>Form</h1>

        {name.length >= 1 && <h2>Form2</h2>}
        <div>
        <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter name" autoComplete="off"
          value='Mart' onChange={() => (console.log('da'))}
          />
        </div>
        <img  alt='Mart'/>
        <div>
          <span>Age</span>
          My own
        </div>
        <div>
          <label htmlFor="job-location">Job location</label>
          <select id="job-location">
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" id="terms" /> I agree to the terms and conditions
          </label>
        </div>
        <button onClick={handleClick} type="submit">Submit</button>
      </form>


      <Skills skills={['REACT','NODEJS','WEB3']}/>

    </div>
  );
};

export default User;
