import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import axios, { AxiosInstance } from "axios";
import React from "react";
import {
  Control,
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import Form from "..";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const url = "https://our-backend-base-url.com/";
const path = "api/form";

const mockForm: UseFormReturn<FieldValues, any> = {
  watch: jest.fn(),
  getValues: jest.fn(),
  getFieldState: jest.fn(),
  setError: jest.fn(),
  clearErrors: jest.fn(),
  setValue: jest.fn(),
  trigger: jest.fn(),
  formState: {} as FormState<FieldValues>,
  resetField: jest.fn(),
  reset: jest.fn(),
  handleSubmit: jest.fn(),
  unregister: jest.fn(),
  control: {} as Control<FieldValues, any>,
  register: jest.fn(),
  setFocus: jest.fn(),
};
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

const api = axios.create({
  baseURL: url,
});

describe("Form component", () => {
  test("renders the form, fires the onSubmit function, and makes a POST call with the correct arguments", async () => {
    // Mock the useForm hook to return the mock form object
    (useForm as jest.Mock).mockReturnValue(mockForm);

    // Create a mock instance of Axios
    const mockedApi: AxiosInstance =
      axios as unknown as jest.Mocked<AxiosInstance>;

    // Mock the post method of the Axios instance
    mockedApi.post = jest.fn().mockResolvedValue({ data: {} });

    // Spy on the console.log function
    const consoleLogSpy = jest.spyOn(console, "log");

    // Render the <Form /> component with the mock form and axios instance
    render(
      <Form form={mockForm} api={mockedApi} path="api/form">
        <div>
          <input type="text" />
          <button type="submit">Submit</button>
        </div>
      </Form>
    );

    // Get the handleSubmit function from mockForm
    const handleSubmitFunction =
      mockForm.handleSubmit as SubmitHandler<FieldValues>;

    // Spy on the handleSubmit function
    const handleSubmitSpy = jest.spyOn(mockForm, "handleSubmit");

    // Fire the form submit event
    // fireEvent.submit(screen.getByRole("form"));

    // Wait for the handleSubmit function to be called and the asynchronous operations to complete
    await waitFor(() => {
      expect(handleSubmitFunction).toHaveBeenCalledTimes(1);
      expect(handleSubmitSpy).toHaveBeenCalledTimes(1);

      // Assert that the axios post method has been called
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
      expect(mockedApi.post).toHaveBeenCalledWith(
        "/api/formm",
        expect.any(Object)
      );
    });
  });
});
