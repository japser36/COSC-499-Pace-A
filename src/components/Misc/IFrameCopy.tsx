import { TextField, InputAdornment, IconButton, Tooltip, Snackbar } from '@material-ui/core'
import { FilterNone } from '@material-ui/icons'
import { getIFrame } from '../../utils/misc'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'

const IFrameCopy = ({ org_id }) => {
const [copied, setCopied] = useState(false)
const value = getIFrame(org_id)

    return (
        <>
        <TextField
            label='Embedable Mentee Registration Page'
            defaultValue={value}
            helperText={`Copy this code and embed it into your website to allow new mentees to register with your organization.`}
            variant='outlined'
            fullWidth
            InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position='end'>
                    <CopyToClipboard text={value} onCopy={() => {setCopied(true)}}>
                        <Tooltip title='Copy to clipboard' placement='bottom-end'>
                            <IconButton >
                                <FilterNone />
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </InputAdornment>
            }}
        />
        <Snackbar 
            message='Copied to clipboard!'
            open={copied}
            onClose={() => {setCopied(false)}}
            autoHideDuration={5000}
        />
        </>
    )
}

export default IFrameCopy