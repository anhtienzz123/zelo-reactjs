import * as Yup from 'yup';

export const loginValues = {
    initial: {
        username: '',
        password: '',
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Tài khoản không được bỏ trống.'),
        password: Yup.string().required('Mật khẩu không được bỏ trống'),
    }),
};
