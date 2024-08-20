const express = require("express");
const { isLoggedIn } = require("../middleware/userMiddleware");
const router = express.Router();
const UserModel = require("../models/user");
const PostModel = require("../models/post");

router.post("/createPost", isLoggedIn, async (req, res) => {
  const { content } = req.body;

  const user = await UserModel.findOne({ _id: req.user.userId });

  const newPost = await PostModel.create({ content, creator: user._id });

  newPost.creator = user._id;

  await newPost.save();

  return res.status(200).json({ message: "Post created", newPost });
});

router.get("/getAllPosts", isLoggedIn, async (req, res) => {
  const allPosts = await PostModel.find();
  return res.status(200).json({ allPosts });
});

router.post("/likePost/:postId", isLoggedIn, async (req, res) => {
  const postNumber = req.params.postId;

  try {
    const user = await UserModel.findOne({ _id: req.user.userId})
    const post = await PostModel.findOne({ _id: postNumber });

    if (!post) {
      return res.status(400).json({ message: "No such post present" });
    }
    console.log(user);
    
    const postIndex =  post.likes.indexOf(user._id)

    if (postIndex < 0) {
      post.likes.push(user._id);

      await post.save();

      return res.status(200).json({ message: "Post Liked" });
    } else {
      post.likes.splice(postIndex,1)

      await post.save();

      return res.status(200).json({ message: "Post UnLiked" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/editPost/:postId", isLoggedIn, async(req,res)=>{
    const postNumber = req.params.postId;
    const {content} = req.body;

    try {
        const user = await UserModel.findOne({ _id: req.user.userId})
        const post = await PostModel.findOne({ _id: postNumber });
    
        if (!post) {
          return res.status(400).json({ message: "No such post present" });
        }

        const updatedPost = await PostModel.findOneAndUpdate({_id: postNumber}, {content},{new:true})      
        
        await updatedPost.save();

        res.status(200).json({"message":"Post updated successfully", updatedPost})

      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
})

module.exports = router;
