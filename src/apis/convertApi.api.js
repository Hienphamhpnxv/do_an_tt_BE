import Axios from "axios";
import { env } from "../config/environments";
import FormData from "form-data";

export const convertPdf2Image = async (pdfFile) => {
  var bodyFormData = new FormData();
  bodyFormData.append('File', pdfFile);

  var urls;
  await Axios({
    method  : 'post',
    url     :   `https://v2.convertapi.com/convert/pdf/to/png?Secret=${env.CONVERT_API_SECRET_KEY}&StoreFile=true`,
    headers : bodyFormData.getHeaders(),
    data    : bodyFormData
  })
    .then((resolve) => {
      console.log(resolve);
      resolve.Files.forEach(file => {
        urls.push(file.Url);
      });
    })
    .catch((error) => console.log(error));

  return urls;
}