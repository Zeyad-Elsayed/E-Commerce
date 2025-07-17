import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useCart } from "../context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const CheckoutPage = () => {


    const { cartItems, totalAmount, clearCart } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    const addressRef = useRef<HTMLInputElement>(null);

    const handleConfirmOrder = async () => {
        const address = addressRef.current?.value;

        if (!address)
            return;

        const response = await fetch(`${BASE_URL}/cart/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                address
            }),
        });

        if(!response.ok) {
            return;
        }

        //Go to success page
        navigate("/order-sucess")
        clearCart();
    }



    const renderCartItems = () => (
        <Box gap={2} display="flex" flexDirection="column" sx={{ border: 1, borderColor: "#e7e7e7ff", borderRadius: 5, padding: 2 }}>
            {
                cartItems.map((item) => (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent='space-between'
                        alignItems="center"
                        width="100%"
                    >
                        <Box display="flex"
                            flexDirection="row"
                            alignItems="center"
                            gap={2}
                            width="100%"
                        >
                            <img src={item.image} width={50} />
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent='space-between'
                                alignItems="center"
                                width="100%"
                            >
                                <Typography variant="h6">{item.title} </Typography>
                                <Typography>{item.quantity} x ${item.unitPrice}</Typography>
                            </Box>
                        </Box>
                    </Box>
                ))
            }
            <Box>
                <Typography variant="body2" sx={{ textAlign: "right" }}>
                    Total Amount : ${totalAmount}
                </Typography>
            </Box>
        </Box>

    )

    return (
        <Container fixed sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }} >
            <Box display="flex"
                flexDirection="row"
                justifyContent='space-between'
                alignItems="center">
                <Typography variant="h4" sx={{ mb: 2 }} >Checkout</Typography>
            </Box>
            <TextField inputRef={addressRef} label="Delivery Address" name="Adress" fullWidth />
            {renderCartItems()}
            <Button variant="contained" fullWidth onClick={handleConfirmOrder}>Pay Now</Button>
        </Container >
    )
}

export default CheckoutPage;