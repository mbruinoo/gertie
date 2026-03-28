import type { Access } from 'payload'

export const canPublish: Access = ({ req: { user } }) => {
  return user?.role === 'dev' || user?.role === 'admin' || user?.role === 'manager'
}

export const canPropose: Access = ({ req: { user } }) => {
  return !!user
}
