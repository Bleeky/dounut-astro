import { useStore } from '@nanostores/react';
import { cartItems } from '../stores/cartStore';

export const Header = ({ logo }: { logo: string }) => {
  const $cartItems = useStore(cartItems);
    const totalItems = Object.values($cartItems)?.reduce(
        (amount: number, item: any) => item.quantity + amount,
        0
    );

  return (
    <header className="mb-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <img src={logo} alt="Dount and Astro logo" className="h-14" />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 font-semibold">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Products{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a className="" href="/cart">
                  <div className="relative inline-block">
                    <div className="t-0 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-teal-600 p-3 text-xs text-white">
                      {totalItems}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="file: mt-4 h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <img src={logo} alt="Dount and Astro logo" className="h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
// export const Header = ({logo}: {logo: string}) => {
//     return (
//         <header className="container flex justify-between mx-auto py-10 w-full">
//             <a href="/" title="AstroJS">
//                 <img src={logo} alt="Dount and Astro logo" className="w-24" />
//             </a>
//             <a href="/cart" title="Your cart">
//                 <BasketButton />
//             </a>
//         </header>
//     );
// };
