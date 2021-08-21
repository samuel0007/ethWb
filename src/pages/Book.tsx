import React, { useState, useEffect } from "react";
import BookMarkdown from "../components/bookMardown";
import "./Book.css";


const BookComponent: React.FC = () => {

  const file_name = 'test.md';
  const [post, setPost] = useState('');

    useEffect(() => {
        import(`../../public/book/${file_name}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });

  return (
    <div className="bg-white w-full flex">
      <nav className="navbar w-1/4 flex flex-col h-screen sticky top-0 relative">
        <h1 className="absolute p-5 text-lg font-semibold">Introduction to C++ ✍️ </h1>
        <ul className="absolute top-24 w-full navbar-nav absolute px-1 overflow-y-auto ">
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
          <li className="px-5 py-2">
            Lecture 1
          </li>
        </ul>
      </nav>
      <div className="main w-full">
        <BookMarkdown source={post}></BookMarkdown>
      </div>
    </div>
  );
}

export default BookComponent;
