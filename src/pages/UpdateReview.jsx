import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Title from "../components/title/Title"
import Loading from "../pages/Loading"
const UpdateReview = () => {

  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData(data);
      setIsLoading(false);
    }
  }, [data]);

  const navigate = useNavigate();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_BACKEND_URL}update-review/${formData._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        toast.success("Review updated successfully!");
        navigate("/my-reviews");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to update review.");
    }
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <Loading />
  }
  return formData.message === "Failed to get review" ? (<p className="text-center pt-10">No Data Found</p>) : (
    <div className="max-w-[80%] mx-auto">

      <Title text={"Update Review"}></Title>
      <div className="lg:px-60 md:px-20 px-2 md:py-20 py-2 bg-green-950 dark:bg-sky-900  rounded-xl">
        <form
          className="card-body bg-white dark:bg-indigo-950 lg:px-[15%] md:px-12 px-4 py-10 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Game Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter game title"
              name="gameTitle"
              value={formData.gameTitle}
              onChange={handleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Game Cover URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter game cover image URL"
              name="gameCoverUrl"
              value={formData.gameCoverUrl}
              onChange={handleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Review Description</span>
            </label>
            <textarea
              placeholder="Write your review"
              name="reviewDescription"
              value={formData.reviewDescription}
              onChange={handleFieldChange}
              className="textarea textarea-bordered dark:bg-white dark:text-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              type="number"
              placeholder="Enter rating (1-10)"
              name="rating"
              value={formData.rating}
              onChange={handleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              min="1"
              max="10"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Publishing Year</span>
            </label>
            <input
              type="number"
              placeholder="Enter publishing year (e.g., 2024)"
              name="publishingYear"
              value={formData.publishingYear}
              onChange={handleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleFieldChange}
              className="select select-bordered dark:bg-white dark:text-black"
              required
            >
              <option value="" disabled>
                Select Genre
              </option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
              <option value="Sports">Sports</option>
              <option value="Horror">Horror</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Fighting">Fighting</option>
              <option value="Racing">Racing</option>

            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="dark:bg-white dark:text-black input input-bordered text-gray-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="dark:bg-white dark:text-black input input-bordered text-gray-500"
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-green-950 text-white hover:bg-teal-950 dark:bg-indigo-50 dark:text-black dark:border-0"
            >
              Update Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default UpdateReview;
