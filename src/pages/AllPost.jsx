import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/componentExporter";
import appwritePostService from "../appwrite/appwritePostFunction";

function AllPost() {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the Appwrite backend when the component mounts
    appwritePostService.getAllPost([]).then((posts) => {
      if (posts) {
        // Update the state with the fetched posts
        setPosts(posts.documents);
      }
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Container>
      <div className="flex flex-wrap">
        {/* Map through the posts and render a PostCard component for each post */}
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-2/4">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AllPost;
