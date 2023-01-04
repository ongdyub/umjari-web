import {Card, CardMedia, Grid} from "@mui/material";

const ConcertItem = (props: any) => {

    const { img } = props

    return(
        <Grid>
            <Card sx={{ maxWidth: 345, overflowX: "scroll" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="240px"
                    width="400px"
                    image={img}
                    sx={{objectFit: 'cover'}}
                />
            </Card>
        </Grid>

    )
}

export default ConcertItem
