// Importing necessary classes from the 'appwrite' library and an environment exporter module
import { Account, Client, ID } from 'appwrite';
import envExporter from '../envExporter/envExporter.js';

// Definition of the AppwriteAuthenticationService class
export class AppwriteAuthenticationService {
    // Creating an instance of the Appwrite Client and an Account object
    client = new Client();
    account;

    // Constructor method to initialize the Appwrite client and account
    constructor() {
        // Setting the Appwrite client's endpoint and project ID using environment variables
        this.client
            .setEndpoint(envExporter.appwriteUrl)
            .setProject(envExporter.appwriteProjectId);

        // Creating an Account instance with the initialized Appwrite client
        this.account = new Account(this.client);
    }

    // Method to create a new user account
    // Parameters: { email, password, name }
    async createUserAccount({ email, password, name }) {
        try {
            // Creating a new user account using the Appwrite Account class
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            // If user account creation is successful, proceed to log in the user
            if (userAccount) {
                return this.loginUserAccount({ email, password });
            } else {
                console.log("User creation failed.");
                return false;
            }
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    // Method to log in an existing user account
    // Parameters: { email, password }
    async loginUserAccount({ email, password }) {
        try {
            // Creating an email session to log in the user
            const userLoggedIn = await this.account.createEmailSession(email, password)
            return userLoggedIn;
        } catch (error) {
            throw (error);
        }
    }

    // Method to log out the currently logged-in user
    async logoutUserAccount() {
        try {
            // Deleting all sessions to log out the user
            const userLoggedOut = await this.account.deleteSessions()
            return userLoggedOut;
        } catch (error) {
            throw (error);
        }
    }

    // Method to get information about the currently logged-in user
    async getCurrentUserAccount() {
        try {
            // Retrieving information about the currently logged-in user
            const userCurrent = await this.account.get()
            return userCurrent;
        } catch (error) {
            // Handling potential errors during user retrieval (commented out for now)
            // throw (error)
        }
        return null; // Returning null if user retrieval fails
    }
}

// Creating a singleton instance of the AppwriteAuthenticationService class
const appwriteAuthenticationService = new AppwriteAuthenticationService();
export default appwriteAuthenticationService;
