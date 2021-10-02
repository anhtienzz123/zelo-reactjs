import * as Yup from 'yup';

export const loginValues = {
    initial: {
        username: '',
        password: '',
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Tài khoản không được bỏ trống.')
            .email('Email không hợp lệ'),
        password: Yup.string().required('Mật khẩu không được bỏ trống'),
    }),
};

export const registryValues = {
    initial: {
        name: '',
        username: '',
        password: '',
        passwordconfirm: '',
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Tên không được bỏ trống.'),
        username: Yup.string()
            .required('Tài khoản không được bỏ trống.')
            .email('Email không hợp lệ'),
        password: Yup.string()
            .required('Mật khẩu không được bỏ trống')
            .min(8, 'Mật khẩu phải từ 8-50 ký tự')
            .max(50, 'Mật khẩu phải từ 8-50 ký tự'),
        passwordconfirm: Yup.string()
            .required('không được bỏ trống')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
};

export const forgotValues = {
    initial: {
        username: '',
        password: '',
        passwordconfirm: '',
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Tài khoản không được bỏ trống.')
            .email('Email không hợp lệ'),
        password: Yup.string()
            .required('Mật khẩu không được bỏ trống')
            .min(8, 'Mật khẩu phải từ 8-50 ký tự')
            .max(50, 'Mật khẩu phải từ 8-50 ký tự'),
        passwordconfirm: Yup.string()
            .required('không được bỏ trống')
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
    }),
};

export const otpValues = {
    initial: {
        otpValue: '',
    },
    validationSchema: Yup.object().shape({
        otpValue: Yup.string()
            .required('OTP không được bỏ trống.')
            .min(6, 'OTP không đủ 6 ký tự')
            .max(6, 'OTP nhiều hơn 6 ký tự'),
    }),
};
