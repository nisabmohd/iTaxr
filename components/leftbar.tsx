import {
  BanknoteIcon,
  FileInputIcon,
  FileOutputIcon,
  SettingsIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react";
import Anchor from "./anchor";

export default function Leftbar() {
  return (
    <aside className="h-full flex-[2] border-r sticky top-14 px-2 py-7">
      <div className="flex flex-col gap-1">
        {links.map((link) => (
          <Anchor
            className="text-sm p-3 flex items-center gap-2.5"
            activeClassName="bg-secondary rounded-md text-blue-500"
            href={link.href}
            key={link.href}
          >
            <link.icon className="w-5 h-5 text-current" />
            {link.title}
          </Anchor>
        ))}
      </div>
    </aside>
  );
}

const links = [
  {
    title: "Personal Information",
    href: "/personal-info",
    icon: UserIcon,
  },
  {
    title: "Interview Sheet",
    href: "/interview-sheet",
    icon: SquarePenIcon,
  },
  {
    title: "Pre Tax Documents",
    href: "/pre-tax-documents",
    icon: FileInputIcon,
  },
  {
    title: "Post Tax Documents",
    href: "/post-tax-documents",
    icon: FileOutputIcon,
  },
  {
    title: "Make Payment",
    href: "/make-payment",
    icon: BanknoteIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
];
