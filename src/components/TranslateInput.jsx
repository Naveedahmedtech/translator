import { TextField } from "@mui/material";

const TranslateInput = ({
  userInputLanguage,
  setUserInputLanguage,
  translatedText,
}) => {
  return (
    <>
      <div className="mt-5 grow md:mr-5">
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
      <div className="mt-5 grow">
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          value={userInputLanguage ? translatedText : ""}
        />
      </div>
    </>
  );
};

export default TranslateInput;
