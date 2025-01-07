import { BiHome } from 'react-icons/bi'
import { ImInfo } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  const gotoHome=()=>{
    navigate('/')
  }
  const goBack=()=>{
    navigate(-1)
  }
  return (
    <div>
      <section className="bg-white">
    <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="p-3 text-sm font-medium text-green-500 rounded-full bg-green-50 ">
            <ImInfo />
            </p>
            <h1 className="mt-3 text-2xl font-semibold  md:text-3xl text-black">Page not found</h1>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button onClick={goBack} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100  ">
                    <ImInfo />
                    <span>Go back</span>
                </button>

                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-950 rounded-lg shrink-0 sm:w-auto  hover:bg-teal-600 gap-x-2 flex items-center justify-center" onClick={gotoHome}>
                   <BiHome /> Take me home
                </button>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default NotFound
