import Pool from "../config/db";

export interface User {
    id? : number;
    fname : string;
    lname : string;
    email : string;
    password : string ;
    created_at : Date;
}

export const createUser = async (user : User) => {
    const [result] = await Pool.query(
        `INSERT INTO users (fname , lname , email , password) VALUES (? , ? , ? , ?)` ,
        [user.fname , user.lname , user.email , user.password]
    )
    return result
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await Pool.query(
        `SELECT * FROM users WHERE email = ?` , [email]
    )
    const users = rows as User[]
    return users.length > 0 ? users[0] : null;
}