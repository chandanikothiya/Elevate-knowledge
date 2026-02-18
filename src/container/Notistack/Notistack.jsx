

import Button from '@mui/material/Button';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React from 'react';

function Notistack(props) {
    return (
        <div>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />

            <Button variant="contained" onClick={() => enqueueSnackbar('Your notification here', { variant: 'success' })}>show success snackbar</Button>
            <br /><br />

            <Button variant="contained" onClick={() => enqueueSnackbar('Your notification here', { variant: 'error' }, {})}>show error snackbar</Button>
            <br /><br />

            <Button variant="contained" onClick={() => enqueueSnackbar('Your notification here', { variant: 'warning' })}>show warning snackbar</Button>
            <br /><br />

            <Button variant="contained" onClick={() => enqueueSnackbar('Your notification here', { variant: 'info' })}>show info snackbar</Button>
        </div>
    );
}

export default Notistack;