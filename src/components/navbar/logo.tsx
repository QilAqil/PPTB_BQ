import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/logo.png"
    alt="Logo"
    width={124}
    height={32}
    className="h-8 w-auto"
  />
);
