// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Exchange {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string

//     @Column()
//     code: string;

//     constructor(name: string, code: string) {
//         this.name = name;
//         this.code = code;
//     }
// }

// TODO: Persist exchanges in DB, use ORM for cleaner code
export class Exchange {
    name: string
    code: string;

    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}