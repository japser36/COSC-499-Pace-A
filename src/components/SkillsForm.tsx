import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import Fragment from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import qs from 'qs'
import fetch from 'node-fetch'

interface Skills {
  name: string
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export default function SkillsForm() {
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
      await fetch('../api/skills', { method: 'GET' })
        .then((res) => res.json())
        .then((res) => (skills = res))
      console.log(skills)
      await sleep(1e3) // For demo purposes.

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
    <AutoComplete
      id="skillsform"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
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
  )
}
