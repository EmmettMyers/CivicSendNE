
// type for a user
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: Address;
};

// type for an address of a user
interface Address {
    line1: string;
    city: string;
    state: string;
    zip: number;
}

// type for a representative
interface Representative {
    firstName: string;
    lastName: string;
    district: number;
    image: string;
    email: string;
    room: string;
}

// type for an email
interface Email {
    sender: User;
    recipients: string;
    subject: string;
    content: string;
}

// type for a letter
interface Letter {
    sender: User;
    recipients: string;
    content: string;
}