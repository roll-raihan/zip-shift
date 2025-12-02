import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import UseAuth from '../../hooks/UseAuth';

const SendParcel = () => {

    const {
        register,
        handleSubmit,
        control,
        // formState: { errors }
    } = useForm();

    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    // console.log(regions);

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    // filtering districts of selected region
    const districtByRegion = region => {
        const regionDistrictsFilter = serviceCenters.filter(c => c.region === region);
        const districts = regionDistrictsFilter.map(d => d.district);
        return districts;
    }

    const handleSendParcel = (data) => {
        // console.log(data);

        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        // console.log(isSameDistrict);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        // console.log('cost', cost);
        data.cost = cost;

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost} Tk.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment."
        }).then((result) => {
            if (result.isConfirmed) {

                // send parcel data  to the database
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        
                        console.log('after confirming parcel', res.data);
                        
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel has created. Please pay.",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='my-10 bg-white rounded-2xl overflow-hidden mt-10 mb-20 m-5 p-10'>
            <h2 className="text-4xl font-bold my-5">Send A Parcel</h2>
            <h4 className='font-bold'>Enter your parcel details</h4>
            <form onSubmit={handleSubmit(handleSendParcel)} className='my-5 text-black'>

                <div className='border-t border-gray-200 my-5'></div>

                {/* parcel document */}
                <div className='flex gap-5'>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel info: name and weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-4'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (KG)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight (KG)" />
                    </fieldset>
                </div>

                <div className='border-t border-gray-200 my-5'></div>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender details */}
                    <fieldset className="fieldset">
                        <h4 className='text-2xl font-semibold'>Sender Details</h4>

                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />

                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />

                        {/* region */}
                        <fieldset className="fieldset text-gray-500">
                            <legend>Region</legend>
                            <select defaultValue="Pick your region" {...register('senderRegion')} className="select w-full">
                                <option disabled={true}>Pick your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        {/* district */}
                        <fieldset className="fieldset text-gray-500">
                            <legend>Sender District</legend>
                            <select defaultValue="Pick your District" {...register('senderDistrict')} className="select w-full">
                                <option disabled={true}>Pick your District</option>
                                {
                                    districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        <label className="label">Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                        <label className="label">Sender Phone No.</label>
                        <input type="number" {...register('senderPhone')} className="input w-full" placeholder="Sender Phone No." />

                        <label className="label">Pickup Instruction</label>
                        <textarea className="textarea w-full" {...register('pickupInstruction')} placeholder="Pickup Instruction"></textarea>

                    </fieldset>

                    {/* receiver details */}
                    <fieldset className="fieldset">
                        <h4 className='text-2xl font-semibold'>Receiver Details</h4>

                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                        <label className="label">Receiver Email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                        {/* region */}
                        <fieldset className="fieldset text-gray-500">
                            <legend className="">Region</legend>
                            <select defaultValue="Pick your region" {...register('receiverRegion')} className="select w-full">
                                <option disabled={true}>Pick your region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        {/* district */}
                        <fieldset className="fieldset text-gray-500">
                            <legend>Receiver District</legend>
                            <select defaultValue="Pick your District" {...register('receiverDistrict')} className="select w-full">
                                <option disabled={true}>Pick your District</option>
                                {
                                    districtByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        <label className="label">Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                        <label className="label">Receiver Contact No.</label>
                        <input type="number" {...register('receiverPhone')} className="input w-full" placeholder="Receiver Contact No." />

                        <label className="label">Delivery Instruction</label>
                        <textarea className="textarea w-full" {...register('deliveryInstruction')} placeholder="Delivery Instruction"></textarea>

                    </fieldset>
                </div>
                <input type="submit" className='btn btn-primary text-black font-bold my-5' value="Proceed to Confirm Booking" />
            </form>
        </div>
    );
};

export default SendParcel;