import React from "react";
import "../../../../setupTests";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "..";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loading from "../../../Loading";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

describe("Form component", () => {
  const baseUrl = "https://our-backend-base-url.com";
  const path = "/api/form";
  const url = `${baseUrl}${path}`;

  const api = axios.create({
    baseURL: baseUrl,
  });

  const formData = {
    name: "John Doe",
    email: "johndoe@example.com",
    message: "Hello world",
  };
  const dataEdit = { id: 1, ...formData };
  const onRefreshTable = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useForm as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
    });
  });

  test("it renders", () => {
    const onSubmit = jest.fn().mockResolvedValueOnce(undefined);

    render(
      <Form
        api={api}
        dataEdit={dataEdit}
        path={path}
        onRefreshTable={onRefreshTable}
        onSubmit={onSubmit}
        form={useForm()}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={formData.name} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        {/* <button type="submit">Submit</button> */}
      </Form>
    );
  });

  test("update form data successfully", async () => {
    const formDataEdited = {
      name: "John Doe",
      email: "edited_form@example.com",
      message: "Hello world edited",
    };
    const onSubmit = jest.fn().mockResolvedValueOnce(undefined);

    render(
      <Form
        api={api}
        dataEdit={dataEdit}
        path={path}
        onRefreshTable={onRefreshTable}
        form={useForm()}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formDataEdited.name} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={formDataEdited.email} />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formDataEdited.message} />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    userEvent.type(nameInput, formDataEdited.name);
    userEvent.type(emailInput, formDataEdited.email);
    userEvent.type(messageInput, formDataEdited.message);

    // Submit the form
    fireEvent.submit(screen.getByRole("form"));

    // Loading component is rendered
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();

    // The PUT request is called with the correct arguments:
    const putSpy = jest.spyOn(api, "put"); // Creates a mock function similar to jest.fn but also tracks calls to object[methodName]
    putSpy.mockResolvedValueOnce(formData);
    expect(putSpy).toHaveBeenCalledWith(`${url}/${dataEdit.id}`, formData);
    // expect(api.put).toHaveBeenCalledWith(`${path}/${dataEdit.id}`, formData);

    expect(onRefreshTable).toHaveBeenCalledWith(true);
    expect(onSubmit).toHaveBeenCalledWith(formData);
  });
});
