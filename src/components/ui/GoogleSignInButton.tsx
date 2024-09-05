import React, { FC, ReactNode } from 'react'
import { Button } from './button'

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
  const loginWithGogogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGogogle} className='w-full'>
      {children}
    </Button>
  )
}

export default GoogleSignInButton;
