import classNames from "classnames";

interface UserIconProperties {
  icon: string;
  className?: string;
}

export default function UserIcon({ icon, className }: UserIconProperties) {
  return (
    <span
      className={classNames(
        " p-1 rounded-full border-2 grid place-content-center border-neutral-300",
        className,
      )}
    >
      {icon}
    </span>
  );
}
