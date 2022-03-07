import { Abilitie } from "./abilitie";

export interface HeroDto {
    id: number;
    name: string;
    abilities: Abilitie[];
}
