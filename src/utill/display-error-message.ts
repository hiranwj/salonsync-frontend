// import { notification } from "antd";

// export const DisplayErrorNotification = (des:any) => {
//     notification.open({
//                     type: "error",
//                     message: "Error!",
//                     description: des
//                 });
//     }

import { notification } from "antd";

export const displayErrorMessage = (message: string, description?: string) => {
  notification.error({
    message,
    description: description || "Something went wrong. Please try again.",
  });
};
