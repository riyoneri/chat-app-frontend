import classNames from "classnames";

interface MessageSVGProperties {
  className?: string;
  incoming?: boolean;
}

export default function MessageSVG({
  className,
  incoming,
}: MessageSVGProperties) {
  const classes = classNames(
    "w-4 flex-shrink-0",
    {
      "fill-neutral-700": incoming,
      "fill-message-out": !incoming,
    },
    className,
  );
  return incoming ? (
    <svg
      className={classes}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.49615 3.6641C-0.150327 2.56645 0.626734 3.61246e-06 2.60555 3.52596e-06L20 -9.53989e-08L20 16L1.49615 3.6641Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path d="M18.5039 3.6641C20.1503 2.56645 19.3733 3.61246e-06 17.3944 3.52596e-06L2.60673e-06 -9.53989e-08L1.90735e-06 16L18.5039 3.6641Z" />
    </svg>
  );
}
