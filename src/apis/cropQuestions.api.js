import Axios from "axios";

export const cropQuestionFromImage = async (urlImage) => {
  var res = await Axios({
    method: "get",
    url: `https://crop-questions-api.herokuapp.com/get-image-questions?image_url=${urlImage}`,
  });

  return res.data;
};
