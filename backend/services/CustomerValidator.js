import validator from 'validator';

// Function to validate customer entry data
export function validateCustomerData(data) {
    const {
        dateOfService,
        customerName,
        vehicleNumber,
        phoneNumber,
        paymentMethod,
        creditAmount,
        workDetails,
    } = data;

    // Array to collect validation errors
    const errors = [];

    // Validate workDate
    if (!dateOfService || !validator.isDate(dateOfService)) {
        errors.push('Work date is required and must be a valid date.');
    }

    // Validate customerName
    if (!customerName || !validator.isLength(customerName, { min: 2 })) {
        errors.push('Customer name is required and must be at least 2 characters long.');
    }

    // Validate vehicleNumber
    if (!vehicleNumber || !validator.isAlphanumeric(vehicleNumber)) {
        errors.push('Vehicle number is required and must be alphanumeric.');
    }

    // Validate contactNumber
    if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'en-IN')) {
        errors.push('Contact number is required and must be a valid phone number.');
    }

    // Validate paymentMethod
    const validPaymentMethods = ['Cash', 'UPI', 'online Transfer'];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
        errors.push('Payment method is required and must be one of Cash, UPI, or Online Transfer.');
    }

    // Validate totalCost
    if (!creditAmount || !validator.isFloat(creditAmount.toString(), { gt: 0 })) {
        errors.push('Total service cost is required and must be a positive number.');
    }

    // Validate workDescriptions
    if (!Array.isArray(workDetails) || workDetails.length === 0) {
        errors.push('At least one work description is required.');
    } else {
        // Validate each work description item
        workDetails.forEach((work, index) => {
            const { description, amount, reference } = work;

            if (!description || validator.isEmpty(description)) {
                errors.push(`Description is required for work item ${index + 1}.`);
            }
            if (!amount || !validator.isFloat(amount.toString(), { gt: 0 })) {
                errors.push(`Amount must be a positive number for work item ${index + 1}.`);
            }
            if (reference && !validator.isLength(reference, { max: 255 })) {
                errors.push(`Reference should be less than 255 characters for work item ${index + 1}.`);
            }
        });
    }

    return errors;
}
