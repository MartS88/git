import React, { ChangeEvent } from 'react';
import { SkillsProps } from '../../types';


const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<string>('0');
  const [value, setValue] = React.useState<string>('1');


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };


  const counterHandler = () => {
    setCount((prevCount) => (parseInt(prevCount) + 1).toString());
  };

  const clickHandler = (value: boolean) => {
    setTimeout(() => {
      setIsLoggedIn(value);
    }, 500);
  };
  return (
    <div>
      <ul>
        {skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <button onClick={counterHandler}>Counter</button>
      <span>{count}</span>
      <input type='text' value={value} onChange={handleChange} />
      <button onClick={() => setCount(value)}>Set</button>
      {isLoggedIn ? <button onClick={() => clickHandler(false)}>Log out</button> :
        <button onClick={() => clickHandler(true)}>Log in</button>}
    </div>
  );
};

export default Skills;
