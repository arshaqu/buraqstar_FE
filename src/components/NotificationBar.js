import { Alert, Snackbar } from "@mui/material"

const NotificationBar = ({ open, setOpen, type, message }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity={type}
                variant="filled"
                sx={{
                    width: "100%",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 300,
                   
                    backgroundColor:'rgb(0, 0, 0)'
                }}
                >
                {message}
                </Alert>
        </Snackbar>
    )
}

export default NotificationBar