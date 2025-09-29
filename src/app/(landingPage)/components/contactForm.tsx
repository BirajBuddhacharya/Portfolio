"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import FormInput from "./formInput";
import { toast } from "sonner"
import Image from 'next/image'
import CustomButton from "./customButton"

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
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
      // starting loading
      setLoading(true)

      // sending email
      const response = await axios.post(
        "/api/contact/",
        formData
      );

      // displaying success message
      toast(JSON.stringify(response.data.message).replace(/"/g, ""));

      // clearing contact form
      setFormData({ email: "", message: "" }); // Clear input fields after submit
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";

      toast(`${JSON.stringify(errorMessage).replace(/[{}"]/g, "")}`);
    }

    // disabling loading
    setLoading(false)
  };

  return (
    <form
      className="flex-1 flex flex-col text-left p-10"
      onSubmit={handleSubmit}
      method="POST"
      id="contact"
    >
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
        <CustomButton text="submit" loading={loading} className="mt-2"/>
      </div>
    </form>
  );
}

export default ContactForm;
