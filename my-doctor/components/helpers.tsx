export const transformName = (name: string) => {
    const userName = name.split(" ");
  return userName.map(letter => {
    letter.toUpperCase();
    return letter[0];
  }).join(""); 
};