import { useSelector } from "react-redux";
import Footer from "../Bottom Bar/Footer";
import { memo } from "react";

const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { message } = useSelector((state) => state.main);

  return (
    <>
      {message ? null : <Footer />}
      {children}
    </>
  );
};

export default memo(FooterWrapper);
