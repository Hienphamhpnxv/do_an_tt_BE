import Axios from "axios";
import { env } from "../config/environments";
import FormData from "form-data";
import { defaultsDeep } from "lodash";

export const uploadImage = async (imageBase64) => {
  var bodyFormData = new FormData();
  let base64Content = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
  // bodyFormData.append('key', env.IMGBB_API_KEY)
  bodyFormData.append('image', base64Content);

  var url;
  await Axios({
    method  : 'post',
    url     :   `https://api.imgbb.com/1/upload?key=${env.IMGBB_API_KEY}`,
    headers : bodyFormData.getHeaders(),
    data    : bodyFormData
  })
    .then((resolve) => {
      url = resolve.data.data.image.url;
    })
    .catch((error) => console.log(error));

  return url;
}