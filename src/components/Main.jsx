import React from 'react';
import Film from './Film';
import People from './People';
import Planets from './Planets';
import Species from './Species';
import Starships from './Starships';
import Vehicles from './Vehicles';

const Main = ({tab}) => {
  
  return (
    <div>
    {tab=='Films'&&  <Film />}
    {tab=='People'&&     <People/>}
    {tab=='Planets'&&    <Planets/>}
    {tab=='Species'&&    <Species/>}
    {tab=='Starships'&&    <Starships/>}
    {tab=='Vehicles'&&    <Vehicles/>}
    </div>
  );
};

export default Main;
