import { useState, useEffect } from 'react'
import React from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getTimezones } from '../../utils/api'
import { TextValidator } from 'react-material-ui-form-validator'

//Makes use of code taken from https://material-ui.com/components/autocomplete/ under the asynchronous requests section

interface Timezone {
  value: number
  label: string
  abbr: string
}

const TimezoneSelect = ({ setTimezone, required = false, validators = [], errorMessages = [] }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Timezone[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const timezones = await getTimezones()
      //console.log(timezones)
      if (active) {
        setOptions(Object.keys(timezones).map((key) => timezones[key]) as Timezone[])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <>
      <AutoComplete
        clearOnBlur
        id="timezoneselect"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(event, value) => {
          setTimezone(value)
        }}
        getOptionSelected={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextValidator
            {...params}
            validators={validators}
            errorMessages={errorMessages}
            label={required ? 'Timezone *' : 'Timezone'}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  )
}

export default TimezoneSelect
