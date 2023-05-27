import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchLanguages } from '../services/textTranslateApi';

interface Language {
    code: string;
    name: string;
}

const Home = () => {
    const [data, setData] = useState<Language[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchLanguages();
            setData(data.languages);
        };
        fetchData();
    }, []);

    const options = data.map((language) => ({
        label: language.name,
        value: language.code,
    }));

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
            />
        </div>
    );
};

export default Home;
