import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import toast, { Toast as ToastHot } from "react-hot-toast";
import { ToastIF, ToastType } from "../../../../@types/toast";

type DEFINE_COLOR_TYPE = {
    [key in ToastType]: {
        backgroundColor: string;
        closeColor: string;
        contentColor: string;
    };
};

const DEFINE_COLOR: DEFINE_COLOR_TYPE = {
    ["success"]: {
        backgroundColor: "#90E33C",
        closeColor: "#529A19",
        contentColor: "#3A710F",
    },
    ["error"]: {
        backgroundColor: "#E36546",
        closeColor: "#93281D",
        contentColor: "#93281D",
    },
};

interface ToastProps extends ToastIF {
    t: ToastHot;
}

const Toast: React.FC<ToastProps> = ({
    type = "success",
    title,
    content,
    t,
}) => {
    function remove() {
        toast.dismiss(t.id);
    }

    const BoxTypeDefine = useMemo(() => {
        return DEFINE_COLOR[type];
    }, [type]);

    return (
        <AnimatePresence>
            {t.visible ? (
                <motion.div
                    layout
                    key={t.id}
                    className="w-max h-max pointer-events-auto"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <div
                        className=""
                        style={{
                            width: "337px",
                            maxWidth: "calc(100vw - 24px)",
                            height: "max-content",
                        }}
                    >
                        {/* style */}
                    </div>
                </motion.div>
            ) : (
                <></>
            )}
        </AnimatePresence>
    );
};

export default Toast;
