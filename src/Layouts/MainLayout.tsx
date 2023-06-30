import { ReactNode } from 'react'

interface props {
  children: ReactNode
}

export function MainLayout({ children }: props) {
  return <div className={'mainLayout'}>{children}</div>
}
