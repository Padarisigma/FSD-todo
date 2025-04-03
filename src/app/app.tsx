import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

import TableUser from '../pages/table-user/table-user'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableUser />
  </StrictMode>,
)
