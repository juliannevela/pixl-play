import "react-native-url-polyfill/auto";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";
import {
  CreateUserProps,
  FileObject,
  FilePreview,
  SignInProps,
  UploadProps,
} from "@/types/types";
import { ImagePickerAsset } from "expo-image-picker";

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
storage = new Storage(client);

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

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

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

/**
 * Gets all the posts created by a user.
 *
 * @param {string} userId - The user ID to get the posts for.
 * @returns {Promise<Models.Document[]>} All the posts created by the user.
 * @throws {Error} If getting the posts fails.
 */
export const getUserPosts = async (
  userId: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Searches for posts with a matching title.
 *
 * @param {string} query - The string to search for.
 * @returns {Promise<Models.Document[]>} The posts that match the search query.
 * @throws {Error} If searching fails.
 */
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

/**
 * Gets a URL for previewing a file in the storage bucket.
 *
 * @param {string} fileId - The ID of the file to preview.
 * @param {"image" | "video"} type - The type of the file to preview.
 * @returns {Promise<URL>} A URL for previewing the file.
 * @throws {Error} If getting the file preview fails.
 */
export const getFilePreview = async (
  fileId: string,
  type: "image" | "video"
): Promise<URL> => {
  let fileUrl: URL;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Uploads a file to the storage bucket.
 *
 * @param {{ uri: string; fileName: string; fileSize: number; mimeType: string }} file - The file to upload.
 * @param {"image" | "video"} type - The type of file to upload.
 * @returns {Promise<URL | undefined>} The uploaded file URL, or undefined if the upload fails.
 * @throws {Error} If uploading the file fails.
 */
export const uploadFile = async (
  file: ImagePickerAsset,
  type: "image" | "video"
): Promise<URL | undefined> => {
  if (!file) return;

  const { mimeType, fileName, fileSize, uri } = file;
  const asset: FileObject = {
    name: fileName || "",
    type: mimeType || "",
    size: fileSize || 0,
    uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Creates a new video post in the database and uploads the associated thumbnail and video to the storage bucket.
 *
 * @param {{ title: string; thumbnail: ImagePickerAsset; video: ImagePickerAsset; prompt: string; userId: string; }} form - The form data for the new post.
 * @returns {Promise<Models.Document | undefined>} The newly created document, or undefined if the creation fails.
 * @throws {Error} If creating the post fails.
 */
export const createVideo = async (form: {
  title: string;
  thumbnail: ImagePickerAsset;
  video: ImagePickerAsset;
  prompt: string;
  userId: string;
}): Promise<Models.Document | undefined> => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
