import { CreateBook } from "./create-book.model";

export interface Book extends CreateBook {
    id: string | null;
}