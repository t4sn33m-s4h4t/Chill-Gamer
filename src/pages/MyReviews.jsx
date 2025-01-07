import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Title from "../components/title/Title.jsx";
import Loading from '../pages/Loading'

function MyReviews() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_BACKEND_URL}my-reviews/${user.email}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error("Failed to fetch reviews:", error))
        .finally(() => { setIsLoading(false) })
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
        fetch(`${import.meta.env.VITE_BACKEND_URL}delete-review/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Review deleted successfully") {
              toast.success(data.message);
              setReviews(reviews.filter((review) => review._id !== id));
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => console.error("Error deleting review:", error));
      }
    });
  };


  return isLoading ? <Loading /> : (
    <div className="p-5 md:max-w-[70%]  max-w-full text-xs md:text-sm lg:text-md mx-auto">

      <Title text={"My Reviews"} />
      {reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border bg-white dark:bg-blue-950 rounded-xl border-gray-300 dark:border-gray-500">
            <thead>
              <tr className="text-left">
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Game Title</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Rating</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Genre</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Update</th>
                <th className="border dark:border-gray-500 px-2 lg:px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {review.gameTitle}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {review.rating}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    {review.genre}
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    <Link to={`/update-review/${review._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                      Update
                    </Link>
                  </td>
                  <td className="border dark:border-gray-500 px-2 lg:px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews found.</p>
      )}
    </div>
  );
}

export default MyReviews;
