import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import Title from "../title/Title";

const NewsLetter = () => {
  const [currentMail, setCurrentMail] = useState('');
  return (
    <div>

      <Title text={" Subscribe Our Letter"} />
      <section className="bg-teal-800 mt-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-teal-100 sm:text-4xl">
              Stay Updated on the Latest Games!
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-teal-300 md:mb-12 sm:text-xl">
              Get exclusive game reviews, trending titles, and secret tips
              delivered directly to your inbox. Don’t miss out on the action!
            </p>
            <form onSubmit={(e) => {
              e.preventDefault()
              setCurrentMail('')
            }}>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-teal-900"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <TfiEmail className="text-green-700" />
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-teal-900 bg-teal-50 rounded-lg border border-teal-300 sm:rounded-none sm:rounded-l-lg focus:ring-transparent focus:border-transparent outline-none"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    required
                    onChange={(e) => {
                      setCurrentMail(e.target.value)
                    }}
                    value={currentMail}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-green-700 border-green-600 sm:rounded-none sm:rounded-r-lg hover:bg-green-800"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
