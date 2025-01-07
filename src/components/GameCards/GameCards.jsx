import { useNavigate } from 'react-router-dom';
import Title from '../title/Title';

const GameCards = ({ games, title}) => {
    const navigate = useNavigate();
    return (
        <>
            {
                title && <Title text={title} />
            }
            {games.length ?
                <div className='lg:mx-24 grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10 shadow-xl pb-12 mb-10 justify-center'>
                    {games?.map((game) => (
                        <div
                            key={game.gameTitle}
                            className="mx-auto shadow-xl rounded-xl py-4 w-[95%]"

                        >
                            <div className="card mx-auto bg-base-100 max-w-80 flex flex-col h-full relative">
                                <div className="badge bg-teal-500 dark:bg-teal-700 text-white border-0 rounded-sm absolute top-0 right-0 z-10 py-4 px-6 rounded-bl-3xl">
                                    Rating: <span className="ml-1 font-semibold">{game.rating}</span>
                                </div>
                                <figure className="rounded-3xl mt-7">
                                    <img
                                        className="p-3 w-[90%] rounded-3xl object-cover mt-1 h-48 bg-white dark:bg-base-300"
                                        src={game.gameCoverUrl}
                                        alt={game.gameTitle}
                                    />
                                </figure>
                                <div className="card-body p-4 flex-grow break-words">
                                    <h2 className="card-title">{game.gameTitle.slice(0, 40)}</h2>
                                    <p className="text-gray-500 w-full">{game.reviewDescription.slice(0, 70)}...</p>
                                    <div className="card-actions mt-auto bg-gray-50 dark:bg-base-300  px-6 rounded-2xl">
                                        <div className="justify-between flex w-full mt-1 text-gray-700">
                                            <p className='dark:text-gray-400'>Genre:</p>
                                            <p className="text-right dark:text-gray-400">{game.genre}</p>
                                        </div>
                                        <div className="justify-between flex w-full mb-1 text-gray-700">
                                            <p className='dark:text-gray-400'>Year:</p>
                                            <p className="text-right dark:text-gray-400">{game.publishingYear}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate(`/review/${game._id}`)} className='bg-teal-700 dark:bg-teal-800 dark:text-gray-300 text-white py-2 rounded-xl'>
                                        Explore Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <p className='text-center'>No Games Found</p>
            }
        </>
    );
};

export default GameCards;
