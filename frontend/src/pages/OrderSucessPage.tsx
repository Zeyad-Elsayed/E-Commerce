import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSucessPage = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    }

    return (
        <Container fixed sx={{ 
            mt: 4, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center", 
            gap: 2 }} >
            <CheckCircleOutline sx={{color: "Green", fontSize: "80px"}} />
            <Typography variant="h4">Order Sent Successfully !</Typography>
            <Typography>We started processing it, and we will get back to you soon</Typography>
            <Button variant="contained" onClick={handleHome}>Go to Home</Button>
        </Container >
    )
}

export default OrderSucessPage;