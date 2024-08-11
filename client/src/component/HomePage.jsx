import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import SearchSection from "./SearchSection";

function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [result, setResults] = useState([]);

  const handleInput = (e) => {
    const input = e.target.value;
    setSearchText(input);
  };

  const getPosts = async () => {
    try {
      const result = await axios.get(
        `https://front-end-mini-project-server-git-main-apiktns-projects.vercel.app
/trips?keywords=${searchText}`
      );
      console.log(result);
      setResults(result.data.data);
    } catch (error) {
      console.error("ไม่พบข้อมูล", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [searchText]);

  const handleCategory = (category) => {
    setSearchText((Text) => (Text ? `${Text} ${category}` : category));
  };

  return (
    <div className="home-page">
      <h1 className="title">เที่ยวไหนดี</h1>
      <SearchSection searchText={searchText} handleInput={handleInput} />
      <div className="post-container">
        {result.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onCategoryClick={handleCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
