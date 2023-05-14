class CustomerModel {
    customerId: number;
    address: string;
    city: string;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    state: string;
    zipCode: string;

    constructor(customerId: number, address: string, city: string, dateOfBirth: Date, email: string, firstName: string, lastName: string, password: string, phoneNumber: string, state: string, zipCode: string){
        this.customerId = customerId;
        this.address = address;
        this.city = city;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.zipCode = zipCode;
    }
}

export default CustomerModel;