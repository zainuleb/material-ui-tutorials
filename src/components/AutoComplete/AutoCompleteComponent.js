import React from 'react';
import top100Films from '../../data/movies.data.js';
import countries from '../../data/countries.data.js';

import { Autocomplete, TextField, Stack, Box } from '@mui/material';

const AutoCompleteComponent = () => {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.label,
  };

  const optionsGroup = top100Films.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  // One time slot every 30 minutes.
  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
        index % 2 === 0 ? '00' : '30'
      }`
  );

  return (
    <>
      <h2>Combo box</h2>
      <div className="autocomplete-variants-block">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </div>
      <h2>AutoComplete Variants</h2>
      <div className="autocomplete-variants-block">
        <Stack spacing={1} sx={{ width: 300 }}>
          <Autocomplete
            className="autocomplete-item-block"
            {...defaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                className="textfield-item-block"
                {...params}
                label="disableCloseOnSelect"
                variant="standard"
              />
            )}
          />
          <Autocomplete
            {...defaultProps}
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="clearOnEscape" variant="standard" />
            )}
          />
          <Autocomplete
            {...defaultProps}
            id="disabled"
            disabled
            renderInput={(params) => (
              <TextField
                {...params}
                label={top100Films[0].label}
                variant="standard"
              />
            )}
          />
        </Stack>
      </div>
      <h2>Countries Dropdown</h2>
      <div className="autocomplete-variants-block">
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
      <h2>Free solo</h2>
      <p>
        Set freeSolo to true so the textbox can contain any arbitrary value.
      </p>
      <div className="autocomplete-variants-block">
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={top100Films.map((option) => option.label)}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
          />
        </Stack>
      </div>
      <h2>Grouped Auto Complete</h2>
      <p style={{ maxWidth: '500px', margin: '0 auto' }}>
        You can group the options with the groupBy prop. If you do so, make sure
        that the options are also sorted with the same dimension that they are
        grouped by, otherwise you will notice duplicate headers.
      </p>
      <div className="autocomplete-variants-block">
        <Autocomplete
          id="grouped-demo"
          options={optionsGroup.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.label}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="With categories" />
          )}
        />
      </div>
      <h2>Disabled options</h2>
      <div className="autocomplete-variants-block">
        <Autocomplete
          id="disabled-options-demo"
          options={timeSlots}
          getOptionDisabled={(option) =>
            option === timeSlots[0] || option === timeSlots[2]
          }
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Disabled options" />
          )}
        />
      </div>
      <h2>Asynchronous requests</h2>
      <span>The component supports two different asynchronous use-cases:</span>
      <div className="autocomplete-variants-block">
        <ol>
          <li>
            Load on open: it waits for the component to be interacted with to
            load the options.
          </li>
          <li>Search as you type: a new request is made for each keystroke.</li>
        </ol>
      </div>
      <div className="autocomplete-variants-block"></div>
    </>
  );
};

export default AutoCompleteComponent;
