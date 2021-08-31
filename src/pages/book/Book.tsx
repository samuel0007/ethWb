import React, { useState } from "react";
import PageComponent from "./page";
import "./Book.css";


const importAll = (r: __WebpackModuleApi.RequireContext): string[] => {
  return r.keys().map((file:string) => file.replace(/.\//, ""));
};

type bookProps = {
  title: string;
  rep: string;
}

const BookComponent: React.FC<bookProps> = (props) => { 
  const [page, setPage] = useState(0);
  const files = props.rep === "intro" ? importAll(
      require.context(`../../../public/intro/`, false, /\.md$/)
    ) : importAll(
      require.context(`../../../public/algo/`, false, /\.md$/)
    );
  
  const titles = files.map((file) => file.replace(/^\d+_/, "").replace(/\.md$/, "").replace(/_/, " "));
  
  return (
    <div className="bg-white w-full flex">
      <nav className="navbar w-1/4 flex flex-col h-screen sticky top-0 relative">
        <h1 className="absolute p-5 text-xl font-semibold">
          {props.title}
        </h1>
        <ul className="absolute top-20 w-full navbar-nav absolute px-1 overflow-y-auto ">
          {titles.map((title, id) => (
            <li className="px-5">
              <button className={`hover:text-blue-600 text-lg focus:outline-none ${id===page ? "text-blue-600 font-bold" : "font-semibold"}`} onClick={() => setPage(id)}>{title}</button>
            </li> 
          ))}
        </ul>
      </nav>
      <div className="main w-full">
        <PageComponent rep={props.rep} content={files[page]}></PageComponent>
      </div>
    </div>
  );
};

export default BookComponent;
