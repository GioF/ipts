import React from 'react';
import { Container, NavButton } from './styles';

import { ReactComponent as MenuIcon } from '../../res/menuicon.svg';
import { ReactComponent as ReadingIcon } from '../../res/readingicon.svg';
import { ReactComponent as TranslatingIcon } from '../../res/translationicon.svg';
import { ReactComponent as UploadIcon } from '../../res/uploadicon.svg';
import ConnectionInfo from './Info';

export default function Sidebar(){

  return (
    <Container>
      <NavButton> <MenuIcon/> </NavButton>
      <NavButton> <ReadingIcon/> </NavButton>
      <NavButton> <TranslatingIcon/> </NavButton>
      <NavButton> <UploadIcon/> </NavButton>
      <ConnectionInfo/>
    </Container>
  )
}
