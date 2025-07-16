import { Box, Typography, TextField, Button } from "@mui/material"
import Container from "@mui/material/Container"
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseURL";

const RegisterPage = () => {

    const [error, setError] = useState("");

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailref.current?.value;
        const password = passwordref.current?.value;

        console.log(firstName, lastName, email, password);

        //Make the call to API to create the user
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: email
            }),
        });

        if(!response.ok) {
            setError("Unable to register user, Please try different email");
            return;
        }

        const data = await response.json();

        console.log(data);
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
                        Register New Account
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
                        <TextField inputRef={firstNameRef} label="First Name" name="firstName" />
                        <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
                        <TextField inputRef={emailref} label="Email" name="email" />
                        <TextField inputRef={passwordref} type="password" label="Password" name="password" />
                        <Button onClick={onSubmit} variant="contained">Register</Button>
                        {error && <Typography sx={{color: "red"}}>{error}</Typography>}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterPage