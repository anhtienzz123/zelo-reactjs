import * as Yup from 'yup';

export const loginValues = {
    initial: {
        username: 'khai',
        password: '123456',
        
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Tài khoản không được bỏ trống.'),
        password: Yup.string().required('Mật khẩu không được bỏ trống'),
        
    }),
};

export const registryValues = {
    initial: {
        name:'khai',
        username: 'khai',
        password: '123456',
        passwordconfirm :'123456' ,
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Tên không được bỏ trống.'),
        username: Yup.string().required('Tài khoản không được bỏ trống.'),
        password: Yup.string().required('Mật khẩu không được bỏ trống'),
        passwordconfirm: Yup.string().required('không được bỏ trống').oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
};

export const forgotValues = {
    initial: {
        username: 'khai',
        password: '123456',
        passwordconfirm :'123456' ,
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Tài khoản không được bỏ trống.'),
        password: Yup.string().required('Mật khẩu không được bỏ trống'),
        passwordconfirm: Yup.string().required('không được bỏ trống').oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
      
    }),
};
