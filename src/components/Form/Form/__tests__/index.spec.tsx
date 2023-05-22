// import "jsdom-global/register";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Control,
  FieldValues,
  FormState,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import Form, { IProps } from "..";
import InputDate from "../../InputDate";
import axios from "axios";
import React from "react";

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

describe("Form component", () => {
  const url = "https://our-backend-base-url.com/";
  const path = "api/form";
  const api = axios.create({
    baseURL: url,
  });

  test("renders the form with children", () => {
    // Mock the necessary props
    const formProps: IProps<any> = {
      form: mockForm, // pass a mock form object here
      children: <div>Test Children</div>,
    };

    // Render the component
    render(<Form {...formProps} />);

    // Assert that the form and its children are rendered
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders the form, fires the onSubmit function, and makes a POST call with the correct arguments", async () => {
    // Mock the useForm hook to return the mock form object
    (useForm as jest.Mock).mockReturnValue(mockForm);

    // Mock the api.post function
    const mockPost = jest.spyOn(axios, "post").mockResolvedValueOnce({});

    {
      /* <InputDate
          label="date"
          name="start_date"
          form={mockForm}
          className="p-inputtext-sm"
        />
        <InputDate
          label="date"
          name="end_date"
          form={mockForm}
          className="p-inputtext-sm"
        /> */
    }
    render(
      <Form form={mockForm} api={api} path={path}>
        <div>
          <input type="text" />
          <button role="submit" type="submit">
            Submit
          </button>
        </div>
      </Form>
    );

    const submitButton = screen.getByRole("submit");
    fireEvent.click(submitButton);

    // Wait for the asynchronous operations to complete
    await waitFor(() => {});

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith(`${url}/${path}`, expect.any(Object));

    // Restore the original implementation of api.post
    mockPost.mockRestore();
  });
});

// describe("Form component", () => {
//   const baseUrl = "https://our-backend-base-url.com/";
//   const path = "api/form";
//   const url = `${baseUrl}${path}`;

//   const api = axios.create({
//     baseURL: baseUrl,
//   });

//   const formData = {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     message: "Hello world",
//   };
//   const dataEdit = { id: 1, ...formData };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(api, "post").mockResolvedValue(formData);
//   });

//   it("renders the form, fires the onSubmit function, and makes a POST call with the correct arguments", async () => {
//     render(
//       <Form api={api} path={path} form={mockForm}>
//         <InputDate
//           label="date"
//           name="end_date"
//           form={mockForm}
//           className="p-inputtext-sm"
//         />
//         <button role="submit" type="submit">
//           Submit
//         </button>
//       </Form>
//     );

//     const submitButton = screen.getByRole("submit");
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockForm.handleSubmit).toHaveBeenCalledTimes(1);
//       expect(api.post).toHaveBeenCalledTimes(1);
//       expect(api.post).toHaveBeenCalledWith(url, formData);
//     });
//   });
// });
