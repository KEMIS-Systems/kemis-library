import IController from '~/database/Controllers';
import IDbEmployeeStatus from '~/database/HumanResources/EmployeeStatus';
import IDbHiringStatus from '~/database/HumanResources/HiringStatus';
import IModule from '~/database/Modules';
import IPermissions from '~/database/Permission';
import IDbTrainingStatus from '~/database/TrainingManagement/TrainingStatus';
export interface ILanguage {
  components: {
    error: {
      message: string;
    };
    dropzone: {
      message: string;
      example: string;
    };
    photo: {
      message: string;
    };
  };
  navbar: {
    filter: string;
    message: {
      hello: string;
    };
  };
  input: {
    button_accept: string;
    button_cancel: string;
    button_save: string;
    button_filter: string;
    button_clear: string;
    button_delete: string;
    button_edit: string;
    placeholder: {
      search: string;
    };
    password: {
      header: string;
      bottom: {
        title: string;
        rules: {
          rule1: string;
          rule2: string;
          rule3: string;
          rule4: string;
        };
      };
    };
  };
  booleans: {
    yes: string;
    no: string;
    ok: string;
    noOk: string;
  };
  default: {
    import_message: string;
    validations: {
      cnpj: string;
    };
  };
  database: {
    modules: IModule;
    controllers: IController;
    permissions: IPermissions;
    human_resources: {
      employees: {
        status: IDbEmployeeStatus;
      };
      hirings: {
        status: IDbHiringStatus;
      };
    };
    trainings: {
      status: IDbTrainingStatus;
    };
  };
  pages: {
    message: {
      empty: string;
      pages: string;
    };
    alerts: {
      edit: {
        success: string;
      };
      add: {
        success: string;
      };
      copy: {
        success: string;
      };
      error: {
        error: string;
        error_filter: string;
        zip_code_not_found: string;
      };
      delete: {
        confirm: string;
        sucess: string;
        error: string;
      };
    };
    auth: {
      marketing: {
        title: string;
        customer: '';
      };
    };
    login: {
      title: string;
      subTitle: string;
      buttons: {
        login: string;
      };
      texts: {
        dontHaveAccount: string;
      };
      links: {
        forgotPassword: string;
        register: string;
      };
      errors: {
        err_acess: string;
      };
    };
    forgotPassword: {
      title: string;
      subTitle: string;
      message: {
        title: string;
        subTitle: string;
      };
      buttons: {
        forgotPassword: string;
      };
      links: {
        login: string;
      };
      errors: {
        title: string;
        subTitle: string;
      };
    };
    resetPassword: {
      title: string;
      subTitle: string;
      buttons: {
        resetPassword: string;
      };
      message: {
        alert: {
          title: string;
          subTitle: string;
        };
        success: {
          title: string;
          subTitle: string;
        };
        errors: {
          err_acess: string;
        };
      };
      links: {
        login: string;
      };
    };
    register: {
      title: string;
      subTitle: string;
      buttons: {
        previous: string;
        next: string;
        acess: string;
      };
      plans: {
        title: string;
        subTitle: string;
        free: {
          descriptions: {
            line1: string;
            line2: string;
          };
        };
        human_resources: {
          descriptions: {
            line1: string;
            line2: string;
            line3: string;
            line4: string;
            line5: string;
          };
        };
      };
    };
    kemis: {
      clients: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            name: string;
            company_name: string;
            document: string;
            email: string;
            url: string;
            phonenumber: string;
            zip_code: string;
            street: string;
            number: string;
            complement: string;
            neighborhood: string;
            city: string;
            state: string;
            disk_space: string;
            inactive: string;
          };
        };
        home: {
          users: {
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                access_group: string;
                name: string;
                email: string;
              };
            };
          };
          pack: {
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                pack: string;
                price: string;
                expiration_date: string;
              };
            };
          };
        };
      };
      companies: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            name: string;
            company_name: string;
            document: string;
            email: string;
            url: string;
            phonenumber: string;
            zip_code: string;
            street: string;
            neighborhood: string;
            city: string;
            state: string;
            comments: string;
            number: string;
            complement: string;
          };
        };
      };
    };
    administrative: {
      users: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            client: string;
            name: string;
            email: string;
            access_group: string;
            inactive: string;
            password: string;
            department: string;
          };
        };
        modalKey: {
          title: string;
          info: string;
          buttons: {
            generate: string;
            close: string;
          };
        };
      };
      access_groups: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            access_group: string;
          };
        };
        home: {
          tabview: {
            header: {
              controllers: string;
            };
          };
          controllers: {
            modalEdit: string;
            modalAdd: string;
            table: {
              columns: {
                module: string;
                controller: string;
                permission: string;
              };
            };
          };
        };
      };
      customers: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            name: string;
            company_name: string;
            document: string;
            email: string;
            url: string;
            phonenumber: string;
            zip_code: string;
            street: string;
            number: string;
            complement: string;
            neighborhood: string;
            city: string;
            state: string;
            comments: string;
          };
        };
      };
      departments: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            department: string;
            code: string;
          };
        };
      };
      cost_centers: {
        modalEdit: string;
        modalAdd: string;
        table: {
          columns: {
            cost_center: string;
          };
        };
      };
    };
    human_resources: {
      contracts: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            contract: string;
            customer: string;
            start_date: string;
            end_date: string;
            amount: string;
            inactive: string;
          };
        };
        home: {
          workplace: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                work_place: string;
                comments: string;
              };
            };
          };
        };
      };
      file_types: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            file_types: string;
            default: string;
          };
        };
        home: {
          tabview: {
            header: {
              roles: string;
            };
          };
          roles: {
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                course: string;
                role: string;
                contract: string;
              };
            };
          };
        };
      };
      roles: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            role: string;
            code: string;
          };
        };
        home: {
          tabview: {
            header: {
              courses: string;
              file_types: string;
            };
          };
          courses: {
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                role: string;
                contract: string;
              };
            };
          };
          file_types: {
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                file_type: string;
                contract: string;
              };
            };
          };
        };
      };
      employees: {
        modalAdd: string;
        modalEdit: string;
        tabview: {
          header: {
            principal_data: string;
            contact_data: string;
          };
        };
        table: {
          columns: {
            company: string;
            enroll: string;
            name: string;
            role: string;
            document: string;
            passport: string;
            birth_date: string;
            date_admission: string;
            date_dismissal: string;
            department: string;
            contract: string;
            work_place: string;
            phone: string;
            cellphone: string;
            email: string;
            zip_code: string;
            street: string;
            neighborhood: string;
            city: string;
            state: string;
            status: string;
            password: string;
          };
        };
        home: {
          califications: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                course: string;
                completion_date: string;
                validity: string;
                expiration_date: string;
              };
            };
          };
          files: {
            title: string;
            modal: {
              modalAdd: string;
              modalEdit: string;
            };
            table: {
              columns: {
                type: string;
                training: string;
                description: string;
                expiration_date: string;
              };
            };
          };
        };
      };
      hirings: {
        modal: {
          modalAdd: string;
          modalEdit: string;
          tabs: {
            main: string;
            personal_data: string;
            complementary_data: string;
          };
        };
        table: {
          columns: {
            name: string;
            role: string;
            birth_date: string;
            status: string;
            employee: string;
            document: string;
            passport: string;
            phone: string;
            cellphone: string;
            email: string;
            files: string;
            zip_code: string;
            street: string;
            neighborhood: string;
            city: string;
            state: string;
            observations: string;
            guidelines: string;
            about_me: string;
          };
        };
      };
      reports: {
        report: string;
        role: string;
        department: string;
        course: string;
        start_date: string;
        end_date: string;
        msg_alert: string;
        btn_excel: string;
        btn_filter: string;
        charts: {
          title_percentage: string;
          title_quantity: string;
          due_in_45: string;
          due_in_90: string;
          in_day: string;
          overdue: string;
        };
      };
    };
    training_management: {
      groups: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            group: string;
          };
        };
      };
      courses: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            group: string;
            course: string;
            validity: string;
            workload: string;
            code: string;
          };
        };
        home: {
          titles: {
            roles: string;
            syllabus: string;
          };
          roles: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                role: string;
                contract: string;
              };
            };
          };
          syllabus: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                order: string;
                content: string;
                content_english: string;
              };
            };
          };
          instructors: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                order: string;
                name: string;
                role: string;
                document: string;
                upload: string;
              };
            };
          };
        };
      };
      trainings: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            employee: string;
            enroll: string;
            course: string;
            start_date: string;
            end_date: string;
            validity: string;
            workload: string;
            amount: string;
            status: string;
            certificate_number: string;
            key: string;
            expiration_date: string;
            signed: string;
            start_expiration: string;
            end_expiration: string;
          };
        };
      };
      validate_certificate: {
        mensages: {
          invalid: string;
          valid: string;
        };
      };
    };
    equipment_management: {
      certifications: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            certification: string;
            validity: string;
          };
        };
      };
      groups: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            group: string;
          };
        };
        home: {
          certifications: {
            title: string;
            modalEdit: string;
            modalAdd: string;
            table: {
              columns: {
                certification: string;
                group: string;
              };
            };
          };
        };
      };
      models: {
        title: string;
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            model: string;
            group: string;
            cost_standart: string;
            weight: string;
          };
        };
        home: {
          certifications: {
            title: string;
            modalEdit: string;
            modalAdd: string;
            table: {
              columns: {
                certification: string;
                group: string;
              };
            };
          };
        };
      };
      equipments: {
        tabs: {
          general: string;
          complement: string;
        };
        title: string;
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            company: string;
            model: string;
            group: string;
            details: string;
            type: string;
            serial_number: string;
            manufacturer: string;
            year_of_manufacture: string;
            dimensions: string;
            cost_price: string;
            weight: string;
            observation: string;
            created_at: string;
          };
        };
        home: {
          certifications: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                certification: string;
                certification_date: string;
                validity: string;
                expiration_date: string;
                certification_number: string;
              };
            };
          };
          files: {
            title: string;
            modalAdd: string;
            modalEdit: string;
            table: {
              columns: {
                description: string;
              };
            };
          };
        };
      };
    };
    warehouse: {
      measurement_units: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            measurement_unit: string;
          };
        };
      };
      inventory_type: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            inventory_type: string;
            in_out: string;
            input: string;
            output: string;
          };
        };
      };
      inventory: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            company: string;
            inventory_type: string;
            date: string;
            concluded: string;
          };
        };
        home: {
          supplies: {
            modalAdd: string;
            modalEdit: string;
            title: string;
            table: {
              columns: {
                group: string;
                details: string;
                serial_number: string;
                measurement_unit: string;
                quantity: string;
                cost_price: string;
                total_value: string;
              };
            };
          };
        };
      };
      supplies: {
        modalAdd: string;
        modalEdit: string;
        table: {
          columns: {
            group: string;
            details: string;
            serial_number: string;
            measurement_unit: string;
            manufacturer: string;
            manufacturer_code: string;
            quantity: string;
            cost_price: string;
            dimensions: string;
            weight: string;
            observation: string;
          };
        };
      };
    };
  };
}
