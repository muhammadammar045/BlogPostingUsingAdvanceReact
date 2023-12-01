import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/componentExporter";
import appwritePostService from "../appwrite/appwritePostFunction";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  // State to store the post data
  const [post, setPost] = useState(null);

  // Accessing the slug parameter from the URL
  const { slug } = useParams();
  // Hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post data based on the provided slug
    if (slug) {
      appwritePostService.getOnePost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          // Update the state with the fetched post data
          setPost(fetchedPost);
        }
      });
    } else {
      // If no slug is provided, navigate back to the homepage
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      {/* Render the Container and PostForm components for editing the post */}
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
