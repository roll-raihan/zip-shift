import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSendParcel = (data) => {
        console.log(data);
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
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

                        <label className="label">Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                        <label className="label">Sender Phone No.</label>
                        <input type="number" {...register('senderPhone')} className="input w-full" placeholder="Sender Phone No." />

                        <label className="label">Sender District</label>
                        <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Sender District" />

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

                        <label className="label">Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                        <label className="label">Receiver Contact No.</label>
                        <input type="number" {...register('receiverPhone')} className="input w-full" placeholder="Receiver Contact No." />

                        <label className="label">Receiver District</label>
                        <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="Receiver District" />

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