import {showMessage} from "react-native-flash-message";

const showError = (message:any) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: message
    })
}

const showSuccess = (message:any) => {
    showMessage({
        type: "success",
        icon: 'success',
        message: message
    })
}

const showWarning = (message:any) => {
    showMessage({
        type: "warning",
        icon: 'warning',
        message: message
    })
}

export {
    showError, 
    showSuccess,
    showWarning
}