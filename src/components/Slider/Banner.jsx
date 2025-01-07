import { Link } from 'react-router-dom';
export default function Banner({ ban, title, description }) {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${ban})`,
            }}>
            <div className={`hero-overlay bg-opacity-10`}></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md space-y-11">
                    <h1 className="mb-5 lg:text-5xl md:text-4xl text-3xl font-bold text-white ">{title}</h1>
                    <p className="mb-5">{description}</p>
                    <Link to={"/reviews"} className="btn bg-teal-700 mb-14 text-white border-0 w-52 hover:text-black">All Reviews</Link>
                </div>
            </div>
        </div>
    )
}
