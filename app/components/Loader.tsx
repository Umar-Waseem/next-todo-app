import React from "react";

function Loader() {
    return (
        <div className="flex items-center justify-center mb-4">
            <svg
                id="svg-spinner"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
            >
                <circle cx="24" cy="4" r="4" fill="red" />
                <circle cx="12.19" cy="7.86" r="3.7" fill="red" />
                <circle cx="5.02" cy="17.68" r="3.4" fill="red" />
                <circle cx="5.02" cy="30.32" r="3.1" fill="red" />
                <circle cx="12.19" cy="40.14" r="2.8" fill="red" />
                <circle cx="24" cy="44" r="2.5" fill="red" />
                <circle cx="35.81" cy="40.14" r="2.2" fill="red" />
                <circle cx="42.98" cy="30.32" r="1.9" fill="red" />
                <circle cx="42.98" cy="17.68" r="1.6" fill="red" />
                <circle cx="35.81" cy="7.86" r="1.3" fill="red" />
            </svg>
        </div>
    );
}

export default Loader;