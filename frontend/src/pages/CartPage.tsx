import { Box, Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/Cart/CartContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";


const CartPage = () => {


    const {cartItems, totalAmount, updateItemInCart, removeItemFromCart, clearCart} = useCart();
    const navigate = useNavigate();

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity > 0)
            updateItemInCart(productId, quantity)
        else if (quantity == 0) {
            removeItemFromCart(productId)
        }
    }

    const handleRemove = (productId: string) => {
        removeItemFromCart(productId)
    }

    const handleCheckout = () => {
        navigate("/checkout")
    }

    const renderCartItems = () => (
        <Box gap={4} display="flex" flexDirection="column">
            {
                cartItems.map((item) => (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent='space-between'
                        alignItems="center"
                        sx={{ border: 1, borderColor: "#e7e7e7ff", borderRadius: 5, padding: 1 }}
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
                                <Button onClick={() => handleRemove(item.productId)}>Remove Item</Button>
                            </Box>
                        </Box>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                            <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                        </ButtonGroup>
                    </Box>
                ))
            }
            <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            >
                <Typography variant="h4">Total Amount : {totalAmount}</Typography>
                <Button variant="contained" onClick={handleCheckout}>Go to check out</Button>
            </Box>
        </Box>

    )

    return (
        <Container fixed sx={{ mt: 4 }}>
            <Box display="flex"
                flexDirection="row"
                justifyContent='space-between'
                alignItems="center">
                <Typography variant="h4" sx={{ mb: 2 }} >My Cart</Typography>
                <Button onClick={clearCart}>Clear Cart</Button>
            </Box>
            {cartItems.length ? (renderCartItems()) : <Typography variant="h4">The Cart is empty</Typography>}
        </Container >
    )
}

export default CartPage;