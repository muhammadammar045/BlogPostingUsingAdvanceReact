import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/componentExporter";
import appwritePostService from "../appwrite/appwritePostFunction";

function Home() {
  // State to store the posts data
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when the component mounts
    appwritePostService.getAllPost().then((fetchedPosts) => {
      if (fetchedPosts) {
        // Update the state with the fetched posts data
        setPosts(fetchedPosts.documents);
      }
    });
  }, []);

  // If there are no posts, display a message encouraging login
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Add Post to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Render posts if available
  return (
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-2/4">
            {/* Render the PostCard component for each post */}
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;
