import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import UseAuth from '../../hooks/UseAuth';
import { useLoaderData } from 'react-router';
import agentPending from '../../assets/agent-pending.png'
import Swal from 'sweetalert2';

const BeARider = () => {

    const {
        register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();

    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    // console.log(regions);

    // filtering districts of selected region
    const districtByRegion = region => {
        const regionDistrictsFilter = serviceCenters.filter(c => c.region === region);
        const districts = regionDistrictsFilter.map(d => d.district);
        return districts;
    }

    const riderRegion = useWatch({ control, name: 'riderRegion' });



    const handleRiderApplication = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your data submitted successfully. We will reach to you in 15 days.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                };
            })
    }

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mt-10 mb-20 m-5 p-10'>
            <div>
                <h2 className="text-4xl font-bold text-secondary">Be A Rider</h2>
                <p className='text-wrap'>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
                <form onSubmit={handleSubmit(handleRiderApplication)} className='my-5 text-black'>

                    <div className='border-t border-gray-200 my-5'></div>

                    {/* two column */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                        {/* sender details */}
                        <fieldset className="fieldset">
                            <h4 className='text-2xl font-semibold'>Tell us about yourself</h4>

                            <label className="label">Your Name</label>
                            <input type="text" {...register('riderName')} defaultValue={user?.displayName} className="input w-full" placeholder="Your Name" />

                            <label className="label">Your Email</label>
                            <input type="email" {...register('riderEmail')} defaultValue={user?.email} className="input w-full" placeholder="Your Email" />

                            <label className="label">Driving License Number</label>
                            <input type="number" {...register('licenseNumber')} className="input w-full" placeholder="Driving License Number" />

                            <label className="label">NID no.</label>
                            <input type="number" {...register('nid')} className="input w-full" placeholder="NID" />

                            {/* region */}
                            <fieldset className="fieldset text-gray-500">
                                <legend>Your Region</legend>
                                <select defaultValue="Select your region" {...register('riderRegion')} className="select w-full">
                                    <option disabled={true}>Select your region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* district */}
                            <fieldset className="fieldset text-gray-500">
                                <legend>Your District</legend>
                                <select defaultValue="Select your District" {...register('riderDistrict')} className="select w-full">
                                    <option disabled={true}>Select your District</option>
                                    {
                                        districtByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            <label className="label">Address</label>
                            <input type="text" {...register('riderAddress')} className="input w-full" placeholder="Your Address" />

                            <label className="label">Your Phone No.</label>
                            <input type="number" {...register('yourPhone')} className="input w-full" placeholder="Your Phone No." />

                            <label className="label">Bike Brand Model and Year</label>
                            <input type="text" {...register('bikeModel')} className="input w-full" placeholder="Bike Brand Model and Year" />

                            <label className="label">Bike Registration Number</label>
                            <input type="number" {...register('bikeReg')} className="input w-full" placeholder="Bike Registration Number" />

                            <label className="label">Tell Us About Yourself</label>
                            <textarea className="textarea w-full" {...register('aboutYourself')} placeholder="About Yourself"></textarea>

                        </fieldset>

                        {/* receiver details */}
                        <div>
                            <img src={agentPending} alt="" />
                        </div>
                    </div>
                    <input type="submit" className='btn btn-primary text-black font-bold my-5' value="Apply as a Rider" />
                </form>
            </div>
        </div>
    );
};

export default BeARider;