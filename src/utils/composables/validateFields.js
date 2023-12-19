export default class ValidateData {
    static validateEmail = (email) => {
        const errors = [];
        if (!email.$dirty) return errors;
        email.required.$invalid && errors.push('Email is required');
        email.email.$invalid && errors.push('Email is not valid');
        return errors;
    };

    static validatePassword = (password) => {
        const errors = [];
        if (!password.$dirty) return errors;
        password.required.$invalid && errors.push('Password is required');
        password.minLength.$invalid && errors.push('Password must contain a minimum of 8 characters');
        password.maxLength.$invalid && errors.push('Password must contain a maximun of 50 characters');
        password.formatPassword.$invalid && errors.push('Password must have a Uppercase, lowercase letter and a number');
        return errors;
    };

    static validatePasswordLogin = (password) => {
        const errors = [];
        if (!password.$dirty) return errors;
        password.required.$invalid && errors.push('Password is required');
        return errors;
    };

    static validateConfirmPassword = (confirmPassword) => {
        const errors = [];
        if (!confirmPassword.$dirty) return errors;
        confirmPassword.required.$invalid && errors.push('Confirm password is required');
        confirmPassword.sameAsPassword.$invalid && errors.push('Passwords no match');
        return errors;
    };
}
