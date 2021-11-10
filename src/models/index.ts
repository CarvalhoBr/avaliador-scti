import Rating from "./Rating";
import Speaker from "./Speaker";
import { Workshop } from "./Workshop";

const getModels = () => {
  return [
    Speaker,
    Workshop,
    Rating,
  ];
};

export default getModels;