import React, { useCallback, useEffect } from "react";
import { Button, Input, Select } from "../componentExporter";
import RTE from "../Rte/RTE";
import appwritePostService from "../../appwrite/appwritePostFunction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userAuthentication.userData);
  // console.log(userData);

  // React Hook Form configuration
  const { register, handleSubmit, setValue, getValues, control, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        author: post?.author || "",
        status: post?.status || "active",
        content: post?.content || "",
      },
    });

  // Function to handle post creation or update
  const PostFormFunction = async (data) => {
    try {
      // Update an existing post
      if (post) {
        const createFile = data.image[0]
          ? await appwritePostService.createFile(data.image[0])
          : null;

        if (createFile) {
          appwritePostService.deleteFile(post.featuredImage);
        }

        const updatedPost = await appwritePostService.updatePost(post.$id, {
          ...data,
          featuredImage: createFile ? createFile.$id : undefined,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // Create a new post
        const createFileForUploadedFile = await appwritePostService.createFile(
          data.image[0]
        );

        if (createFileForUploadedFile) {
          const fileId = createFileForUploadedFile.$id;
          data.featuredImage = fileId;

          const createdPost = await appwritePostService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (createdPost) {
            navigate(`/post/${createdPost.$id}`);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  // Function to transform the title into a slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // Effect to update the slug when the title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <section className="bg-black text-white body-font">
      <div className="container px-5 py-8 mx-auto flex flex-wrap items-center">
        <div className="lg:w-6/6 md:w-2/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="text-gray-900 text-xl font-extrabold title-font mb-5">
            Post Form
          </h1>
          <form onSubmit={handleSubmit(PostFormFunction)}>
            <div className="flex flex-wrap gap-10 justify-center">
              <div className="relative mb-4">
                <Input
                  label="Title :"
                  type="text"
                  placeholder="Post Title"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="relative mb-4">
                <Input
                  label="Slug :"
                  type="text"
                  placeholder="post-slug"
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.target.value), {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="relative mb-4">
                <Input
                  label="Author :"
                  type="text"
                  placeholder="Author Name"
                  {...register("author", { required: true })}
                />
              </div>
              <div className="relative mb-4">
                <Select
                  label="Status :"
                  options={["active", "inActive"]}
                  {...register("status", { required: true })}
                />
              </div>
              <div className="relative mb-4">
                <Input
                  label="Featured Image :"
                  type="file"
                  placeholder="Author Name"
                  {...register("image", { required: !post })}
                />
              </div>
              <div className="relative mb-4">
                <RTE
                  label={"Content :"}
                  name={"content"}
                  defaultValues={getValues("content")}
                  control={control}
                />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PostForm;
