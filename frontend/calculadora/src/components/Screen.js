import {useContext} from 'react';
import {CalcContext} from '../context/CalcContext';
import Typography from '@mui/material/Typography';

const Screen = () => {
  const {calc} = useContext (CalcContext);

  return (
    <Typography
      style={{wordWrap: 'break-word'}}
      variant="h3"
      className="screen"
    >
      {calc.operation}
      {calc.number !== 0 ? calc.number : calc.operation ? 0 : 0}
    </Typography>
  );
};

export default Screen;
