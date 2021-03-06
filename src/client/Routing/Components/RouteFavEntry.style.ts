import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  wrap: {
    padding: '.2em',
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr max-content max-content',
    gridTemplateRows: '1fr 1fr',
    gridTemplateAreas: '". s f r" "a d f r"',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  start: {
    gridArea: 's',
  },
  destination: {
    gridArea: 'd',
  },
  arrow: {
    gridArea: 'a',
    justifySelf: 'center',
    marginRight: '1em',
  },
  profile: {
    gridArea: 'f',
  },
  delete: {
    gridArea: 'r',
  },
}));
