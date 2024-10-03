import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../utils/constants';

function Navigation() {

  return (
    <div className="h-[48px] py-2 border text-sm flex gap-10 justify-center items-center bg-red-600">
      {navigation.map(el=>(<NavLink className={({isActive}) => 
        isActive ? 'pr-12  font-bold hover:text-white' : "pr-12 hover:text-white"
      
      } key={el.id} to={el.path}>{el.value}</NavLink>))}
    </div>
  );
}

export default Navigation;
