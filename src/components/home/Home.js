import React from 'react';
import Heading from '../layout/Heading';
import Secondheading from '../layout/Secondheading';
import Loginform from './Loginform';
import Pages from './Pages';

function Home() {
  return (
    <>
      <Heading title="Log In"/>
      <Loginform />
      <hr/>
      <Secondheading title="Pages (read only)"/>
      <Pages />
    </>
  )
}

export default Home