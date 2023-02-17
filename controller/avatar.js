import { createContext, useContext, useState } from "react";
const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [image, setImage] = useState("");
  return (
    <AvatarContext.Provider value={{ image, update: (img) => setImage(img) }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
