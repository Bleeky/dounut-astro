import type { ProductTable } from './ProductContent';
import type { Paragraph } from './Paragraph';
import type { Product as ProductType } from '@crystallize/js-api-client';
import type { RelatedItem } from './RelatedItem';

export type Product = ProductType & {
    related: { content: { items: RelatedItem[] } };
    dimensions: { content: ProductTable };
    description: { content: { paragraphs: Paragraph[] } };
    summary: { content: { json: any } };
};
