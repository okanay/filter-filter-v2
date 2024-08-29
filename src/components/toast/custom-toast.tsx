import { AnimatePresence, MotionProps, motion } from "framer-motion";
import toast, { Toast } from "react-hot-toast";

interface CustomToastProps extends MotionProps {
  children: React.ReactNode;
  t: Toast;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  t,
  children,
  ...props
}) => {
  return (
    <AnimatePresence key={t.id}>
      {t.visible && (
        <motion.div
          {...props}
          key={t.id}
          onTap={() => toast.dismiss(t.id)}
          className={`cursor-pointer rounded-lg border border-black/10 bg-white px-6 py-4 font-mono text-sm shadow-md`}
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
