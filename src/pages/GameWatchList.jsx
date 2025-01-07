import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import Title from '../components/title/Title';
import Loading from '../pages/Loading'
export default function GameWatchList() {
  const { user } = useContext(AuthContext);
  const [WatchLists, setWatchLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_BACKEND_URL}watchlist/${user.email}`)
        .then((res) => res.json())
        .then((data) => setWatchLists(data))
        .catch((error) => console.error("Failed to fetch watchlist:", error))
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}watchlist`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Watchlist item deleted successfully") {
              toast.success(data.message);
              setWatchLists((prevWatchLists) => prevWatchLists.filter((WatchList) => WatchList._id !== id));
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            console.error("Error deleting WatchList:", error);
            toast.error("Error deleting WatchList. Please try again.");
          });
      }
    });
  };
  return isLoading ? <Loading /> : (
    <div className="p-5 md:max-w-[70%]  max-w-full text-xs md:text-sm lg:text-lg mx-auto">

      <Title text={"My WatchLists"} />
      {WatchLists.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border dark:border-gray-500  dark:bg-blue-950  bg-white rounded-xl border-gray-300">
            <thead>
              <tr className="text-left">
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Game Title</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Rating</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Genre</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {WatchLists.map((WatchList) => (
                <tr key={WatchList._id}>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {WatchList.gameTitle}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {WatchList.rating}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {WatchList.genre}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(WatchList._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No WatchLists found.</p>
      )}
    </div>
  );
}











