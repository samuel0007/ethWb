import React from 'react';
import './Home.css';
import P5PhyloSketch from '../sketches/phylo';

import P5RainSketch from '../sketches/rain';
import P5TaylorSketch  from '../sketches/taylor';


const Home: React.FC = () => {
  return (
    <div className="mainPage bg-gray-200">
      <div className="mainName w-full pl-32 pt-10 text-left font-medium text-5xl">
        <p>HI! I'M <em className="text-red-500 not-italic">SAMUEL</em></p>
      </div>
      <div className="flex justify-center align-center pt-10 relative">
        <P5TaylorSketch />
      </div>
      <div className="flex justify-center align-center pt-10">
        <P5PhyloSketch />
      </div>
      <div className="flex justify-center align-center">
        <P5RainSketch />
      </div>
    </div>
  );
}

export default Home;
