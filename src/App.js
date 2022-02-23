import logo from './logo.svg';
import './App.css';

const title = 'React';

const welcome = {
  title: 'React',
  greeting: 'Hey'
}

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const List = ({ list }) => list.map(({ objectID, ...item }) => <Item key={item.objectID} item={...item} />);


const Item = ({ title, url, author, num_comments, points }) => (
  <div>
  <span>
  <a href={url}>{title}</a>
  </span>
  <span>{author}</span>
  <span>{num_comments}</span>
  <span>{points}</span>
  </div>
);

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
}; 

const InputWithLabel = ({ id, children, value, onInputChange, type = 'text' }) => (
  <>
  <label htmlFor={id}>{children}</label>
  &nbsp;
  <input
  id={id}
  type={type}
  value={value}
  onChange={onInputChange}/>
  </>
);

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const searchedStories = stories.filter(story => {
    return story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
    

  return (
    <div>
    <h1>{welcome.greeting} {welcome.title}</h1>

    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={handleSearch}
      >
      <strong>Search:</strong>
    </InputWithLabel>


    <List list={searchedStories}/>

    </div>
  );
}

export default App;
