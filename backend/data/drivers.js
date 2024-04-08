import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Travis Scot",
        email: "travis@example.com",
        licenseNumber: "12345678913",
        licenseCode: "B",
        licenseExpiry: 555555,
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "John Doe",
        email: "john@example.com",
        licenseNumber: "657885423495",
        licenseCode: "C",
        licenseExpiry: 555555,
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        licenseNumber: "123456789130",
        licenseCode: "C-1",
        licenseExpiry: 555555,
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: "Micheal Smith",
        email: "jane@example.com",
        licenseNumber: "123456789130",
        licenseCode: "EC",
        licenseExpiry: 555555,
        password: bcrypt.hashSync('123456', 10),
        
    }
];

export default drivers