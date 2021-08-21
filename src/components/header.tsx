import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="mainHeader w-full h-20 flex justify-between items-center">
      <div className="pl-10 text-xl">ETH Zurich</div>
      <nav className="pr-20 text-lg flex justify-evenly">
        <NavLink
          className="pr-10 hover:text-red-500 focus:outline-none"
          activeClassName="text-red-500 hover:text-red-300"
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className="pr-10 hover:text-red-500 focus:outline-none"
          activeClassName="text-red-500 hover:text-red-300"
          to="/book"
        >
          Introduction to C++
        </NavLink>
        <NavLink
          className="pr-10 hover:text-red-500 focus:outline-none"
          activeClassName="text-red-500 hover:text-red-300"
          to="/marching"
        >
          Ray Marching
        </NavLink>
        <NavLink
          className="pr-10 hover:text-red-500 focus:outline-none"
          activeClassName="text-red-500 hover:text-red-300"
          to="/quadtrees"
        >
          Quadtrees
        </NavLink>
        <button className="hover:text-red-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Header;
