import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";

const addSupplierSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("companyName Required"),
  contactName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("contactName Required"),
});

function AddSupplierWithFormik() {
  return (
    <>
      <Formik
        validationSchema={addSupplierSchema}
        initialValues={{
          companyName: "",
          contactName: "",
        }}
        onSubmit={(values) => {
          //   axios.post("",values)
          //   .then(res=>)
          // }}
          console.log("Values:", values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {errors.companyName && <div>{errors.companyName}</div>}
            <div>
              <label htmlFor="firstName">Company Name</label>
              <Field
                id="companyName"
                name="companyName"
                placeholder="Company Name"
              />
            </div>

            <div>
              {errors.contactName && <div>{errors.contactName}</div>}
              <label htmlFor="lastName">Contact Name</label>
              <Field
                id="contactName"
                name="contactName"
                placeholder="Contact Name"
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddSupplierWithFormik;
