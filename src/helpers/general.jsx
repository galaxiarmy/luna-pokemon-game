export const generateIdImage = url => {
  const link = url?.split('/');
  const index = link?.length ? link?.length - 2 : null;

  return index ? link[index] : null;
};

export const getLinkImage = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
};

export const capitalizeFirstLetter = string => {
  if (!string) return string; // Handle empty string
  return string.charAt(0).toUpperCase() + string.slice(1);
};
