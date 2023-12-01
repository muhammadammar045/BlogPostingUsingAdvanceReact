import React from "react";
import { Link } from "react-router-dom";
import appwritePostService from "../../appwrite/appwritePostFunction";

function PostCard({ $id, title, featuredImage, author }) {
  return (
    // Link to the individual post page based on post ID
    <Link to={`/post/${$id}`}>
      <div className="w-full">
        <div className="p-4 md:w-2/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {/* Post image section */}
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              // Use the previewFile function from appwritePostService for image source
              src={
                appwritePostService.previewFile(featuredImage) ||
                "https://dummyimage.com/720x600" // Default image if preview is not available
              }
              alt={title}
            />
            <div className="p-6">
              {/* Author information */}
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                {author || "Author"}
              </h2>
              {/* Post title */}
              <h1 className="title-font text-xl font-medium text-pink-400 mb-3">
                {title || "Title"}
              </h1>
              {/* Post description */}
              <p className="leading-relaxed mb-3">
                Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
