import { Profile } from '../Profile/Profile';

import { List, ListItem } from './PilotsList.styled';

export const PilotList = ({ pilots }) => {
  return (
    <List>
      {pilots.map(pilot => {
        return (
          <ListItem key={pilot.id}>
            <Profile pilot={pilot} />
          </ListItem>
        );
      })}
    </List>
  );
};
