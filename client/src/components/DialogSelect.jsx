import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

let referees = ["Ref1", "Ref1", "Ref1", "Ref1", "Ref1", "Ref1", "Ref1", "Ref1",]

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [referee, setReferee] = React.useState('');

  const handleChange = (event) => {
    setReferee(event.target.value || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Select New Referee</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select New Referee</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Referee</InputLabel>
              <Select
                native
                value={referee}
                onChange={handleChange}
                input={<OutlinedInput label="Referee" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
  {referees.map((referee) => (
    <option key={referee} value={referee}>
      {referee}
    </option>
  ))}
                
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}