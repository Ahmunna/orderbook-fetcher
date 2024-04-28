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

export class Exchange {
    name: string
    code: string;

    constructor(name: string, code: string) {
        this.name = name;
        this.code = code;
    }
}