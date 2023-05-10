## Steps for Uploading project:

### Code Example (using a form inside a Modal window) in a React TypeScript project:

```typescript
import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { SelectItemOptionsType } from "primereact/selectitem";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  FormDialog,
  InputText,
  InputTextArea,
} from "kemis-react-form"; // Import the package
// Optional: our custom model
import IMEquipment from "~/models/Equipments";

interface IModalProps {
  header: string;
  show: boolean;
  dataEdit: IMEquipment;
  onHide: () => void;
  onRefreshTable: (refreshTable: boolean) => void;
}

const ModalForm = ({ header, show, dataEdit, onHide, onRefreshTable }) => {
  // Control the form:
  const form = useForm({ defaultValues });
  // To reset the form from scratch:
  const { reset } = useForm({ defaultValues });
  // For the dropdown:
  const [customers, setCustomers] = useState<SelectItemOptionsType>([
    { id: 1, name: "Nicanor Orlando" },
  ]);

  // To fetch the data to show in dropdown:
  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((json) => {
        const data = response.data.map((customers) => ({
          // Choose the value to send in the form:
          value: customers.id,
          // Choose value to show to the user in the dropdown
          label: customers.name,
        }));
        setCustomers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // If we have something in dataEdit we fill the fields who are included in the dataEdit object.
  useEffect(() => {
    if (dataEdit) {
      Object.keys(dataEdit).forEach((key: string) => {
        const k = key as keyof IMEquipment;
        form.setValue(k, dataEdit[k]);
      });
    }
  }, [dataEdit, form]);

  // When we close our modal:
  const handleHide = useCallback(() => {
    reset();
    onHide();
  }, [onHide, reset]);

  return (
    <FormDialog
      header={header}
      dataEdit={dataEdit}
      form={form}
      visible={show}
      onHide={handleHide}
      onRefreshTable={onRefreshTable}
      classNameDialog="w-5/6 lg:w-3/6"
    >
      // If we want, we can divide the visual in tabs:
      <TabView renderActiveOnly={false}>
        // The first tab to show:
        <TabPanel header="Main">
          // Distribution of the form:
          <div className="flex flex-col sm:grid sm:grid-cols-4 gap-3 mb-4">
            <Dropdown
              // Custom class (It will expand at half ot the container):
              className="col-span-2"
              // Our key value to access customer (in this case):
              name="customer"
              // Specificate if is required:
              rules={{ required: "customer is required." }}
              // Our label on the top of the field:
              label="Customer"
              // The initial data to be selected:
              selected={dataEdit?.customer ? dataEdit.customer : ""}
              // Our array of different options
              options={customers}
              // To control/manage the data and submit
              form={form}
            />
            <InputText
              className="col-span-2"
              name="equipment"
              rules={{ required: "equipment is required." }}
              label="Equipment"
              type="text"
              form={form}
            />
            <InputTextArea
              className="col-span-4"
              name="observation"
              label="Observation"
              form={form}
            />
          </div>
        </TabPanel>
        // The second tab to show:
        <TabPanel header="Secondary data">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
            <InputMask
              autoFocus
              name="zip_code"
              label="Zip code"
              // Specificate the mask to use:
              mask="99.999-999"
              form={form}
              onComplete={(e) => console.log("Execute our function if we want")}
            />
          </div>
        </TabPanel>
      </TabView>
    </FormDialog>
  );
};
export default ModalForm;
```

### Publish the package

1. Make the changes...
2. Increment the version
3. run `npm run build`
4. run `npm pack`
5. run `npm publish`

## Author

Nicanor Orlando
