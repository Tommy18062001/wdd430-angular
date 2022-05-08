export class Document {
    constructor(
        public name: string,
        public id: string,
        public description: string,
        public url: string,
        public children: []
    ){}
}