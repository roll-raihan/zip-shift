import React from 'react';
import quote from '../../../assets/reviewQuote.png'

const ReviewCard = ({ review }) => {

    const { userName, review: testimonial, user_photoURL } = review;

    return (
        <div className="max-w-sm bg-white shadow-md rounded-2xl p-6 border border-gray-100">
            {/* Quote Icon */}
            <div className="text-teal-300 text-4xl mb-3"><img src={quote} alt="" /></div>


            {/* Review Text */}
            <p className="text-gray-600 leading-relaxed mb-6">
                {testimonial}
            </p>


            <div className="border-t border-dashed border-gray-300 my-4"></div>


            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mt-4">
                <div className="w-10 h-10 rounded-full bg-teal-900">
                    <img src={user_photoURL} alt="" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{userName}</h3>
                    <p className="text-sm text-gray-500">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;