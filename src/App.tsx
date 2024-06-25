import React, {useEffect, useState} from 'react';
import classes from './App.module.scss';
import {ImCheckboxChecked, ImCheckboxUnchecked} from 'react-icons/im';
import './index.scss';
import Loader from './Loader';
import {useValue} from "./hooks/use-value";
import axios from 'axios';
import Pagination from "./pagination/Pagination";



interface Todo {
    title: string;
    isCompleted: boolean;
}

const App = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [activeButton, setActiveButton] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [infoBlock, setInfoBlock] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>('All');

    const sortedArray = React.useMemo(() => {
        if (!todos) return [];

        const data = [...todos];
        switch (sortCriteria) {
            case 'All':
                return data;
            case 'Completed':
                return data.filter((todo: Todo) => todo.isCompleted);
            case 'NotCompleted':
                return data.filter((todo: Todo) => !todo.isCompleted);
            default:
                return data;
        }
    }, [todos, sortCriteria]);

    const hoveredHandler = (index: number | null, value: boolean) => {
        setInfoBlock(value);
        setHoveredIndex(index);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTodoHandler = (title: string) => {
        setLoading(true);
        setTodos((prevTodos: Todo[]) => [...prevTodos, {title: title, isCompleted: false}]);
        setInputValue('');
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const isCompleteHandler = (index: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, i) => (i === index ? {...todo, isCompleted: !todo.isCompleted} : todo)),
        );
    };

    const clearHandler = () => {
        setSortCriteria('All');
        setLoading(true);
        setTodos((prevTodos: Todo[]) => [...prevTodos.filter((todo: Todo) => !todo.isCompleted)]);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    useEffect(() => {
        setActiveButton(inputValue.length <= 2);
    }, [inputValue]);




    const [data,setData] = useState([])
    const [error,setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    const fetchData = async () => {
        try {

            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            console.log('response', response)
            setData(response.data);
            return response
        }
        catch (error:any){
            console.log(error)
            setError('Error fetching data')
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    const {value,toggleValue} = useValue(false)

    return (

        <div className={classes.App}>

            <h1>Git branch -v</h1>

            <h1>FIX branch</h1>


            <div className={classes.button_block}>
                <button onClick={toggleValue}>Click</button>
                {value ? 'true' : 'false'}

                {data.length > 0 && currentPosts.map((item: any) => (
                    <div key={item.id}>{item.name}</div>
                ))}

                <Pagination
                    totalPosts={data.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />


            </div>



            <div className={classes.todo_block}>
                <h1>Todos:</h1>

                <div className={classes.input_block}>
                    <input
                        type="text"
                        placeholder="Enter todo, todo must contain more than 3 characters"
                        autoComplete="off"
                        autoCorrect="off"
                        maxLength={40}
                        value={inputValue}
                        onChange={onChangeHandler}
                    />
                    <button
                        className={!activeButton ? classes.add_button : classes.disabled}
                        disabled={activeButton}
                        onClick={() => addTodoHandler(inputValue)}
                    >
                        Add todo
                    </button>
                </div>
                <div className={classes.todos_items}>
                    {todos.length === 0 && !loading && <h2>You don't have any todo's</h2>}
                    {loading ?
                        <div className={classes.loader_block}><Loader width="70" height="70" color="gray"/></div> :
                        <>
                            {sortedArray.map((todo: Todo, index) => (
                                <div
                                    key={index}
                                    className={classes.todo_item_wrapper}
                                    onClick={() => isCompleteHandler(index)}
                                    onMouseEnter={todo.title.length > 25 ? () => hoveredHandler(index, true) : undefined}
                                    onMouseLeave={todo.title.length > 25 ? () => hoveredHandler(null, false) : undefined}
                                >
                                    {todo.isCompleted ?
                                        <ImCheckboxChecked color="green" size={20} className={classes.svg_completed}/> :
                                        <ImCheckboxUnchecked color="gray" size={20}
                                                             className={classes.svg_not_completed}/>}
                                    <span

                                        className={classes.todo_item}>{todo.title.length > 25 ? todo.title.slice(0, 25) + '...' : todo.title}</span>
                                         {infoBlock && index === hoveredIndex &&
                                        <div className={classes.info_block}>{todo.title}</div>}
                                </div>
                            ))}
                        </>
                    }
                </div>

                <div className={classes.todo_down_menu}>
                    <div
                        className={classes.todo_down_menu_item}>{todos.length === 0 ? 'Items:' : `Items: ${todos.length}`}</div>
                    <div className={`${classes.todo_down_menu_item} ${sortCriteria === 'All' ? classes.active : ''}`}
                         onClick={() => setSortCriteria('All')}>All
                    </div>
                    <div
                        className={`${classes.todo_down_menu_item} ${sortCriteria === 'NotCompleted' ? classes.active : ''}`}
                        onClick={() => setSortCriteria('NotCompleted')}>Active
                    </div>
                    <div
                        className={`${classes.todo_down_menu_item} ${sortCriteria === 'Completed' ? classes.active : ''}`}
                        onClick={() => setSortCriteria('Completed')}>Completed
                    </div>
                    <div className={classes.todo_down_menu_item} onClick={clearHandler}>Clear Completed</div>
                </div>
            </div>
        </div>

    );
};

export default App;
