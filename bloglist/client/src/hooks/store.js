import {create} from 'zustand'

const useNotifStore = create(set => ({
  notification: {message: null, type: 'neutral'},
  setNotif: (message, type='success') => {
    set({notification: {message, type}})
    setTimeout(() => {
      set({notification: {message: null, type: 'neutral'}})
    },5000)
  }
}))

export const useNotif = () => useNotifStore(state => state.notification)
export const useSetNotif = () => useNotifStore(state => state.setNotif)