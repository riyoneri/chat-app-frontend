import { Category } from "@/app/(protected)/page";
import classNames from "classnames";
import Link from "next/link";

export default function CategoryListItem({
  title,
  Icon,
  link,
  className,
}: Category) {
  return (
    <Link
      href={link}
      className={classNames(
        "p-5 flex flex-col gap-3 items-center rounded-md bg-accent/20",
        className,
      )}
    >
      <Icon className="text-4xl xs:text-5xl lg:text-6xl" />
      <span>{title}</span>
    </Link>
  );
}
