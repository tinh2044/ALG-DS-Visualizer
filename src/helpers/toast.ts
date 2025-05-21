import { addToast } from "@heroui/toast";

type showToastProps = {
  title: string;
  description?: string;
  severity:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
};

const showToast = (props: showToastProps) => {
  addToast({
    title: props.title,
    description: props.description || "",
    severity: props.severity,
    color: props.severity,
  });
};


export const showSuccessToast = (title: string, description?: string) => {
  showToast({
    title,
    description,
    severity: "success",
  });
};

export const showErrorToast = (title: string, description?: string) => {
  showToast({
    title,
    description,
    severity: "danger",
  });
};

export const showInfoToast = (title: string, description?: string) => {
  showToast({
    title,
    description,
    severity: "primary",
  });
};
