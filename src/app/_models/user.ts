export class User {
    id: string;
    departmentId: { departmentname: string, id: string };
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    imagefile: string;
    token: string;
}