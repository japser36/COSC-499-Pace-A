import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import fetch from 'node-fetch'

//Makes use of code taken from https://material-ui.com/components/autocomplete/ under the asynchronous requests section

interface Skills {
  name: string
}

export default function SkillSelect({ setSkills }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Skills[]>([])
  const [selected, setSelected] = useState<Skills[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      let skills = []
      await fetch('../api/skills', { method: 'GET' })
        .then((res) => res.json())
        .then((res) => (skills = res))

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
        freeSolo
        multiple
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
          setSelected(Object.keys(value).map((key) => value[key]) as Skills[])
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Skills"
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
      <Button
        variant="contained"
        onClick={() => {
          setSkills(selected)
        }}
      >
        Submit Skills
      </Button>
    </>
  )
}
