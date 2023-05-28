import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchLanguages, postLanguage } from '../services/textTranslateApi';

interface Language {
    code: string;
    name: string;
}

interface languageValues {
    label: string
    value: string
}


const Home = () => {
    const [data, setData] = useState<Language[]>([]);
    const [englishLanguage, setEnglishLanguage] = useState<languageValues | null>(null);
    const [urduLanguage, setUrduLanguage] = useState<languageValues | null>(null);
    // post request handling
    const [userInputLanguage, setUserInputLanguage] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');




    useEffect(() => {
        const fetchData = async () => {
            const { data } = await fetchLanguages();
            setData(data.languages);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const englishLanguageDefault = data.find((language) => language.code === 'en');
        setEnglishLanguage(englishLanguageDefault ? { label: englishLanguageDefault.name, value: englishLanguageDefault.code } : null);
    }, [data]);

    useEffect(() => {
        const urduLanguageDefault = data.find((language) => language.code === 'ur');
        setUrduLanguage(urduLanguageDefault ? { label: urduLanguageDefault.name, value: urduLanguageDefault.code } : null);
    }, [data]);




    // post request handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (englishLanguage && urduLanguage) {
                    const res = await postLanguage({
                        source_language: englishLanguage.value,
                        target_language: urduLanguage.value,
                        text: userInputLanguage,
                    });
                    const data = res?.data;
                    if (data && data.translatedText) {
                        setTranslatedText(data.translatedText);
                        console.log(data.translatedText);
                    } else {
                        console.log('Invalid response format:', data);
                    }
                }
            } catch (error) {
                console.log('API request failed:', error);
            }
        };

        fetchData();
    }, [englishLanguage, urduLanguage, userInputLanguage]);

    
    // useEffect(() => {
    //     console.log(translatedText);
    // }, [translatedText]);


    const options = data.map((language) => ({
        label: language.name,
        value: language.code,
    }));

    return (
        <>
            <div className='flex'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    value={englishLanguage}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => setEnglishLanguage(value)}
                    fullWidth
                    className='mr-3'
                    renderInput={(params) => <TextField {...params} />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    value={urduLanguage}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) => setUrduLanguage(value)}
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
            <div className='md:flex md:justify-between'>

                <div className='mt-5 grow md:mr-5'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Write to translate...."
                        multiline
                        rows={4}
                        fullWidth
                        value={userInputLanguage}
                        onChange={(e) => setUserInputLanguage(e.target.value)}
                        />
                </div>
                <div className='mt-5 grow'>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        value={userInputLanguage ? translatedText : ''}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
