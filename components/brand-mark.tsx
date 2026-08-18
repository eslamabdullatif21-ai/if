import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  preload?: boolean;
  lockup?: boolean;
  alt?: string;
};

export function BrandMark({
  className = "",
  preload = false,
  lockup = false,
  alt = "Ismail Fekri & Partners",
}: BrandMarkProps) {
  return (
    <Image
      src={lockup ? "/brand-lockup.png" : "/brand-monogram.png"}
      width={lockup ? 1171 : 713}
      height={lockup ? 1097 : 634}
      alt={alt}
      className={className}
      preload={preload}
      sizes={lockup ? "(max-width: 640px) 180px, 240px" : "(max-width: 768px) 65vw, 42vw"}
    />
  );
}
