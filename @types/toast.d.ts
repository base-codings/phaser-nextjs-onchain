export type ToastType = "error" | "success";

export interface ToastIF {
    type: ToastType;
    title?: string | React.ReactNode;
    content: string | React.ReactNode;
    tx?: string;
}
