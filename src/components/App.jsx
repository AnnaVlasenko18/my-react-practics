import { GiAbstract024} from 'react-icons/gi';
import { PilotList } from './PilotList';
import pilots from '../pilots.json';

export const App = () => {
  return (
    <div>
      <h1>Top rated pilots <GiAbstract024 size="40" /></h1>
      <PilotList pilots={pilots} />
    </div>
  );
};
