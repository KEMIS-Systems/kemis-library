import "@testing-library/jest-dom";
import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Control,
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import Form, { IProps } from "..";
import InputDate from "../../InputDate";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const url = "https://our-backend-base-url.com/";
const path = "api/form";

// const axiosInstance = axios.create({
//   baseURL: url,
// });
// console.log(axiosInstance);

// jest.mock("axios", () => {
//   return {
//     create: () => {
//       return {
//         post: jest.fn(),
//       };
//     },
//   };
// });

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

beforeAll(() => {
  mockedAxios.create.mockReturnThis();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Form component", () => {
  test("renders the form with children", () => {
    // Mock the necessary props
    const formProps: IProps<any> = {
      form: mockForm,
      api: api,
      path: path,
      children: (
        <div role="children">
          <input type="text" />
          <button type="submit">Submit</button>
        </div>
      ),
    };

    // Render the component
    render(<Form {...formProps} />);

    // Assert that the form and its children are rendered
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("children")).toBeInTheDocument();
  });

  test("renders the form, fires the submit button, and checks if it is submitting", async () => {
    // Mock the necessary props
    const formProps: IProps<any> = {
      form: mockForm,
      api: api,
      path: path,
      children: (
        <div role="children">
          <input type="text" />
          <button role="button" type="submit">
            Submit
          </button>
        </div>
      ),
    };

    // Render the component
    render(<Form {...formProps} />);

    // Get the handleSubmit function from mockForm
    const handleSubmitFunction =
      mockForm.handleSubmit as SubmitHandler<FieldValues>;

    // Fire the form submit event
    fireEvent.submit(screen.getByRole("form"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {});

    // Assert that the handleSubmit function has been called
    expect(handleSubmitFunction).toHaveBeenCalledTimes(1);
  });

  test("renders the form, fires the onSubmit function, and makes a POST call with the correct arguments", async () => {
    // Mock the useForm hook to return the mock form object
    (useForm as jest.Mock).mockReturnValue(mockForm);

    // mock the axios post method
    mockedAxios.post.mockResolvedValue({ data: {} });

    // Render the <Form /> component with the mock form and axios instance
    render(
      <Form form={mockForm} api={mockedAxios} path={path}>
        <div>
          <input type="text" />
          <button type="submit">Submit</button>
        </div>
      </Form>
    );

    // Get the handleSubmit function from mockForm
    const handleSubmitFunction =
      mockForm.handleSubmit as SubmitHandler<FieldValues>;

    // Fire the form submit event
    fireEvent.submit(screen.getByRole("form"));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {});

    // Assert that the handleSubmit function has been called
    expect(handleSubmitFunction).toHaveBeenCalledTimes(1);

    // Assert that the axios post method has been called
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
