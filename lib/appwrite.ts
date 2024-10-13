import "react-native-url-polyfill/auto";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
} from "react-native-appwrite";
import { CreateUserProps, SignInProps } from "@/types/types";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.merakistudio.pixlplay",
  projectId: "67022a8f000f3de254a9",
  databaseId: "67022ee2000cadb76791",
  userCollectionId: "67022f13001f723d6efb",
  videoCollectionId: "67022f2d00316d17628f",
  storageId: "6702300f002d3f36931f",
};
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

let client;
let account;
let avatars;
let storage;
let databases;

client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

account = new Account(client);
avatars = new Avatars(client);
databases = new Databases(client);

/**
 * Creates a new user in the Appwrite database, signs them in, and creates a corresponding user document in the users collection.
 *
 * @param {CreateUserProps} data - The data to create the user with.
 * @returns {Promise<Models.Document>} The newly created user document.
 * @throws {Error} If creating the user or signing in fails.
 */
export const createUser = async ({
  email,
  password,
  username,
}: CreateUserProps): Promise<Models.Document> => {
  try {
    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newUser) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const user = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newUser.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

/**
 * Signs in an existing user with an email and password.
 *
 * @param {SignInProps} data - The data to sign in with.
 * @returns {Promise<Models.Session>} The user session.
 * @throws {Error} If signing in fails.
 */
export const signIn = async ({
  email,
  password,
}: SignInProps): Promise<Models.Session> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Gets the current user's information.
 *
 * @returns {Promise<Models.Document | null>} The current user's data, or null if no user is logged in.
 * @throws {Error} If getting the current user fails.
 */
export const getCurrentUser = async (): Promise<Models.Document | null> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

/**
 * Gets all the posts in the database.
 *
 * @returns {Promise<Models.Document[]>} All the posts in the database.
 * @throws {Error} If getting all the posts fails.
 */
export const getAllPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Gets the latest 7 posts from the database.
 *
 * @returns {Promise<Models.Document[]>} The latest 7 posts in the database.
 * @throws {Error} If getting the latest posts fails.
 */
export const getLatestPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSearchResults = async (
  query: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};
