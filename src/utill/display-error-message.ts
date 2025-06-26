import { notification } from "antd";

export const DisplayErrorNotification = (des:any) => {
    notification.open({
                    type: "error",
                    message: "Error!",
                    description: des
                });
    }
