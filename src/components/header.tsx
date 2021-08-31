import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="mainHeader w-full h-20 flex justify-between items-center">
      <div className="pl-10 text-xl text-white font-bold">ETH Zurich</div>
      <nav className="pr-20 text-lg flex justify-evenly">
        <NavLink
          className="pr-10 text-white hover:font-bold focus:outline-none"
          activeClassName="font-bold"
          to="/intro"
        >
          Introduction to C++
        </NavLink>
        <NavLink
          className="pr-10 text-white hover:font-bold focus:outline-none"
          activeClassName="font-bold"
          to="/algo"
        >
          Algorithms
        </NavLink>
        <NavLink
          className="pr-10 text-white hover:font-bold focus:outline-none"
          activeClassName="font-bold"
          to="/quadtrees"
        >
          Quadtrees
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
