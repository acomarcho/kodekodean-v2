import { notifications } from "@mantine/notifications";

export const showSuccess = (message: string) => {
  notifications.show({
    message: message,
    color: "teal",
    withCloseButton: false,
  });
};

export const showError = (message: string) => {
  notifications.show({
    message: message,
    color: "red",
    withCloseButton: false,
  });
};
