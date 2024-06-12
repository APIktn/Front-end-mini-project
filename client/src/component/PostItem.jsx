import React from "react";
import "../App.css";
import copyUrlIcon from "./image/copy-url.png";

const PostItem = ({ post, onCategoryClick }) => {
  const descriptionUnder100 = (text) => {
    if (text.length <= 100) {
      return text;
    }
    return text.substring(0, 100) + "...";
  };

  const tagsNoLast = post.tags.slice(0, -1);
  const lastTag = post.tags.slice(-1)[0];

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("copy link แล้ว");
    });
  };

  return (
    <div className="post-item">
      <div className="main-photo">
        <img src={post.photos[0]} alt={post.title} />
      </div>
      <div className="description-container">
        <h3 className="post-title">{post.title}</h3>
        <p>{descriptionUnder100(post.description)}</p>
        <a href={post.url}>อ่านต่อ</a>
        <div className="category">
          <p>หมวด</p>
          <ul className="tag-list">
            {tagsNoLast.map((tag, index) => (
              <li
                key={index}
                className="list"
                onClick={() => onCategoryClick(tag)}
              >
                {tag}
              </li>
            ))}
            {lastTag && (
              <>
                <li className="no-underline">และ</li>
                <li className="list" onClick={() => onCategoryClick(lastTag)}>
                  {lastTag}
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="additional-photos">
          {post.photos.slice(1).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`more ${post.title} photo ${index + 1}`}
            />
          ))}
        </div>

        <img
          src={copyUrlIcon}
          alt="copy url to clipboard"
          className="copy-url"
          onClick={() => copyToClipboard(post.url)}
        />
      </div>
    </div>
  );
};

export default PostItem;
