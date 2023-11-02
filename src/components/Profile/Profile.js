import { IoMdMail } from 'react-icons/io';
import { CardWrapeer, UsereFoto, Text, Accent } from './Profile.styled';

export const Profile = ({ pilot: { avatar, name, email, age, rank } }) => {
  return (
    <CardWrapeer $rank={rank}>
      <UsereFoto src={avatar} alt={name} width="120" height="120" />
      <Text>
        <Accent>Username: </Accent>
        {name}
      </Text>
      <Text>
        <Accent>
          Email: <IoMdMail />{' '}
        </Accent>
        {email}
      </Text>
      <Text>
        <Accent>Age: </Accent>
        {age}
      </Text>
      <Text>
        <Accent>Rank: </Accent>
        {rank}
      </Text>
    </CardWrapeer>
  );
};
