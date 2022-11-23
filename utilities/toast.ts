import { toast, TypeOptions } from 'react-toastify'

export const showToast = (message: string, type: TypeOptions, onCloseCallback?: () => void) => {
  toast.onChange(payload => {
    if (payload.status === "removed" && onCloseCallback) {
      onCloseCallback()
    }
  })
  
  toast(message, {
    type,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light"
  })
}