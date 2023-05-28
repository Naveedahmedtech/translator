import { useState, useEffect } from 'react';
import { fetchLanguages, postLanguage } from '../services/textTranslateApi';
import SelectLanguage from './SelectLanguage';
import TranslateInput from './TranslateInput';

interface Language {
    code: string;
    name: string;
}

interface LanguageValues {
    label: string;
    value: string;
}

const Home = () => {
    const [data, setData] = useState<Language[]>([]);
    const [englishLanguage, setEnglishLanguage] = useState<LanguageValues | null>(null);
    const [urduLanguage, setUrduLanguage] = useState<LanguageValues | null>(null);
    const [userInputLanguage, setUserInputLanguage] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await fetchLanguages();
                setData(data.languages);
            } catch (error) {
                console.log('Error fetching languages:', error);
            }
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (englishLanguage && urduLanguage) {
                    const { data: translatedData } = await postLanguage({
                        source_language: englishLanguage.value,
                        target_language: urduLanguage.value,
                        text: userInputLanguage,
                    });
                    if (translatedData && translatedData.translatedText) {
                        setTranslatedText(translatedData.translatedText);
                        console.log(translatedData.translatedText);
                    } else {
                        console.log('Invalid response format:', translatedData);
                    }
                }
            } catch (error) {
                console.log('API request failed:', error);
            }
        };

        if (userInputLanguage.trim() !== '') {
            fetchData();
        } else {
            setTranslatedText('');
        }
    }, [englishLanguage, urduLanguage, userInputLanguage]);

    const options = data.map((language) => ({
        label: language.name,
        value: language.code,
    }));

    return (
        <>
            <div className="flex">
                <SelectLanguage
                    options={options}
                    englishLanguage={englishLanguage}
                    setEnglishLanguage={setEnglishLanguage}
                    urduLanguage={urduLanguage}
                    setUrduLanguage={setUrduLanguage}
                />
            </div>
            <div className="md:flex md:justify-between">
                <TranslateInput
                    userInputLanguage={userInputLanguage}
                    setUserInputLanguage={setUserInputLanguage}
                    translatedText={translatedText}
                />
            </div>
        </>
    );
};

export default Home;
