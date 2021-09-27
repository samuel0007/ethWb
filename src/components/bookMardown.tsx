import React from "react";
import { HashLink } from "react-router-hash-link";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import 'katex/dist/katex.min.css'
import "github-markdown-css";
import "./markdown.css";  

const RouterLink: any = (props:any) => {
  return props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <HashLink to={props.href}>{props.children}</HashLink>
  );
}

type BookMardownProps = {
  source: string;
};

const BookMarkdown: React.FC<BookMardownProps> = (props) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        remarkPlugins={[remarkGfm, remarkSlug, remarkMath]}
        children={props.source}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={atomDark}
                showLineNumbers={true}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          a: RouterLink,
        }}
      ></ReactMarkdown>
    </div>
  );
};

export default BookMarkdown;
