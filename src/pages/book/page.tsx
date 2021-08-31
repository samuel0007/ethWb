import React, { useState, useEffect } from "react";
import BookMarkdown from "../../components/bookMardown";

type pageProps = {
  content: string;
  rep: string;
}

const PageComponent: React.FC<pageProps> = (props) => {
  const [page, setPage] = useState<string>();

  useEffect(() => {
    import(`../../../public/${props.rep}/${props.content}`)
        .then(res => {
            fetch(res.default)
                .then(res => res.text())
                .then(res => setPage(res))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});
  
  return (
    <div className="main w-full">
        {page ? <BookMarkdown source={page}></BookMarkdown> : <div></div>}
    </div>
  );
};

export default PageComponent;
