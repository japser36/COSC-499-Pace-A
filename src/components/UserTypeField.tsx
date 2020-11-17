import TextField from '@material-ui/core/TextField'

const UserTypeField = ({ userType, id, value, onChange }) => {
  let label = ''
  let multiline = false
  let helperText = ''
  if (userType === 'Mentee') {
    label = 'Skills'
    multiline = true
    helperText = 'List each skill on a new line.'
  } else if (userType === 'Mentor') {
    label = 'Skills'
    multiline = true
    helperText = 'List each skill on a new line.'
  } else if (userType === 'Admin') {
    label = 'Organization Name'
    multiline = false
    helperText = ''
  }

  if (userType) {
    return (
      <>
        <TextField
          required
          multiline={multiline}
          id={id}
          label={label}
          value={value}
          helperText={helperText}
          onChange={onChange}
        />
      </>
    )
  } else {
    return <></>
  }
}

export default UserTypeField
