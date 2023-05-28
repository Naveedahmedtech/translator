import { Autocomplete, TextField } from "@mui/material";


const SelectLanguage = ({options, englishLanguage, setEnglishLanguage, urduLanguage, setUrduLanguage}) => {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        value={englishLanguage}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => setEnglishLanguage(value)}
        fullWidth
        className="mr-3"
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
    </>
  );
}

export default SelectLanguage
