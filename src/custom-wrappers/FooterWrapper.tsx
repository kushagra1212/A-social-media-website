import { useSelector } from 'react-redux';
import Footer from '../Bottom Bar/Footer';
import { memo } from 'react';
import Responsive from '../components/responsive/Responsive';
import NavBar from '../Bottom Bar/NavBar';

const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { message } = useSelector((state) => state.main);

  return (
    <>
      {message ? null : (
        <>
          {' '}
          <Responsive displayIn={['Mobile', 'Tablet', 'MobilePortrait']}>
            <Footer />
          </Responsive>
          <Responsive displayIn={['Laptop']}>
            <NavBar />
          </Responsive>
        </>
      )}
      {children}
    </>
  );
};

export default memo(FooterWrapper);
