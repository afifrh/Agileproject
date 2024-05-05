export class User {
    constructor(public _id?: string,
        public nom?: String,
        public prenom?: String,
        public email?: String,
        public tel?:String,
        public username?: String,
        public password?: String,
        public role?: String) {}
}