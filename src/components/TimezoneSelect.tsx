import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import fetch from 'node-fetch'
import TextField from '@material-ui/core/TextField'

//Makes use of code taken from https://material-ui.com/components/autocomplete/ under the asynchronous requests section

interface Timezone {
  value: number
  label: string
  abbr: string
}

const TimezoneSelect = ({ setTimezone }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Timezone[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      let timezones = []
      await fetch('../api/timezones', { method: 'GET' })
        .then((res) => res.json())
        .then((res) => (timezones = res.rows))

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
          <TextField
            {...params}
            label="Timezone"
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
