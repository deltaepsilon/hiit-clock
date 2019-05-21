import React, { useContext } from 'react';
import AppBase from '../../components/app/app-base';
import Browse from '../../components/page-components/browse';
import BackButton from '../../components/top-bar/back-button';
import { AuthenticationContext } from '../../components/contexts/authentication-context';
import useTimers from "../../components/hooks/use-timers";

import '../page.css';

export default props => {
  const { currentUser } = useContext(AuthenticationContext);
  const timers = useTimers()


  return (
    <AppBase>
      <div id="custom" className="page">
        <BackButton url="/" visible pinned />
        <h1>Custom Timers</h1>

        <section>
          <h2>Search our Database</h2>
          <p>Find user-generated timers.</p>
          <p> Create your personal collection.</p>
        </section>

        <Browse userId={currentUser.uid}  />
      </div>
    </AppBase>
  );
};
