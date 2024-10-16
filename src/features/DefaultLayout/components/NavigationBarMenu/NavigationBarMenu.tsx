import { Link } from "@nextui-org/react";

export default function NavigationBarMenu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-4 p-3 items-center">
      {[
        { label: "Home", link: "/" },
        { label: "Profile", link: "profile" },
        { label: "Friends", link: "friends" },
      ].map((item, index) => (
        <Link href={item.link} key={index} onClick={() => setIsMenuOpen(false)}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
