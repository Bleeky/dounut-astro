import { BasketButton } from "./basket-button";
import AstroLogo from "../assets/astro-logo.svg";

export const Header = ({logo}: {logo: string}) => {
    return (
        <header className="container flex justify-between mx-auto py-10 w-full">
            <a href="/" title="AstroJS">
                <img src={logo} alt="Dount and Astro logo" className="w-24" />
            </a>
            <a href="/cart" title="Your cart">
                <BasketButton />
            </a>
        </header>
    );
};
