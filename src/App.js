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


const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };
  return (
    <div>
    <span>
    <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
    <button type="button" onClick={() => onRemoveItem(item)}>
    Dismiss
    </button>
    </span>
      </div>
  );
};
  

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
}; 

const InputWithLabel = ({ id, children, value, onInputChange, isFocused, type = 'text' }) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
    inputRef.current.focus();
    }
    }, [isFocused]);

    return (
      <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
      ref={inputRef}
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}/>
      </>
    )
};

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

  const getAsyncStories = () =>
    new Promise(resolve =>
      setTimeout(
      () => resolve({ data: { stories: initialStories } }),
    2000)
  );

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
    .then(result => {
      setStories(result.data.stories);

      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
    story => item.objectID !== story.objectID
    );
    setStories(newStories);
    };

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

    {isError && <p>Something went wrong ...</p>}

    {isLoading ? (
    <p>Loading ...</p>
    ) : (
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    )}
    </div>
  );
}

export default App;
