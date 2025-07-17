import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrdersPage = () => {
    const { getMyOrders, myOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
    }, [])

    return (
        <Container fixed sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
        }} >
            <Typography variant="h4">My Orders</Typography>
            {myOrders.map(({ _id, address, orderItems, totalAmount }) => (
                <Box sx={{border: 1, borderColor: "grey", padding: 2, borderRadius: 2}}>
                    <Typography>Address:{address}</Typography>
                    <Typography>Total Items: {orderItems.length}</Typography>
                    <Typography>Total Amount: ${totalAmount}</Typography>
                </Box>

            ))}
        </Container >
    )
}

export default MyOrdersPage;