$.validator.addMethod("alpha", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
}, 'Please enter alphabats only');

$('.userForm').validate({
    rules: {
            name: {
                required: true,
                alpha: true
            },
            email: {
                required: true,
                email: true
            },
            contact: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            },
            dob: {
                required: true,
                date: true
            },
            line1: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 12
            },
            city: {
                required: true
            },
            state: {
                required: true
            },
            zip: {
                required: true
            },
            line2: {
                required: true
            }
        },
    submitHandler: function(form) {
        submitForm(); 
    }
});
