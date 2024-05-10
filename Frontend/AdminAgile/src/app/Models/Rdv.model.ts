export class Rdv {
    constructor(public _id?: string,
        public idClient?: String,
        public date?: Date,
        public statut?:string,
        public numeroTicket?: number,
        public montant?:number) {}
}