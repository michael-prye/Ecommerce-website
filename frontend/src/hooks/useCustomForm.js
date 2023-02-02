import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "isEmployee") {
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
      console.log(formData)
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
      //console.log(formData)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
