export const getImagePath = (image: string) => {
  if (image.startsWith('https://')) {
    return image;
  }

  if (image.startsWith('data:image')) {
    return image;
  }

  return `http://127.0.0.1:3333${image}`;
};
