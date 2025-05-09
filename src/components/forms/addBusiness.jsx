
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";

const BusinessForm = () => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // Pour gérer le message de succès

  const { register, handleSubmit, formState: { errors },reset } = useForm();

  const onSubmit = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/api/new_submission', data, config);
      if (response.status === 200) {
        // setSuccessMessage('We received your submission, we will review it in the next days.');
  
        // reset(); // Réinitialise le formulaire
  
        // setTimeout(() => {
        //   setSuccessMessage("");
        // }, 2000);

        alert("submission envoyer avec succes!")
      }
    } catch (error) {
      alert("Data not valid or unauthorized");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCities = () => {
      const BACKEND_URL = 'http://localhost:8000/api/cities';
      axios.get(BACKEND_URL)
        .then(response => {
          setCities(response.data);
        });
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchCategories = () => {
      const BACKEND_URL = 'http://localhost:8000/api/categories';
      axios.get(BACKEND_URL)
        .then(response => {
          setCategories(response.data);
        });
    };
    fetchCategories();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/formbuss.jpg")',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1B1F26] p-8 md:p-12 rounded-lg w-full max-w-3xl text-white space-y-6"
      style={{ backgroundColor: 'rgba(29, 35, 39, 0.6)' }}
>
  <h1 className="text-4xl font-light text-center text-white">
    Your{' '}
    <span className="font-medium text-[#F8DDAC]">Compass</span>
  </h1>
  <h2 className="text-xl font-semibold text-center">Add your business</h2>

  
  <div>
    <label className="block text-sm capitalize">Business Name</label>
    <input
      {...register('name', { required: true })}
      type="text"
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Enter business name"
    />
    {errors.name && <p className="text-red-500 text-xs">Business name is required</p>}
  </div>

  
  <div>
    <label className="block text-sm capitalize">Select Category</label>
    <select {...register('category_id', { required: true })}
      className="w-full p-2 rounded border border-gray-400 text-black"
      defaultValue=""
    >
      <option disabled value="">Choose a category</option>
      {categories.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
      ))}
    </select>
    {errors.category_id && <p className="text-red-500 text-xs">Category is required</p>}
  </div>

  
  <div>
    <label className="block text-sm capitalize">Business Description</label>
    <textarea
      {...register('description', { required: true })}
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Description"
      rows="3"
    ></textarea>
    {errors.description && <p className="text-red-500 text-xs">Description is required</p>}
  </div>

  
  <div>
    <label className="block text-sm capitalize">Business Picture</label>
    <input
      type="file"
      className="w-full p-2 rounded bg-transparent text-white"
      {...register('image', { required: true })}
    />
    {errors.image && <p className="text-red-500 text-xs">Image is required</p>}
  </div>

  <div>
    <label className="block text-sm capitalize">Address</label>
    <input
      {...register('address', { required: true })}
      type="text"
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Street address"
    />
    {errors.address && <p className="text-red-500 text-xs">Address is required</p>}
  </div>

  
  <div>
    <label className="block text-sm capitalize">Website</label>
    <input
      {...register('website')}
      type="url"
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Enter website URL"
    />
  </div>

  
  <div>
    <label className="block text-sm capitalize">Select City</label>
    <select {...register('city_id', { required: true })}
      className="w-full p-2 rounded border border-gray-400 text-black"
    >
      <option disabled value="">Select a city</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>{city.name}</option>
      ))}
    </select>
    {errors.city_id && <p className="text-red-500 text-xs">City is required</p>}
  </div>

 
  <div>
    <label className="block text-sm capitalize">Email</label>
    <input
      {...register('email', { required: true })}
      type="email"
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Email Address"
    />
    {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
  </div>

  <div>
    <label className="block text-sm capitalize">Phone Number</label>
    <input
      {...register('phone_number', { required: true })}
      type="tel"
      className="w-full p-2 rounded border border-gray-400 bg-transparent text-white"
      placeholder="Phone Number"
    />
    {errors.phone_number && <p className="text-red-500 text-xs">Phone number is required</p>}
  </div>

 
  <div className="flex justify-between gap-4 pt-6">
    <Link to="/your-cancel-destination" className="w-1/2">
      <button
        style={{ backgroundColor: "white", color: "wheat" }}
        type="reset"
        className="w-full py-3 text-sm bg-white text-black rounded-lg border border-gray-300 hover:shadow-md transition duration-200"
      >
        Cancel
      </button>
    </Link>
    <button
      type="submit"
      className="w-1/2 py-3 text-sm bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
    >
      Submit
    </button>
  </div>
</form>


      
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default BusinessForm;
