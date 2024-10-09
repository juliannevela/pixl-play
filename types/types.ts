import * as Animatable from "react-native-animatable";
import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

export type CreateUserProps = {
  email: string;
  password: string;
  username: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
};

export type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: string;
};

export type InitialGlobalContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  isLoading: boolean;
};

export type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export type TrendingProps = {
  posts: Models.Document[];
};

export type TrendingItemProps = {
  item: Models.Document;
  activeItem: any;
};

export type VideoCardProps = {
  video: Models.Document;
};

export type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

export type CustomAnimation = Animatable.CustomAnimation & {
  [key: string]: any;
};
