import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const CartPage = () => {
    const { cartItems, totalAmount } = useCart()
    const [error, setError] = useState("")


    return (
        <Container fixed sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }} >My Cart</Typography>
            <Box gap={4} display="flex" flexDirection="column">
                {
                    cartItems.map((item) => (
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent='space-between'
                            alignItems="center"
                            sx={{ border: 1, borderColor: "#e7e7e7ff", borderRadius: 5, padding: 1}}
                        >
                            <Box display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap={1}
                            >
                                <img src={item.image} width={100} />
                                <Box>
                                    <Typography variant="h6">{item.title} </Typography>
                                    <Typography>{item.quantity} x ${item.unitPrice}</Typography>
                                    <Button>Remove Item</Button>
                                </Box>
                            </Box>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button>+</Button>
                                <Button>-</Button>
                            </ButtonGroup>

                        </Box>
                    ))
                }
            <Box>
                <Typography variant="h4">Total Amount : {totalAmount}</Typography>
            </Box>
            </Box>
        </Container>
    )
}

export default CartPage;