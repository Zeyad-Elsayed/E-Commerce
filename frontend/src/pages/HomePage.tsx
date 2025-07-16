import Container from "@mui/material/Container"
import { Box, Grid } from '@mui/material';
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseURL";


const HomePage = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchdata = async() => {
            try {
                const response = await fetch(`${BASE_URL}/product`);
                const data = await response.json();
                setProducts(data);
            }
            catch {
                setError(true);
            }

        }

        fetchdata();

    })

    if(error) {
        return <Box>Something went wrong pealse try again</Box>
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {products.map((p) => (
                <Grid size={4}>
                    <ProductCard {...p} />
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage;
