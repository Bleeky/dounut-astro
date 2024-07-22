import type { Paragraph } from "./Paragraph";

export type ProductTable = {
    sections: {
        title: string;
        properties: {
            key: string;
            value: string;
        }[];
    }[];
};

export type ProductBody = {
    description: {
        content: {
            paragraphs: Paragraph[];
        };
    };
    dimensions: {
        content: ProductTable;
    };
};
