import { useState, useEffect } from "react";

export const BirdForm = () => {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    fetch(
      "https://bird-signed-identity.deno.dev?email=quentin.hausser@bird.com",
      {
        method: "GET",
      }
    ).then(async (res) => {
      window.addEventListener("bird-sdk-initialized", async (e) => {
        const signedIdentity = await res.text();
        console.log(signedIdentity);
        window.Bird.contact.identify({
          strategy: "SignedIdentityClaims",
          signedIdentity,
        });
        setSigned(true);
      });
    });
    // window.Bird.contact.identify({
    //   strategy: "Visitor",
    //   identifier: { key: "emailaddress", value: "tarantino@gmail.com" },
    // });
    // setSigned(true);
  }, []);

  return (
    <>
      {signed && (
        <bird-form project-id="30bc12d4-ed5f-4a77-85b0-3ac7d52d10f2" workspace-id="45e7c14d-e008-494b-90b7-56cb1ee77ea8"></bird-form>
      )}
    </>
  );
};
