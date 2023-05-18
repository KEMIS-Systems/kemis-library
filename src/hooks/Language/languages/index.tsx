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
  };
}
