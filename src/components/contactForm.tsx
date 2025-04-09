"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import FormInput from "./formInput";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the specific field in the formData state
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/connect/",
        formData
      );
      alert("Data Saved" + response);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";
        
        alert(`Failed to save data: ${errorMessage}`);
    }
  };

  return (
    <form
      className="flex-1 flex flex-col text-left p-10"
      onSubmit={handleSubmit}
      method="POST"
      id="contact"
    >
      <FormInput
        label="Name"
        placeholder="Enter your name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <FormInput
        label="Phone Number"
        placeholder="Enter your phone number"
        name="phoneNumber"
        type="number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <FormInput
        label="Email"
        placeholder="Enter your email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormInput
        label="Message"
        placeholder="Enter your message"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
      />
      <div className="flex justify-center">
        <input
          type="submit"
          className="mt-2 bg-primary py-2 px-9 rounded-full hover:cursor-pointer"
          value="Submit"
        />
      </div>
    </form>
  );
}

export default ContactForm;
