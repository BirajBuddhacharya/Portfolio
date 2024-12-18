interface FormInputProps {
    label: string;
    placeholder: string;
    name: string;
    type: "text" | "number" | "email" | "textarea"; // You can extend this if needed
    value: string; // Pass the current value from the formData state
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Function to handle changes
}

function FormInput({ label, placeholder, name, type, value, onChange }: FormInputProps) {
    if (type === "textarea") {
        return (
            <div className="my-2 gap-1 flex flex-col">
                <label htmlFor={name}>{label}</label>
                <textarea
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className="p-2 rounded-md border border-gray-300"
                    value={value} // Bind the value to the formData state
                    onChange={onChange} // Trigger the change handler
                ></textarea>
            </div>
        );
    }

    return (
        <div className="my-2 gap-1 flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                className="p-2 rounded-md border border-gray-300"
                value={value} // Bind the value to the formData state
                onChange={onChange} // Trigger the change handler
            />
        </div>
    );
}

export default FormInput;