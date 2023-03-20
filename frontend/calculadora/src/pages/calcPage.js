import Wrapper from '../components/Wrapper';
import Screen from '../components/Screen';
import ButtonBox from '../components/ButtonBox';
import MyButton from '../components/Button';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const btnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, 'x'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

const CalcPage = () => {
  return (
    <div>
      <Link href="/history">
        {''}<Button variant="contained">Historial</Button>
      </Link>

      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat ().map ((btn, i) => <MyButton value={btn} key={i} />)}
        </ButtonBox>
      </Wrapper>
    </div>
  );
};

export default CalcPage;
