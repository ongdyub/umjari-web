import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography} from "@mui/material";
import {useState} from "react";
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ConcertFilter = () => {

    const [age, setAge] = useState('');
    const [value, setValue] = useState<Dayjs | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const dateLabelStyle = {
        "& label" : {
            marginTop: "-50px"
        }
    }

    return (
        <Stack direction="row"
               justifyContent="flex-start"
               alignItems="center"
               spacing={2}
               sx={{height: '90px', pl: '45px', pt: '10px',overflowX: 'scroll'}}
        >
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="demo-simple-select-autowidth-label" sx={{mt: '-10px'}}>지역 1</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="지역 1"
                    sx={{height: '35px'}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>서울</MenuItem>
                    <MenuItem value={21}>경기 북부</MenuItem>
                    <MenuItem value={22}>경기 남부</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="demo-simple-select-autowidth-label" sx={{mt: '-10px', mr: '10px', width: '200px'}}>지역
                    2</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="지역 2"
                    sx={{height: '35px'}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>관악구</MenuItem>
                    <MenuItem value={21}>서초구</MenuItem>
                    <MenuItem value={22}>강동구</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 150}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        InputProps={{
                            style: {
                                height: "35px",
                                width: "150px",
                                fontSize: "small",
                                marginLeft: '10px'
                            },

                        }}
                        renderInput={(params: any) => (
                            <TextField {...params } />
                        )}
                    />
                </LocalizationProvider>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 10}}>
                <Typography variant="h6"> ~ </Typography>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 150}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        InputProps={{
                            style: {
                                height: "35px",
                                width: "150px",
                                fontSize: "small",
                            },

                        }}
                        renderInput={(params: any) => (
                            <TextField {...params } />
                        )}
                    />
                </LocalizationProvider>
            </FormControl>
        </Stack>
    );
}

export default ConcertFilter
