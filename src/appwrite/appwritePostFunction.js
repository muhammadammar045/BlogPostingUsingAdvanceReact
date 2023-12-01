// Importing necessary classes from the 'appwrite' library and an environment exporter module
import { Client, Databases, ID, Query, Storage } from 'appwrite';
import envExporter from '../envExporter/envExporter';

// Definition of the AppwritePostService class
export class AppwritePostService {
    // Creating an instance of the Appwrite Client
    client = new Client()

    // Constructor method to initialize the Appwrite client, databases, and storage
    constructor() {
        // Setting the Appwrite client's endpoint and project ID using environment variables
        this.client
            .setEndpoint(envExporter.appwriteUrl)
            .setProject(envExporter.appwriteProjectId);

        // Creating instances of Databases and Storage with the initialized Appwrite client
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Method to create a new post
    // Parameters: { title, slug, content, author, featuredImage, status, userId }
    async createPost({ title, slug, content, author, featuredImage, status, userId }) {
        try {
            // Creating a new document in the specified Appwrite collection
            const createPost = await this.databases.createDocument(envExporter.appwriteDatabaseId, envExporter.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    author,
                    featuredImage,
                    status,
                    userId
                });
            return createPost;
        } catch (error) {
            throw error;
        }
    }

    // Method to update an existing post
    async updatePost(slug, { title, content, author, featuredImage, status }) {
        try {
            // Updating the document in the specified Appwrite collection
            const updatePost = await this.databases.updateDocument(envExporter.appwriteDatabaseId, envExporter.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    author,
                    featuredImage,
                    status
                });
            return updatePost;
        } catch (error) {
            throw error;
        }
    }

    // Method to delete a post
    async deletePost(slug) {
        try {
            // Deleting the document in the specified Appwrite collection
            const deletePost = await this.databases.deleteDocument(envExporter.appwriteDatabaseId, envExporter.appwriteCollectionId, slug);
            return deletePost;
        } catch (error) {
            throw error;
        }
    }

    // Method to get information about a specific post
    async getOnePost(slug) {
        try {
            // Retrieving the document from the specified Appwrite collection
            const getOnePost = await this.databases.getDocument(envExporter.appwriteDatabaseId, envExporter.appwriteCollectionId, slug);
            return getOnePost;
        } catch (error) {
            throw error;
        }
    }

    // Method to get all posts based on optional queries
    async getAllPost(queries = [Query.equal('status', 'active')]) {
        try {
            // Listing documents from the specified Appwrite collection based on queries
            const getAllPost = await this.databases.listDocuments(envExporter.appwriteDatabaseId, envExporter.appwriteCollectionId, queries);
            return getAllPost;
        } catch (error) {
            throw error;
        }
    }

    // Method to create a new file in the Appwrite storage
    async createFile(file) {
        try {
            // Creating a new file in the specified Appwrite bucket
            const createFile = await this.bucket.createFile(envExporter.appwriteBucketId, ID.unique(), file);
            return createFile;
        } catch (error) {
            throw error;
        }
    }

    // Method to delete a file from the Appwrite storage
    async deleteFile(fileId) {
        try {
            // Deleting a file from the specified Appwrite bucket
            const deleteFile = await this.bucket.deleteFile(envExporter.appwriteBucketId, fileId);
            return deleteFile;
        } catch (error) {
            throw error;
        }
    }

    // Method to preview a file from the Appwrite storage
    previewFile(fileId) {
        try {
            // Getting a preview of the file from the specified Appwrite bucket
            const previewFile = this.bucket.getFilePreview(envExporter.appwriteBucketId, fileId);
            return previewFile;
        } catch (error) {
            throw error;
        }
    }
}

// Creating a singleton instance of the AppwritePostService class
const appwritePostService = new AppwritePostService();
export default appwritePostService;
