import { useState, useEffect } from 'react'
import React from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import fetch from 'node-fetch'
import { TextValidator } from 'react-material-ui-form-validator'


//Makes use of code taken from https://material-ui.com/components/autocomplete/ under the asynchronous requests section

interface Skills {
  name: string
}

const SkillSelect = ({ setSkills, required = false, validators = [], errorMessages = [] }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Skills[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      let skills = []
      await fetch('/api/skills', { method: 'GET' })
        .then((res) => res.json())
        .then((res) => (skills = res.rows))

      //console.log(skills)
      if (active) {
        setOptions(Object.keys(skills).map((key) => skills[key]) as Skills[])
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
        multiple
        clearOnBlur
        id="skillsform"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(event, value) => {
          setSkills(Object.keys(value).map((key) => value[key]) as Skills[])
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextValidator
            {...params}
            validators={validators}
            errorMessages={errorMessages}
            label={required ? 'Select Skills *' : 'Select Skills'}
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

export default SkillSelect
