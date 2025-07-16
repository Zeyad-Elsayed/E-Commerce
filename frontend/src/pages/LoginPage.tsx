import { Box, Typography, TextField, Button } from "@mui/material"
import Container from "@mui/material/Container"
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [error, setError] = useState("");

    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const {login} = useAuth();

    const onSubmit = async () => {
        const email = emailref.current?.value;
        const password = passwordref.current?.value;


        if(!email || !password) {
            setError("Check submitted data");
            return;
        }

        console.log(email, password);

        //Make the call to API to create the user
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if(!response.ok) {
            setError("Unable to login user");
            return;
        }

        const token = await response.json();

        if(!token) {
            setError("Incorrect Token")
            return;
        }

        login(email, token)

        navigate("/")

    }

    return (
        <Container>
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "center", // Horizontal center
                    alignItems: "center", // Vertical center
                }}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 400, // Limit form width
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                        Login to your account
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            border: 1,
                            padding: 2,
                            borderColor: "#f6f6f6",
                            borderRadius: 1,
                        }}>
                        <TextField inputRef={emailref} label="Email" name="email" />
                        <TextField inputRef={passwordref} type="password" label="Password" name="password" />
                        <Button onClick={onSubmit} variant="contained">Login</Button>
                        {error && <Typography sx={{color: "red"}}>{error}</Typography>}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage