import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TransactionForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    type: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    amount: Yup.number().positive("Must be positive").required("Required"),
  });

  return (
    <Formik
      initialValues={{ type: "", description: "", amount: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <TextField
            select
            label="Type"
            name="type"
            value={values.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <ErrorMessage name="type" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            label="Description"
            name="description"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="description" component="div" style={{ color: "red" }} />

          <Field
            as={TextField}
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            margin="normal"
          />
          <ErrorMessage name="amount" component="div" style={{ color: "red" }} />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Transaction
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;