import React, { useEffect, useState } from "react";
import { Button, Container } from "../components/componentExporter";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwritePostService from "../appwrite/appwritePostFunction";
import parse from "html-react-parser";

function Post() {
  // State to store the post data
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.userAuthentication.userData);

  // Check if the current user is the author of the post
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      // Fetch the post data when the component mounts
      appwritePostService.getOnePost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          // Update the state with the fetched post data
          setPost(fetchedPost);
        } else {
          // If no post is found, navigate to the home page
          navigate("/");
        }
      });
    }
  }, [slug]);

  // Function to delete the post
  const deletePost = () => {
    appwritePostService.deletePost(post.$id).then((status) => {
      if (status) {
        // Delete the featured image associated with the post
        appwritePostService.deleteFile(post.featuredImage);
        // Navigate to the home page after deleting the post
        navigate("/");
      }
    });
  };

  // Render the post if available
  return post ? (
    <div>
      <Container>
        <div className="w-full flex justify-center my-4 relative border rounded-xl p-2">
          {/* Display the featured image of the post */}
          <img
            src={appwritePostService.previewFile(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {/* Display edit and delete buttons if the user is the author of the post */}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          {/* Display the author's name */}
          <h3 className="text-2xl font-bold">{post.author}</h3>
        </div>
        <div className="w-full mb-6">
          {/* Display the post title */}
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {/* Parse and display the post content as HTML */}
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
