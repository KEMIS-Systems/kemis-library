export interface ILanguage {
  components: {
    error: {
      message: string;
      required: string;
      validation: string;
    };
    dropzone: {
      message: string;
      example: string;
    };
    photo: {
      message: string;
    };
    signature: {
      title: string;
      title_new: string;
      title_update: string;
      msg_1: string;
      err_1: string;
      header_draw: {
        title: string;
        btn_redo: string;
        btn_not_like: string;
        btn_visualize: string;
        success: string;
        error: string;
      };
      header_write: {
        title: string;
        lbl_drop: string;
        btn_not_like: string;
        btn_visualize: string;
      };
      header_uploading: {
        title: string;
        btn_not_like: string;
        btn_visualize: string;
        msg_1: string;
      };
      terms: {
        header: string;
      };
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
    document: {
      required: string;
      validation: string;
    },
    email: {
      required: string;
      validation: string;
    }
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
