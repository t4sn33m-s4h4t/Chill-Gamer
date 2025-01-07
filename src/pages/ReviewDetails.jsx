import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "./Loading";

const ReviewDetails = () => {
  const { user } = useContext(AuthContext);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const data = useLoaderData();
  const {
    gameCoverUrl,
    gameTitle,
    reviewDescription,
    rating,
    genre,
    publishingYear,
    userEmail,
    userName,
    _id,
  } = data;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleAddToWatchList = () => {
    const watchlistData = { reviewId: _id, gameTitle, rating, genre, userEmail: user.email, userName: user.displayName };
    fetch(`${VITE_BACKEND_URL}watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(watchlistData),
    })
      .then((response) => response.json().then((data) => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status === 201) {
          toast.success(data.message);
        } else if (status === 409) {
          toast.info(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding to watchlist:', error);
        toast.error('Error adding to WatchList. Please try again.');
      });
  };
  if (isLoading) {
    return <Loading />
  }
  return data.message === "Failed to get review" ? <p className="text-center pt-10">No Data Found</p> : (
    <section className="py-10 px-5 dark:bg-blue-950 bg-teal-50 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white dark:bg-sky-950 shadow-lg rounded-lg p-6 ring-2 ring-teal-400">
        <div className="flex flex-col md:flex-row gap-6 align-middle items-center">

          <img
            src={gameCoverUrl}
            alt={gameTitle}
            className="w-full md:w-2/3 max-h-44  rounded-2xl ring-green-400 object-fit md:object-fit"
          />

          <div className="flex flex-col  w-full">
            <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-200">{gameTitle}</h1>
            <p className="text-teal-600 dark:text-teal-400 text-sm mb-3">
              Published: {publishingYear}
            </p>
            <div className="my-4">
              <span className="inline-block bg-teal-100 dark:text-teal-950 text-teal-800 text-sm px-3 py-1 rounded-lg mr-2">
                Genre: {genre}
              </span>
              <span className="inline-block bg-teal-100 dark:text-teal-950 text-teal-800 text-sm px-3 py-1 rounded-lg">
                Rating: {rating}/10
              </span>
            </div>

          </div>

        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-md break-words">{reviewDescription}</p>
        <div className="flex md:flex-row flex-col items-start justify-between md:items-center border-t border-teal-200 mt-6 pt-4">


          <div>
            <h3 className="text-teal-700 dark:text-teal-400 font-semibold text-lg">
              Reviewer Details:
            </h3>
            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Name:</span> {userName}
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              <span className="font-semibold">Email:</span> {userEmail}
            </p>
          </div>

          {
            (user && user.email) ?
              (
                <div className="mt-6 flex justify-end ">
                  <button
                    onClick={handleAddToWatchList}
                    className="py-2 px-5 bg-green-600 dark:bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                  >
                    Add to WatchList
                  </button>
                </div>
              ) :
              null
          }
        </div>
      </div>
    </section>
  );
};

export default ReviewDetails;
