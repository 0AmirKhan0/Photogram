import { useEffect, useLayoutEffect, useState } from "react";
import { getReq } from "../../lib/request";
import { Link } from "react-router-dom";
import StoryItem from "../StoryItem";
export default function HomeStory() {
  const [stories, setStories] = useState([]);
  useLayoutEffect(() => {
    getReq(`/users`)
      .then((users) => {
        users?.forEach((user) => {
          // getReq(`/stories?userId=${user.id}&_sort=created_time&_order=desc`).then(stories => {
          getReq(`/stories?userId=${user.id}`)
            .then((stories) => {
              if (stories.length > 0) {
                // console.log("okkkkkkkkkkkkkkkkkkkkk");
                setStories((state) => [stories[0], ...state]);
              }
            })
            .catch();
        });
      })
      .catch();
  }, []);
  const ele = document.getElementById("story-container");
  let pos = { left: 0, x: 0 };
  const mouseDownHandler = function (e) {
    ele.style.userSelect = "none";
    pos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x;
    ele.scrollLeft = pos.left - dx;
  };
  const mouseUpHandler = function () {
    ele.style.removeProperty("user-select");
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
  return (
    <div className="main-story" onMouseDown={mouseDownHandler}>
      <ul className="story" id="story-container">
        {stories &&
          stories.map((story) => (
            <li onDragStart={(e) => e.preventDefault()}>
              <StoryItem key={story.id} story={story} />
            </li>
          ))}
      </ul>
    </div>
  );
}
