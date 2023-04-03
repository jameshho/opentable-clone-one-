import React from 'react'

type ReviewProps = {
  id: number;
  first_name: string;
  last_name: string;
  text: string;
  rating: number;
  restaurant_id: number;
  user_id: number;
};

const ReviewCard: React.FC<ReviewProps> = ({ id, first_name, last_name, text, rating, restaurant_id, user_id }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 my-4">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">
          {first_name} {last_name}
        </h2>
        <span className="text-gray-500">Rating: {rating}</span>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default ReviewCard;
