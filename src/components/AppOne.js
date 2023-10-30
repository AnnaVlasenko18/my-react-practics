import { ProfileOne } from './ProfileOne';


const jacob = {
  id: '1',
  name: 'Jacob Mercer',
  email: 'j.mercer@mail.com',
  age: 32,
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCSDHwbsJksZlqccC_Hdmaf75zl3VG0aTDnUQxS0uBbL9EjMOjejBe2fPQb9Gyh2rZ8w&usqp=CAU',
};

const olendau = {
  id: '3',
  name: 'Olendau Jackson',
  email: 'o.jackson@mail.com',
  age: 39,
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Vmtqupl5WKIsVe83rJSzJmWfIn-sdOq9P8Rk8iY7ymK6ZhgRrNv85sgYAjwHUsCiik0&usqp=CAU',
};

export const App = () => {
  return (
    <div>
      <ProfileOne
        username={jacob.name}
        imgUrl={jacob.avatar}
        age={jacob.age}
        email={jacob.email}
      />
      <ProfileOne
        username={olendau.name}
        imgUrl={olendau.avatar}
        age={olendau.age}
        email={olendau.email}
      />
    </div>
  );
};