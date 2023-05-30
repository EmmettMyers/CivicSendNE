
// type for a user
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: Address;
};

// type for a representative
interface Representative {
    firstName: string;
    lastName: string;
    email: string;
    district: number;
    room: string;
    poBox: Address;
}

// type for an address of a user
interface Address {
    line1: string;
    city: string;
    state: string;
    zip: number;
}

// type for an email
interface Email {
    sender: User;
    recipients: Representative[];
    subject: string;
    content: string;
}

// type for a letter
interface Letter {
    sender: User;
    recipients: Representative[];
    content: string;
    date: string;
}