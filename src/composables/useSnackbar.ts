import { ref } from "vue"

type SnackbarType = "success" | "error" | "info" | "warning"

interface SnackbarOptions {
  message: string
  type?: SnackbarType
  duration?: number
}

const visible = ref(false)
const message = ref("")
const color = ref<SnackbarType>("success")
const timeout = ref(5000)

let hideTimeout: number | null = null

export function useSnackbar() {
  const showSnackbar = ({ message: msg, type = "success", duration = 5000 }: SnackbarOptions) => {
    message.value = msg
    color.value = type
    timeout.value = duration
    visible.value = true

    // Clear any existing timeout
    if (hideTimeout) clearTimeout(hideTimeout)

    // Hide after timeout
    hideTimeout = window.setTimeout(() => {
      visible.value = false
    }, duration)
  }

  const showSuccess = (msg: string, duration = 5000) =>
    showSnackbar({ message: msg, type: "success", duration })

  const showError = (msg: string, duration = 5000) =>
    showSnackbar({ message: msg, type: "error", duration })

  const showInfo = (msg: string, duration = 5000) =>
    showSnackbar({ message: msg, type: "info", duration })

  const showWarning = (msg: string, duration = 5000) =>
    showSnackbar({ message: msg, type: "warning", duration })

  return {
    visible,
    message,
    color,
    timeout,
    showSnackbar,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
}
