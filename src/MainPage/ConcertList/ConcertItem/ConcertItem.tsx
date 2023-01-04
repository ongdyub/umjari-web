import {Card, CardMedia} from "@mui/material";

const ConcertItem = (props: any) => {

    const { img } = props

    return(
        <Card sx={{ maxWidth: 345, overflow: "auto" }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="340"
                width="auto"
                image={img}
            />
        </Card>
    )
}

export default ConcertItem
