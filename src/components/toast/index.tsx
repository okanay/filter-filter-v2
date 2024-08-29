"use client";

import { useEffect } from "react";
import { CustomToast } from "./custom-toast";

import toast, { Toaster, ToastBar, Toast } from "react-hot-toast";

export const ToastManager = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const localStorageLength = Object.keys(localStorage).length;
    if (localStorageLength <= 0) return;

    toast.custom(
      (t: Toast) => (
        <CustomToast t={t}>
          <span className="rounded border border-blue-200 bg-blue-400 px-2 py-1 text-white shadow shadow-zinc-950/30">
            {localStorageLength}
          </span>{" "}
          custom options loaded, good luck soldier!
        </CustomToast>
      ),
      {
        duration: 3000,
      },
    );
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false}>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: "",
            }}
          />
        )}
      </Toaster>
    </>
  );
};
