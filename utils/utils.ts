export const isEmbeddedVideo = (url: string | string[]) => {
  return url.includes("youtube.com") || url.includes("vimeo.com");
};
