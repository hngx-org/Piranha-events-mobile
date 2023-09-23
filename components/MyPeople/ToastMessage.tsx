import { useEffect } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export const ToastMessage = ({ showToast, setShowToast, toastObj }) => {
  const toastConfig = {
    success: (props: any) => {
      return (
        <BaseToast
          {...props}
          style={{ borderLeftColor: "green" }}
          contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
          text1Style={{
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          {toastObj.message}
        </BaseToast>
      );
    },

    error: (props: any) => {
      return (
        <ErrorToast
          {...props}
          text1Style={{
            fontSize: 15,
            color: "black",
          }}
          contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
          text2Style={{
            fontSize: 15,
          }}
        >
          {toastObj.message}
        </ErrorToast>
      );
    },
  };

  useEffect(() => {
    if (showToast === true) {
      Toast.show(toastObj);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return <Toast config={toastConfig} />;
};
