import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);//for search
    // console.log(serviceCenters)

    const handleSearchDistrict = (e) => {
        e.preventDefault();
        const location = e.target.location.value;

        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            // console.log(location,district)

            //go to the location
            mapRef.current.flyTo(coord, 14);
        }
    }

    return (
        <div className='my-10'>
            <h2 className="text-4xl font-semibold text-center my-5">We are available in 64 districts</h2>
            <div className='my-5 ml-5'>
                <form onSubmit={handleSearchDistrict}>
                    <label className="input relative">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name='location' required placeholder="Search" />
                        <button className='btn btn-active absolute right-0'>Search</button>
                    </label>
                </form>
            </div>
            <div className='border h-[800px] w-full'>
                <MapContainer center={position} zoom={8} scrollWheelZoom={false} ref={mapRef} className='h-[800px]'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map((center, index) => <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong> <br /> Service Area:{center.covered_area.join(',')}.
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;