import bcrypt from 'bcryptjs';

const users = [
    {
        name : 'Admin user',
        email : 'admin@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : true
    },
    {
        name : 'John Doe',
        email : 'jon@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : false
    },
    {
        name : 'Jane user',
        email : 'jane@email.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : false
    }
];

export default users;