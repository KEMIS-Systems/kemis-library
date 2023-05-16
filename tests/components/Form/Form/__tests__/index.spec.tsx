import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Form from "..";
import axios from "axios";
import React from "react";

jest.mock("react-hook-form");

describe("Form component", () => {
  const baseUrl = "https://our-backend-base-url.com/";
  const path = "api/form";
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

  it("it renders the form, fires the onSubmit function, and makes a POST call with the correct arguments", async () => {
    const mockedHandleSubmit = jest.fn((onSubmit) => (data) => {
      onSubmit(formData);
    });

    const mockedUseForm = jest.fn().mockReturnValue({
      handleSubmit: mockedHandleSubmit,
    });

    jest.spyOn(api, "post").mockResolvedValue(formData);

    render(
      <Form api={api} path={path} form={useForm()} dataEdit={dataEdit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={formData.name} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <button role="submit" type="submit">
          Submit
        </button>
      </Form>
    );

    const submitButton = screen.getByRole("submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith(`${path}`, formData);
    });
  });
});
