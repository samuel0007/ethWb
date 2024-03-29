import React from 'react';
import P5QuadTrees from '../sketches/quadtrees/quadtrees';


const QuadtreesPage: React.FC = () => {
  return (
    <div className="mainPage p-10 h-full bg-white">
      <div className="flex justify-center align-center">
        <P5QuadTrees />
      </div>
    </div>
  );
}

export default QuadtreesPage;
