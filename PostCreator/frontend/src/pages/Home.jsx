import React, { useEffect, useState } from "react";
import { useMyContext } from "../contextAPI";
import axios from "axios";
import { toast } from "sonner";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Home = () => {
  const { handleLogout, loggesInUser } = useMyContext();
  const [content, setContent] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [userProfile, setUserProfile] = useState();

  const getData = async () => {
    const id = loggesInUser.data.user._id;
    const response = await axios.get(`/api/getAllPostsOfUser/${id}`);
    console.log(response);
    setAllPosts(response.data.allPosts);
  };

  const getProfileOfUser = async () => {
    const response = await axios.get("/api/getProfile");
    setUserProfile(response.data.user);
  };

  const inputHandler = async (e) => {
    setContent(e.target.value);
  };

  const submitHandler = async () => {
    const response = await axios.post("/api/createPost", { content });
    getData();
    setContent("");
  };

  useEffect(() => {
    getProfileOfUser();
    getData();
  }, [allPosts]);

  return (
    <div className="text-white h-full">
      <nav className="w-full p-3 px-5 flex justify-between fixed">
        <div className="font-bold font-serif text-lg">PostCreator</div>
        <Link to="/login" className="bg-blue-600 text-white py-1 px-2 rounded-md" onClick={handleLogout}>Logout</Link>
      </nav>
      <div className="flex px-5 h-full pt-14">
        <div className="left w-full">
          <div className="py-3">
            <textarea
              name=""
              id=""
              className="block w-96 resize-none h-40 rounded-md mb-2 outline-none text-black bg-zinc-400 font-semibold p-2"
              value={content}
              onChange={inputHandler}
            ></textarea>
            <button
              className="px-2 py-1 bg-blue-500 rounded-md"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {allPosts &&
              allPosts.map((post) => {
                return <Post post={post} key={post._id} />;
              })}
          </div>
        </div>
        <div className="right w-3/12 border-l-[1px] border-zinc-600 h-full px-3">
          <div className="p-1 bg-zinc-500 rounded-md flex gap-3 items-center">
            <p className="px-2 bg-zinc-600 rounded-md">
              {userProfile && userProfile.name.split('')[0]}
            </p>
            <p>{userProfile && userProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
