import type { RichTextContent } from "@crystallize/js-api-client";

export type Image = {
    key: string;
    url: string;
    variants: Array<{
        key: string;
        height: number;
        width: number;
        url: string;
    }>;
    caption?: RichTextContent;
};
